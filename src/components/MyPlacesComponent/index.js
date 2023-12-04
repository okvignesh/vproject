import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MyPlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      return;
    }

    const userUid = currentUser.uid;

    const unsubscribe = firestore()
      .collection('UserMyPlaces')
      .where('userId', '==', userUid)
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlaces(data);
      });

    return () => unsubscribe();
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
      <Text style={styles.title}>My Places Component</Text>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderPlaceItem}
      />
    </View>
  );
};

export default MyPlaces;

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
