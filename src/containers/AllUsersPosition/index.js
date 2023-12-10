import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

const AllUsersPosition = () => {
  const [userPositions, setUserPositions] = useState([]);
  const [mapView, setMapView] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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

  //   const handleZoomIn = () => {
  //     mapView.animateToRegion({
  //       latitude: userPositions[0]?.currentLatitude || 0,
  //       longitude: userPositions[0]?.currentLongitude || 0,
  //       latitudeDelta: 0.02,
  //       longitudeDelta: 0.02,
  //     });
  //   };

  //   const handleZoomOut = () => {
  //     mapView.animateToRegion({
  //       latitude: userPositions[0]?.currentLatitude || 0,
  //       longitude: userPositions[0]?.currentLongitude || 0,
  //       latitudeDelta: 0.2,
  //       longitudeDelta: 0.2,
  //     });
  //   };

  const handleTrackUser = userName => {
    const selectedUserPosition = userPositions.find(
      user => user.userName === userName,
    );

    if (selectedUserPosition) {
      mapView.animateToRegion({
        latitude: selectedUserPosition.currentLatitude,
        longitude: selectedUserPosition.currentLongitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });

      setSelectedUser(userName);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.userListItem,
        item.userName === selectedUser && styles.selectedUser,
      ]}
      onPress={() => handleTrackUser(item.userName)}>
      <Text style={styles.userName}>{item.userName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users Position</Text>

      {/* Map */}
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

      {/* Map Controls */}
      {/* <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={handleZoomIn}>
          Zoom In
        </Text>
        <Text style={styles.button} onPress={handleZoomOut}>
          Zoom Out
        </Text>
      </View> */}

      {/* User List */}
      <FlatList
        data={userPositions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.userList}
      />
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
  userListItem: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#3498db',
    marginVertical: 4,
  },
  selectedUser: {
    backgroundColor: '#27ae60',
  },
  userName: {
    color: 'white',
    fontWeight: 'bold',
  },
  map: {
    flex: 2,
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
