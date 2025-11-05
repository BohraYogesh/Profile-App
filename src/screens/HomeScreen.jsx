import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProfile, setEditDraft, setDraft } from '../redux/profileSlice';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const HomeScreen = () => {
  const profiles = useSelector(state => state.profile.profiles);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const openDeleteModal = (id, name) => {
    setSelectedProfile({ id, name });
    setIsModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedProfile) {
      dispatch(deleteProfile(selectedProfile.id));
    }
    setIsModalVisible(false);
    setSelectedProfile(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.addButton}
        onPress={() => {
          dispatch(setDraft({}));
          navigation.navigate('BasicInfo');
        }}
      >
        <Text style={styles.addButtonText}>+ Add Profile</Text>
      </TouchableOpacity>

      {/* Profiles List */}
      <FlatList
        data={profiles}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: responsiveHeight(2),
          flexGrow: 1,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.info}>{item.email}</Text>
            <Text style={styles.info}>
              {item.city}, {item.country}
            </Text>

            <View style={styles.buttonRow}>
              {/* Edit Button */}
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.actionButton, { backgroundColor: '#00C853' }]}
                onPress={() => {
                  dispatch(setEditDraft(item));
                  navigation.navigate('BasicInfo');
                }}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.actionButton, { backgroundColor: '#FF5252' }]}
                onPress={() => openDeleteModal(item.id, item.fullName)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Profile Data</Text>
          </View>
        )}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Delete</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete{' '}
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>
                {selectedProfile?.name}
              </Text>
              ’s profile?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.modalButton, { backgroundColor: '#424242' }]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                style={[styles.modalButton, { backgroundColor: '#FF5252' }]}
                onPress={confirmDelete}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(3),
    backgroundColor: '#121212',
  },
  addButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  addButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  card: {
    padding: responsiveHeight(2),
    marginVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    backgroundColor: '#1E1E1E',
    borderColor: '#333',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  name: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: responsiveHeight(0.5),
  },
  info: {
    fontSize: responsiveFontSize(1.8),
    color: '#BDBDBD',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
  },
  actionButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.2),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    marginHorizontal: responsiveWidth(1),
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '600',
  },
  emptyContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(20),
  },
  emptyText: {
    color: '#9E9E9E',
    fontSize: responsiveFontSize(2),
    fontStyle: 'italic',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#2C2C2C',
    borderRadius: 10,
    padding: responsiveWidth(5),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
    color: '#FFFFFF',
  },
  modalMessage: {
    fontSize: responsiveFontSize(2),
    color: '#E0E0E0',
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: responsiveHeight(1.3),
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: responsiveWidth(1),
  },
  modalButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
  },
});

export default HomeScreen;
