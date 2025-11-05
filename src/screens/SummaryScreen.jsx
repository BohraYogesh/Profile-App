import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addProfile, setDraft } from '../redux/profileSlice';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const SummaryScreen = ({ navigation }) => {
  const draft = useSelector(state => state.profile.draftProfile);
  const dispatch = useDispatch();

  const isEditing = !!draft?.id;

  const handleSubmit = () => {
    if (!draft) return;

    dispatch(addProfile());
    dispatch(setDraft({}));
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  if (!draft) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={styles.noData}>No profile data found!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Summary</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.value}>{draft.fullName}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{draft.email}</Text>

        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>{draft.age}</Text>

        <Text style={styles.label}>City</Text>
        <Text style={styles.value}>{draft.city}</Text>

        <Text style={styles.label}>State</Text>
        <Text style={styles.value}>{draft.state}</Text>

        <Text style={styles.label}>Country</Text>
        <Text style={styles.value}>{draft.country}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#444' }]}
          onPress={() => navigation.navigate('BasicInfo')}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isEditing ? '#ff9800' : '#007BFF' },
          ]}
          onPress={handleSubmit}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>
            {isEditing ? 'Update' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: responsiveWidth(5),
    backgroundColor: '#121212',
  },
  title: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    color: '#fff',
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: responsiveWidth(4),
    borderWidth: 1,
    borderColor: '#4d545cff',
    // shadowColor: '#007BFF',
    // shadowOpacity: 0.3,
    // shadowRadius: 8,
    // elevation: 5,
  },
  label: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: '#aaa',
    marginTop: responsiveHeight(1),
  },
  value: {
    fontSize: responsiveFontSize(2.2),
    color: '#fff',
    marginBottom: responsiveHeight(1.2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(3),
  },
  button: {
    flex: 1,
    paddingVertical: responsiveHeight(1.8),
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: responsiveWidth(1),
    // shadowColor: '#007BFF',
    // shadowOpacity: 0.4,
    // shadowRadius: 6,
    // elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  noData: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2.2),
    color: '#aaa',
  },
});

export default SummaryScreen;
