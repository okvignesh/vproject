import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Animated,
  AnimatedRegion,
} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

const AllUsersPosition = () => {
  const [userPositions, setUserPositions] = useState([]);
  const [mapView, setMapView] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('UsersPosition')
      .onSnapshot(snapshot => {
        const positions = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserPositions(positions);
      });

    return () => unsubscribe();
  }, []);

  const handleZoomIn = () => {
    mapView.animateToRegion({
      latitude: userPositions[0]?.currentLatitude || 0,
      longitude: userPositions[0]?.currentLongitude || 0,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  const handleZoomOut = () => {
    mapView.animateToRegion({
      latitude: userPositions[0]?.currentLatitude || 0,
      longitude: userPositions[0]?.currentLongitude || 0,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    });
  };

  const handleTrackAll = () => {
    // Filter out invalid coordinates (NaN values)
    const validCoordinates = userPositions.filter(
      user => !isNaN(user.currentLatitude) && !isNaN(user.currentLongitude),
    );

    if (validCoordinates.length > 0) {
      const bounds = validCoordinates.reduce(
        (acc, user) => ({
          minLat: Math.min(acc.minLat, user.currentLatitude),
          maxLat: Math.max(acc.maxLat, user.currentLatitude),
          minLon: Math.min(acc.minLon, user.currentLongitude),
          maxLon: Math.max(acc.maxLon, user.currentLongitude),
        }),
        {
          minLat: validCoordinates[0].currentLatitude,
          maxLat: validCoordinates[0].currentLatitude,
          minLon: validCoordinates[0].currentLongitude,
          maxLon: validCoordinates[0].currentLongitude,
        },
      );

      mapView.fitToCoordinates(
        [
          {latitude: bounds.minLat, longitude: bounds.minLon},
          {latitude: bounds.maxLat, longitude: bounds.maxLon},
        ],
        {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
          animated: true,
        },
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users Position</Text>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={ref => setMapView(ref)}
        initialRegion={{
          latitude: 51.4657689,
          longitude: -2.5722472,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {userPositions.map(user => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.currentLatitude,
              longitude: user.currentLongitude,
            }}
            title={`User: ${user.userName}`}
            description={`Speed: ${user.speed}, Time: ${user.locationTime}`}
          />
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={handleZoomIn}>
          Zoom In
        </Text>
        <Text style={styles.button} onPress={handleZoomOut}>
          Zoom Out
        </Text>
        <Text style={styles.button} onPress={handleTrackAll}>
          Track All
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  map: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AllUsersPosition;
