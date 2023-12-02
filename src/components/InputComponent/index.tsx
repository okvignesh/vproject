import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

export type Props = {
  error: any;
  control: any;
  placeholder: string;
  name: string;
};

// interface InputComponentProps {
//   error: any;
//   control: any;
//   placeholder: string;
//   name: string;
// }

const InputComponent: React.FC<Props> = ({
  error,
  control,
  placeholder,
  name,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        rules={{required: true, validate: value => value.length > 0}}
        render={({field: {onChange, value}}) => {
          return (
            <TextInput
              autoCapitalize="none"
              style={styles.input}
              placeholder={placeholder}
              onChangeText={onChange}
              value={value}
            />
          );
        }}
      />

      {error && error?.message.length > 0 && (
        <Text style={styles.errorStyle}>{error.message}</Text>
      )}
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: 'pink',
  },
  errorStyle: {
    marginHorizontal: 10,
    color: 'red',
  },
});
