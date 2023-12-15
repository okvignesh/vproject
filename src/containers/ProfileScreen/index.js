import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const route = useRoute();
  const {t, i18n} = useTranslation();
  // const username = route.params;
  // console.log(username);
  // const [username, setUsername] = useState(route.params);
  const currentUser = auth().currentUser;

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out successfully!'));
    // props.navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${t('welcome1')} ${
        currentUser.displayName
      } !`}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>{t('logout')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

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
