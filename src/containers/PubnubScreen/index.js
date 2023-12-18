// PubNubScreen.js
import React, {useEffect, useState} from 'react';
import PubNub from 'pubnub';
import {PubNubProvider, usePubNub} from 'pubnub-react';
import {Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';

const pubnub = new PubNub({
  publishKey: 'pub-c-f2919219-ac20-4403-b537-a678b79b4381',
  subscribeKey: 'sub-c-c5ddc634-c6fc-11e7-afd4-56ea5891403c',
  uuid: auth().currentUser ? auth().currentUser.uid : 'sdkjsdfgsjkhfgskjfgk',
});

// const userId1 = auth().currentUser.uid;

const PubNubScreen = ({route, navigation}) => {
  const {userName} = route.params;
  const [chatEnded, setChatEnded] = useState(false);

  useEffect(() => {
    setChatEnded(false);
  }, []);

  useEffect(() => {
    setChatEnded(false);
  }, [route]);

  const handleEndChat = () => {
    // Add logic to end the chat, navigate back to AllUsersPosition screen, and notify the other user
    setChatEnded(true);
    navigation.navigate('AllUsersPosition'); // Navigate to the AllUsersPosition screen
  };

  return (
    <PubNubProvider client={pubnub}>
      <Chat
        userName={userName}
        chatEnded={chatEnded}
        onEndChat={handleEndChat}
      />
    </PubNubProvider>
  );
};

function Chat({userName, chatEnded, onEndChat}) {
  const pubnub = usePubNub();
  function createUniqueChannelName(userId1, userId2) {
    // Sort user IDs alphabetically
    const sortedUserIds = [userId1, userId2].sort();

    console.log(sortedUserIds);

    // Use a separator (you can choose any character that suits your needs)
    const separator = '_';

    // Concatenate sorted user IDs with the separator
    const concatenatedIds = sortedUserIds.join(separator);

    console.log(concatenatedIds);

    // Return the concatenated string as the unique channel name
    return concatenatedIds;
  }

  const uniqueChannelName = createUniqueChannelName(
    auth().currentUser.uid,
    userName,
  );
  //   const [channels] = useState([userName]);
  // abc1 -> user id 1
  // def2 -> user id 2
  // abcdef12 like this?
  const [channels] = useState([uniqueChannelName]); //ITC
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleMessage = event => {
      const message = event.message;
      console.log('Received message', message);

      if (typeof message === 'string' || message.hasOwnProperty('text')) {
        const text = message.text || message;
        setMessages(prevMessages => [...prevMessages, text]);
      }
    };

    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});

    return () => {
      pubnub.removeListener({message: handleMessage});
      pubnub.unsubscribe({channels});
    };
  }, [pubnub, channels]);

  const sendMessage = message => {
    if (message) {
      pubnub.publish({
        channel: channels[0],
        message,
        // storeInHistory: true, // should be true to use ttl
        // ttl: 1, // Messages will be expired in 1 hour
      });
      setMessage('');
    }
  };

  const endChat = () => {
    onEndChat();
    pubnub.unsubscribeAll();
  };

  return (
    <View style={{flex: 1, padding: 16}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        {`Chat with ${userName}`}
      </Text>

      <FlatList
        data={messages}
        renderItem={({item, index}) => (
          <View style={{marginVertical: 5}}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      {!chatEnded && (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput
            autoComplete="off"
            autoCorrect={false}
            value={message}
            onChangeText={changedText => {
              setMessage(changedText);
            }}
            placeholder="Write a message"
            style={{
              flex: 1,
              backgroundColor: 'lightgrey',
              color: 'black',
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 8,
            }}
          />

          <TouchableOpacity
            style={{
              marginLeft: 10,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
              height: 44,
              borderRadius: 8,
            }}
            onPress={() => sendMessage(message)}>
            <Text style={{color: 'white'}}>Send</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* {!chatEnded && (
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            height: 44,
            borderRadius: 8,
          }}
          onPress={endChat}>
          <Text style={{color: 'white'}}>End Chat</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
}

export default PubNubScreen;
