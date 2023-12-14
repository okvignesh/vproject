import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

const schema = yup.object().shape({
  username: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
  password: yup.string().required('Password is required'),
});

const SignupScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSignup = async data => {
    try {
      console.log('Signup pressed');
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      console.log('User Account Created!');

      await userCredential.user.updateProfile({
        displayName: data.username,
      });

      Alert.alert('Signup Successful, Login Now');
      // Not required as it'll login immediately after signup since we're listening using onAuthStateChanged
      // navigation.navigate('LoginScreen');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('email', {
          type: 'manual',
          message: 'Email address is already in use.',
        });
      } else if (error.code === 'auth/invalid-email') {
        setError('email', {type: 'manual', message: 'Invalid email address.'});
      } else {
        console.log('Unexpected error during signup: ', error);
        Alert.alert('An unexpected error occurred during signup.');
      }
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Controller
        control={control}
        render={({field}) => (
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Enter your Name"
            onChangeText={text => field.onChange(text)}
            value={field.value}
          />
        )}
        name="username"
        defaultValue=""
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username.message}</Text>
      )}

      <Controller
        control={control}
        render={({field}) => (
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Enter your Email"
            onChangeText={text => field.onChange(text)}
            value={field.value}
          />
        )}
        name="email"
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        render={({field}) => (
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={text => field.onChange(text)}
            value={field.value}
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(handleSignup)}>
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
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default SignupScreen;
