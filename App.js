import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Navigator from './src/navigator';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen, SignupScreen} from './src/containers';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
