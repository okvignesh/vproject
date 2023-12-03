import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  LoginScreen,
  SignupScreen,
  ProfileScreen,
  WelcomeScreen,
} from '../containers';
import {MyPlaces, AllPlaces, AddPlace} from '../components';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={StackNav} />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  return <DrawerNav />;
};

export default Navigator;

const styles = StyleSheet.create({});
