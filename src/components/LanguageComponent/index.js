// LanguagesModal.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import i18next from '../../../services/i18next';
import languageList from '../../../services/languageList.json';

const LanguagesModal = ({navigation}) => {
  const {t} = useTranslation();

  const changeLanguage = lng => {
    i18next.changeLanguage(lng);
    navigation.goBack();
  };

  return (
    <View style={styles.modalContainer}>
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={() => navigation.goBack()}>
        <View style={styles.modalContent}>
          <FlatList
            data={Object.keys(languageList)}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.languageButton}
                onPress={() => changeLanguage(item)}>
                <Text style={styles.langName}>
                  {languageList[item].nativeName}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText2}>{t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignSelf: 'center',
    marginTop: 'auto',
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
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#E23f2c',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});

export default LanguagesModal;
