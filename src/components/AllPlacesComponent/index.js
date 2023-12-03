import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const AllPlaces = props => {
  return (
    <View>
      <Text>All Places Component</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ProfileScreen');
        }}>
        <Text>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllPlaces;

const styles = StyleSheet.create({});
