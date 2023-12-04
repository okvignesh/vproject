import {StyleSheet, Text, View, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  LoginScreen,
  SignupScreen,
  ProfileScreen,
  WelcomeScreen,
} from '../containers';
import {MyPlaces, AllPlaces, AddPlace} from '../components';
import auth from '@react-native-firebase/auth';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
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

  return isLoggedIn ? (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={handleLogout} />
        </DrawerContentScrollView>
      )}>
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name="MyPlaces" component={MyPlaces} />
      <Drawer.Screen name="AllPlaces" component={AllPlaces} />
      <Drawer.Screen name="AddPlace" component={AddPlace} />
    </Drawer.Navigator>
  ) : (
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

export default Navigator;
