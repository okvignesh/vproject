import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignupScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async () => {
    try {
      console.log('Signup pressed');
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('User Account Created!');

      await userCredential.user.updateProfile({
        displayName: username,
      });

      setEmail('');
      setPassword('');
      setUsername('');

      Alert.alert('Signup Successful, Login Now');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Alert.alert('Email address is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        Alert.alert('Invalid email address.');
      } else {
        console.log('Unexpected error during signup: ', error);
        Alert.alert('An unexpected error occurred during signup.');
      }
    }
  };

  const handleLogin = () => {
    props.navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Enter your Name"
        onChangeText={text => setUsername(text)}
        value={username}
      />

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Enter your Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Enter your Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default SignupScreen;
