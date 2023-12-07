import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

const AllUsersPosition = () => {
  const [userPositions, setUserPositions] = useState([]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users Position</Text>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
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
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            title={`User: ${user.userName}`}
            description={`Speed: ${user.speed}, Time: ${user.locationTime}`}
          />
        ))}
      </MapView>
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
});

export default AllUsersPosition;
