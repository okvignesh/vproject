import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
  password: yup.string().required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async data => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      console.log('User Logged in successfully!', response?.user?.displayName);
      // navigation.navigate('ProfileScreen', response?.user?.displayName);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('email', {type: 'manual', message: 'Invalid email address'});
      }
      console.error(error);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        onPress={handleSubmit(handleLogin)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignup}>
        <Text style={styles.signupText}>
          Don't have an account? Sign up here
        </Text>
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
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#3498db',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default LoginScreen;
