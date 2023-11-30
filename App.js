import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

function App() {
  return (
    <SafeAreaView style={styles.centerStyle}>
      <View>
        <Text>Welcome to V-Project</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
