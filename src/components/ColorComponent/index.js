import React, {useEffect, useState} from 'react';
import {Button, Modal, StyleSheet, View, Text} from 'react-native';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

const ColorComponent = ({onColorChange, userColor}) => {
  const [showModal, setShowModal] = useState(false);
  const [colorCode, setColorCode] = useState(userColor);
  const [checkCode, setCheckCode] = useState(false);

  useEffect(() => {
    setColorCode(userColor);
  }, []);

  const onSelectColor = ({hex}) => {
    setCheckCode(true);
    console.log(hex);
    const hexWithoutHash = hex.substring(1);
    setColorCode(hexWithoutHash);
  };

  const onPressOK = () => {
    console.log(userColor);
    console.log(colorCode);
    checkCode ? onColorChange(colorCode) : onColorChange(userColor);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Update Color" onPress={() => setShowModal(true)} />

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <ColorPicker
            style={styles.colorPicker}
            value="red"
            onChange={onSelectColor}
            onComplete={onSelectColor}>
            <Preview />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
          </ColorPicker>
          <View style={styles.buttonContainer}>
            <Button title="OK" onPress={() => onPressOK()} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  colorPicker: {
    width: '70%',
    aspectRatio: 1,
  },
  buttonContainer: {
    marginTop: 200,
  },
});

export default ColorComponent;
