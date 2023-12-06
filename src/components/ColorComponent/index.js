import React, {useState} from 'react';
import {Button, Modal, StyleSheet, View, Text} from 'react-native';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

const ColorComponent = ({onColorChange}) => {
  const [showModal, setShowModal] = useState(false);
  const [colorCode, setColorCode] = useState(null);

  const onSelectColor = ({hex}) => {
    const hexWithoutHash = hex.substring(1);
    setColorCode(hexWithoutHash);
  };

  const onPressOK = () => {
    onColorChange(colorCode);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Update Color" onPress={() => setShowModal(true)} />

      <Modal visible={showModal} animationTyp="fade">
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
    backgroundColor: 'white',
  },
  colorPicker: {
    width: '70%',
    aspectRatio: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ColorComponent;
