import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AllUsersScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const userCollection = await firestore()
          .collection('UserProfile')
          .get();
        const userData = userCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const unsubscribe = firestore()
      .collection('UserProfile')
      .onSnapshot(snapshot => {
        const updatedUsers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(updatedUsers);
      });

    fetchInitialData();

    return () => unsubscribe();
  }, []);

  const renderUserItem = ({item}) => (
    <View style={styles.userItem}>
      <Text
        style={
          styles.userName
        }>{`Name: ${item.firstName} ${item.lastName}`}</Text>
      <Text style={styles.userStyle}>{`DOB: ${item.dob}`}</Text>
      <Text style={styles.userStyle}>{`Gender: ${item.gender}`}</Text>
      <Text style={styles.userStyle}>{`Color: ${item.userColor}`}</Text>
      <Text style={styles.userStyle}>{`Location: ${item.userLocation}`}</Text>
      <Text style={styles.userStyle}>{`Author: ${item.author}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderUserItem}
      />
    </View>
  );
};

export default AllUsersScreen;

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
  userItem: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userStyle: {
    fontSize: 14,
    color: '#555',
  },
});
