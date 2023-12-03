import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/native';

const ProfileScreen = props => {
  const route = useRoute();
  const username = route.params;
  console.log(username);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out successfully!'));
    props.navigation.navigate('LoginScreen');
  };

  const handleMyPlaces = () => {
    props.navigation.navigate('MyPlaces');
  };

  const handleAllPlaces = () => {
    props.navigation.navigate('AllPlaces');
  };

  const handleAddPlace = () => {
    props.navigation.navigate('AddPlace');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard Screen</Text>
      <Text style={styles.title}>{`Welcome to the Dashboard ${username}`}</Text>
      <TouchableOpacity style={styles.button} onPress={handleMyPlaces}>
        <Text style={styles.buttonText}>My Places</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAllPlaces}>
        <Text style={styles.buttonText}>All Places</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddPlace}>
        <Text style={styles.buttonText}>Add Place</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

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
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
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
