import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk-next';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login pressed');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User Logged in successfully!');
        setEmail('');
        setPassword('');
        props.navigation.navigate('ProfileScreen');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  const navigateToSignup = () => {
    props.navigation.navigate('SignupScreen');
  };

  // async function onFacebookButtonPress() {
  //   // Attempt login with permissions
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccessToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignup}>
        <Text style={styles.signupText}>
          Don't have an account? Sign up here
        </Text>
      </TouchableOpacity>

      {/* <LoginButton
        onLoginFinished={(error, result) => {
          // if (error) {
          //   console.log('login has error: ' + result.error);
          // } else if (result.isCancelled) {
          //   console.log('login is cancelled.');
          // } else {
          //   AccessToken.getCurrentAccessToken().then(data => {
          //     // console.log(data?.accessToken.toString());

          //     const facebookCredential = auth.FacebookAuthProvider.credential(
          //       data.accessToken,
          //     );

          //     // Sign-in the user with the credential
          //     auth()
          //       .signInWithCredential(facebookCredential)
          //       .then(success => {
          //         console.log('Is it success really ? ', success);
          //         props.navigation.navigate('ProfileScreen');
          //       })
          //       .catch(error => {
          //         console.log('Is it error really ? ', error);
          //       });
          //   });
          // }
          
          // onFacebookButtonPress;

          // if (error) {
          //   console.log('login has error: ' + result.error);
          // } else if (result.isCancelled) {
          //   console.log('login is cancelled.');
          // } else {
          //   AccessToken.getCurrentAccessToken().then(data => {
          //     console.log(data.accessToken.toString());
          //   });
          // }
        }}
        onLogoutFinished={() => console.log('logout.')}
      /> */}
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
});

export default LoginScreen;
