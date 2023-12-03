import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const AddPlace = props => {
  return (
    <View>
      <Text>Add Place Component</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ProfileScreen');
        }}>
        <Text>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPlace;

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
