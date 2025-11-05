import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setDraft } from "../redux/profileSlice";
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const BasicInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const draft = useSelector((state) => state.profile.draftProfile);

  const [fullName, setFullName] = useState(draft?.fullName || "");
  const [email, setEmail] = useState(draft?.email || "");
  const [age, setAge] = useState(draft?.age?.toString() || "");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNext = () => {
    if (!fullName || !email || !age) {
      setModalMessage("Please fill all fields");
      setIsModalVisible(true);
      return;
    }

    if (!isValidEmail(email)) {
      setModalMessage("Please enter a valid email address");
      setIsModalVisible(true);
      return;
    }

    dispatch(setDraft({ fullName, email, age: Number(age) }));
    navigation.navigate("AddressInfo");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#9E9E9E"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#9E9E9E"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#9E9E9E"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Validation Error</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
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
    backgroundColor: "#121212",
    padding: responsiveWidth(5),
    justifyContent: "center",
  },
  title: {
    fontSize: responsiveFontSize(2.8),
    fontWeight: "bold",
    marginBottom: responsiveHeight(3),
    textAlign: "center",
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    marginBottom: responsiveHeight(2),
    padding: responsiveWidth(3),
    fontSize: responsiveFontSize(2),
    color: "#FFFFFF",
    backgroundColor: "#1E1E1E",
  },
  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: responsiveHeight(1.8),
    borderRadius: 8,
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2.2),
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    padding: responsiveWidth(5),
    alignItems: "center",
  },
  modalTitle: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: "bold",
    color: "#FF5252",
    marginBottom: responsiveHeight(1.5),
  },
  modalMessage: {
    fontSize: responsiveFontSize(2),
    color: "#E0E0E0",
    textAlign: "center",
    marginBottom: responsiveHeight(2),
  },
  modalButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: responsiveHeight(1.3),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
});

export default BasicInfoScreen;
