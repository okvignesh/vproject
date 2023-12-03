import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const MyPlaces = props => {
  return (
    <View>
      <Text>MyPlaces Component</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ProfileScreen');
        }}>
        <Text>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPlaces;

const styles = StyleSheet.create({});
