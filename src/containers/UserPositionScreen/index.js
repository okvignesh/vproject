import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserPositionScreen = () => {
  const currentUser = auth().currentUser;
  const userId = currentUser ? currentUser.uid : '';
  const userName = currentUser ? currentUser.displayName : '';

  const [currentLocation, setCurrentLocation] = useState({
    // latitude: 51.4657689,
    // longitude: -2.5722472,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    latitude: 51.4657689,
    longitude: -2.5722472,
    speed: 10,
  });

  const [userProfile, setUserProfile] = useState({
    author: '',
    firstName: '',
    lastName: '',
    userColor: '#000000',
  });

  useEffect(() => {
    fetchUserProfile();
    fetchCurrentLocation();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userProfileRef = firestore().collection('UserProfile');
      const userSnapshot = await userProfileRef
        .where('uid', '==', userId)
        .get();

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setUserProfile({
          author: userData.author || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          userColor: userData.userColor || '#000000',
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchCurrentLocation = () => {
    // Implement logic to fetch the current location from Maps
    // Update the state with latitude, longitude, and speed
  };

  const saveUserPosition = async () => {
    try {
      const userPositionRef = firestore().collection('UsersPosition');
      const userPositionSnapshot = await userPositionRef
        .where('userId', '==', userId)
        .get();

      const locationTime = new Date();

      const userPositionData = {
        userId,
        userName,
        currentLatitude: currentLocation.latitude,
        currentLongitude: currentLocation.longitude,
        locationTime,
        speed: currentLocation.speed,
        author: userProfile.author,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        userColor: userProfile.userColor,
      };

      if (userPositionSnapshot.empty) {
        // No existing document, add a new one
        await userPositionRef.add(userPositionData);
      } else {
        // Update the existing document
        await userPositionRef
          .doc(userPositionSnapshot.docs[0].id)
          .update(userPositionData);
      }

      Alert.alert('User Position Saved Successfully!');
    } catch (error) {
      console.error('Error adding/updating user position:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>User Position</Text>

        {/* Display the current location on the map */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Current Location"
            description={`Speed: ${currentLocation.speed}`}
          />
        </MapView>

        <TouchableOpacity style={styles.button} onPress={saveUserPosition}>
          <Text style={styles.buttonText}>Save User Position</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    height: 200,
    width: '100%',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserPositionScreen;
