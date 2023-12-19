import React, {StyleSheet, Text, View, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  LoginScreen,
  SignupScreen,
  ProfileScreen,
  WelcomeScreen,
  UserProfileScreen,
  AllUsersScreen,
  UserPositionScreen,
  AllUsersPosition,
  PubNubScreen,
} from '../containers';
import {MyPlaces, AllPlaces, AddPlace, LanguagesModal} from '../components';
import auth from '@react-native-firebase/auth';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  const {t} = useTranslation();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
  }

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User Logged Out Successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const DrawerNav = () => {
    return (
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
        }}
        drawerContent={props => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label={t('logout')} onPress={handleLogout} />
          </DrawerContentScrollView>
        )}>
        <Drawer.Screen name={t('profileScreen')} component={ProfileScreen} />
        <Drawer.Screen
          name={t('userProfileScreen')}
          component={UserProfileScreen}
        />
        <Drawer.Screen name={t('allUsersScreen')} component={AllUsersScreen} />
        <Drawer.Screen
          name={t('userPositionScreen')}
          component={UserPositionScreen}
        />
        <Drawer.Screen
          name={t('allUsersPosition')}
          component={AllUsersPosition}
        />
        <Drawer.Screen name={t('myPlaces')} component={MyPlaces} />
        <Drawer.Screen name={t('allPlaces')} component={AllPlaces} />
        <Drawer.Screen name={t('addPlace')} component={AddPlace} />
        <Drawer.Screen
          name={t('pubnubScreen')}
          component={PubNubScreen}
          options={{drawerLabel: 'Chat'}}
        />

        <Drawer.Screen name={t('change-language')} component={LanguagesModal} />
      </Drawer.Navigator>
    );
  };

  const authNav = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      </Stack.Navigator>
    );
  };

  return isLoggedIn ? DrawerNav() : authNav();
};

export default Navigator;
