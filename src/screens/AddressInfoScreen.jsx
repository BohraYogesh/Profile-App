import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDraft } from '../redux/profileSlice';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const AddressInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const draft = useSelector((state) => state.profile.draftProfile);

  const [city, setCity] = useState(draft?.city || '');
  const [stateName, setStateName] = useState(draft?.state || '');
  const [country, setCountry] = useState(draft?.country || '');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleNext = () => {
    if (!city || !stateName || !country) {
      setModalMessage('Please fill all fields');
      setIsModalVisible(true);
      return;
    }

    dispatch(setDraft({ city, state: stateName, country }));
    navigation.navigate('Summary');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address Information</Text>

      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="#aaa"
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        placeholderTextColor="#aaa"
        value={stateName}
        onChangeText={setStateName}
      />

      <TextInput
        style={styles.input}
        placeholder="Country"
        placeholderTextColor="#aaa"
        value={country}
        onChangeText={setCountry}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#444' }]}
          onPress={() => navigation.goBack()}
          activeOpacity={1}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={handleNext}
          activeOpacity={1}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>⚠ Validation Error</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: responsiveWidth(5),
    justifyContent: 'center',
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: '700',
    color: '#fff',
    marginBottom: responsiveHeight(3),
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
    padding: responsiveWidth(3),
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
  },
  button: {
    flex: 1,
    paddingVertical: responsiveHeight(1.8),
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: responsiveWidth(1),
    // shadowColor: '#007BFF',
    // shadowOpacity: 0.5,
    // shadowRadius: 8,
    // elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: responsiveWidth(5),
    alignItems: 'center',
    borderWidth: 1,
    // borderColor: '#007BFF',
    // shadowColor: '#007BFF',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    color: '#FF5555',
    marginBottom: responsiveHeight(1.5),
  },
  modalMessage: {
    fontSize: responsiveFontSize(2),
    color: '#ddd',
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: responsiveHeight(1.3),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});

export default AddressInfoScreen;
