import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [userColor, setUserColor] = useState('#000000');
  const [userLocation, setUserLocation] = useState('');
  const [author, setAuthor] = useState('');

  const currentUser = auth().currentUser;
  const uid = currentUser.uid;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userProfileRef = firestore().collection('UserProfile');
      const userSnapshot = await userProfileRef.where('uid', '==', uid).get();

      if (!userSnapshot.empty) {
        // User profile exists, update state with existing data
        const userData = userSnapshot.docs[0].data();
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setDob(userData.dob || '');
        setGender(userData.gender || 'male');
        setUserColor(userData.userColor || '#000000');
        setUserLocation(userData.userLocation || '');
        setAuthor(userData.author || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const confirmIOSDate = () => {
    setDob(formatDate(date));
    toggleDatePicker();
  };

  const formatDate = rawDate => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${month}/${day}/${year}`;
  };

  const onChange = ({type}, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
        setDob(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const handleAddUser = async () => {
    try {
      const userProfileRef = firestore().collection('UserProfile');
      const userSnapshot = await userProfileRef.where('uid', '==', uid).get();

      const userObject = {
        uid,
        firstName,
        lastName,
        dob,
        gender,
        userColor,
        userLocation,
        author,
      };

      if (userSnapshot.empty) {
        // No existing document, add a new one
        await userProfileRef.add(userObject);
      } else {
        // Update the existing document
        await userProfileRef.doc(userSnapshot.docs[0].id).update(userObject);
      }

      Alert.alert('User Profile Saved Successfully!');
    } catch (error) {
      console.error('Error adding/updating user profile:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
              style={styles.datePicker}
            />
          )}

          {showDatePicker && Platform.OS === 'ios' && (
            <View style={styles.iosButtonContainer}>
              <TouchableOpacity
                onPress={toggleDatePicker}
                style={styles.iosButton}>
                <Text style={styles.buttonText2}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmIOSDate}
                style={styles.iosButton}>
                <Text style={styles.buttonText2}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}

          {!showDatePicker && (
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={dob}
                onChangeText={text => setDob(text)}
                editable={false}
                onPressIn={toggleDatePicker}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={text => setGender(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>User Location</Text>
          <TextInput
            style={styles.input}
            placeholder="User Location"
            value={userLocation}
            onChangeText={text => setUserLocation(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Color</Text>
          <TextInput
            style={styles.input}
            placeholder="Color"
            value={userColor}
            onChangeText={text => setUserColor(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            placeholder="Author"
            value={author}
            onChangeText={text => setAuthor(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddUser}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
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
  buttonText2: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  iosButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  iosButton: {
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default UserProfileScreen;
