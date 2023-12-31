import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsubscribe = firestore()
          .collection('UserMyPlaces')
          .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setPlaces(data);
          });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderPlaceItem = ({item}) => (
    <View style={styles.placeItem}>
      <Text style={styles.placeName}>{item.placeName}</Text>
      <Text style={styles.author}>{`Author: ${item.author}`}</Text>
      <Text style={styles.userName}>{`User: ${item.userName}`}</Text>
      <Text
        style={
          styles.coordinates
        }>{`Coordinates: ${item.latitude}, ${item.longitude}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Places Component</Text>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderPlaceItem}
      />
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('ProfileScreen');
        }}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default AllPlaces;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placeItem: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  userName: {
    fontSize: 14,
    color: '#555',
  },
  coordinates: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
