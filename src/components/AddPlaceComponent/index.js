import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const AddPlace = props => {
  const [region, setRegion] = useState({
    latitude: 51.4657689,
    longitude: -2.5722472,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationName, setLocationName] = useState('');
  const currentUser = auth().currentUser;
  // console.log('Current User ', currentUser); //displayName //email //uid

  const handleRegionChangeComplete = newRegion => {
    setRegion(newRegion);
  };

  const handleAddPlace = async () => {
    try {
      await firestore().collection('UserMyPlaces').add({
        userId: currentUser.uid,
        userName: currentUser.displayName,
        latitude: region.latitude,
        longitude: region.longitude,
        placeName: locationName,
        author: 'Vignesh',
      });

      console.log('Place added successfully!');
      Alert.alert('Data Added Successfully');
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Place Component</Text>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChangeComplete}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </MapView>
      <TextInput
        style={styles.input}
        placeholder="Enter location name"
        value={locationName}
        onChangeText={setLocationName}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPlace}>
        <Text style={styles.buttonText}>Add Place</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.navigation.navigate('ProfileScreen');
        }}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  map: {
    flex: 1,
    height: 300,
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

export default AddPlace;
