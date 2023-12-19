import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
// import i18next, {languageResources} from '../../../services/i18next';
// import languageList from '../../../services/languageList.json';
// import {useTranslation} from 'react-i18next';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email'),
  password: yup.string().required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  // const {t, i18n} = useTranslation();
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

  // const [visible, setVisible] = useState(false);

  // const changeLng = lng => {
  //   i18n.changeLanguage(lng);
  //   setVisible(false);
  // };

  return (
    <View style={styles.container}>
      {/* <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={Object.keys(languageResources)}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.languageButton}
                  onPress={() => changeLng(item)}>
                  <Text style={styles.langName}>
                    {languageList[item].nativeName}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setVisible(false)}>
              <Text style={styles.buttonText2}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      <Text testID="welcome" style={styles.title}>
        welcome
      </Text>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setVisible(true);
        }}>
        <Text style={styles.buttonText}>{t('change-language')}</Text>
      </TouchableOpacity> */}
      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        render={({field}) => (
          <TextInput
            testID="email_input"
            autoCapitalize="none"
            style={styles.input}
            placeholder="Enter your email"
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
            testID="password_input"
            style={styles.input}
            placeholder="Enter your password"
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
        testID="login_button"
        style={styles.button}
        onPress={handleSubmit(handleLogin)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity testID="signup_button" onPress={navigateToSignup}>
        <Text style={styles.signupText}>No Account? Signup now !</Text>
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
  languageButton: {
    padding: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  buttonText2: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  langName: {
    fontSize: 16,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#54afd8',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#E23f2c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});

export default LoginScreen;
