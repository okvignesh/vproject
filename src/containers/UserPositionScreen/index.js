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
import {TextInput, Colors} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {LocationHelper} from '../../helpers';

const UserPositionScreen = () => {
  const currentUser = auth().currentUser;
  const userId = currentUser ? currentUser.uid : '';
  const userName = currentUser ? currentUser.displayName : '';
  const locationTime = new Date();

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 51.4657689,
    longitude: -2.5722472,
    speed: 10,
  });

  console.log('currentLocation out ', currentLocation);

  const [userProfile, setUserProfile] = useState({
    author: 'Vignesh',
    firstName: '',
    lastName: '',
    userColor: '#000000',
  });

  useEffect(() => {
    fetchUserProfile();
    console.log('currentLocation before ', currentLocation);
    fetchCurrentLocation();
    console.log('currentLocation after ', currentLocation);
  }, []);

  useEffect(() => {
    // Define your function here

    // Call the function initially
    fetchCurrentLocation();

    // Set up the interval to call the function every 5 seconds
    const intervalId = setInterval(fetchCurrentLocation, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
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
    console.log('Calling fetchCurrentLocation every 5 secs');
    LocationHelper.checkLocationPermission(
      () => {
        // LocationHelper.fetchLocation(
        LocationHelper.trackUserLocation(
          position => {
            console.log('tracking position', position);
            // console.log(position.coords);
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              speed: position.coords.speed,
            });
          },
          error => {
            console.log(error);
          },
        );
      },
      error => {
        console.log(`Error fetching current location ${error}`);
      },
    );
  };

  const saveUserPosition = async () => {
    try {
      //   fetchCurrentLocation();
      const userPositionRef = firestore().collection('UsersPosition');
      const userPositionSnapshot = await userPositionRef
        .where('userId', '==', userId)
        .get();

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
        await userPositionRef.add(userPositionData);
      } else {
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
            title={`Current Location of ${userName}`}
            description={`Speed: ${currentLocation.speed}`}
          />
        </MapView>

        <View style={styles.infoContainer}>
          <TextInput
            label="User ID"
            value={userId}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="User Name"
            value={userName}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="Latitude"
            value={`${currentLocation.latitude}`}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="Longitude"
            value={`${currentLocation.longitude}`}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="Location Time"
            value={`${locationTime}`}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="Speed"
            value={`${currentLocation.speed}`}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="Author"
            value={userProfile.author}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="First Name"
            value={userProfile.firstName}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="Last Name"
            value={userProfile.lastName}
            style={styles.input}
            editable={false}
          />
          <TextInput
            label="User Color"
            value={userProfile.userColor}
            style={{
              ...styles.input,
              backgroundColor: `#${userProfile.userColor}`,
            }}
            editable={false}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={saveUserPosition}>
          <Text style={styles.buttonText}>Save User Position</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchCurrentLocation}>
          <Text style={styles.buttonText}>Fetch User Position</Text>
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
  infoContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
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
