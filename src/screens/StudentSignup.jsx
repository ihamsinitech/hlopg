import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Dimensions ,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import api from "../api";

const StudentSignup = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  useEffect(() => {
    if (!showOTP) return;
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showOTP]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errs = {};

    if (formData.name.length < 3)
      errs.name = "Name must be at least 3 characters";
    if (!emailRegex.test(formData.email))
      errs.email = "Invalid email";
    if (!phoneRegex.test(formData.phone))
      errs.phone = "Invalid phone number";
    if (formData.password.length < 6)
      errs.password = "Password too short";
    if (formData.password !== formData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      await api.post("/auth/registeruser", { formData });
      setShowOTP(true);
      setTimer(30);
    } catch (e) {
      Alert.alert("Error", "Registration failed");
    }
  };

  const verifyOTP = async () => {
    try {
      await api.post("/auth/verify-otp", {
        identifier: formData.phone,
        otp_code: otp.join(""),
        purpose: "registration",
      });
      Alert.alert("Success", "Account created");
      setShowOTP(false);
      navigation.navigate("StudentLogin");
    } catch {
      Alert.alert("Error", "Invalid OTP");
    }
  };

  return (
  <View style={styles.screen}>
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* LOGO */}
      <Image
        source={require("../assets/logo.png")} // adjust path if needed
        style={styles.logo}
      />

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Student Signup</Text>

        <TextInput
          placeholder="Full Name"
          style={styles.input}
          onChangeText={(v) => handleChange("name", v)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(v) => handleChange("email", v)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          placeholder="Phone"
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(v) => handleChange("phone", v)}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={(v) => handleChange("password", v)}
        />

        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          onChangeText={(v) => handleChange("confirmPassword", v)}
        />

        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("StudentLogin")}>
          <Text style={styles.link}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>

    {/* OTP MODAL */}
    <Modal visible={showOTP} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>Enter OTP</Text>

          <View style={styles.otpRow}>
            {otp.map((v, i) => (
              <TextInput
                key={i}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(val) => {
                  const arr = [...otp];
                  arr[i] = val;
                  setOtp(arr);
                }}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={verifyOTP}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>

          <Text style={styles.resendText}>
            Resend OTP in {timer}s
          </Text>
        </View>
      </View>
    </Modal>
  </View>
);

};

export default StudentSignup;



const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  /* =============== LOGIN LAYOUT =============== */
  container: {
    flex: 1,
    backgroundColor: "#eef7fb",
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
  },
  screen: {
  flex: 1,
  backgroundColor: "#eef7fb",
},

scrollContent: {
  alignItems: "center",
  paddingVertical: 40,
  paddingHorizontal: 20,
},

logo: {
  width: width * 0.6,
  height: 220,
  resizeMode: "contain",
  marginBottom: 30,
},


  image: {
    height: 260,
    width: width * 0.75,
    borderRadius: 20,
    resizeMode: "cover",
    marginBottom: 30,
  },

  /* =============== CARD =============== */
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#f9fdff",
    borderRadius: 16,
    padding: 24,

    /* shadow */
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },

  /* =============== FORM INPUTS =============== */
  input: {
    borderWidth: 1,
    borderColor: "#50dcf5",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  inputValid: {
    borderColor: "#22c55e",
  },

  inputInvalid: {
    borderColor: "#e63946",
  },

  errorText: {
    color: "#e63946",
    fontSize: 13,
    marginBottom: 8,
  },

  /* =============== BUTTON =============== */
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  link: {
    textAlign: "center",
    marginTop: 18,
    color: "#4f46e5",
    fontSize: 14,
    fontWeight: "500",
  },

  /* =============== OTP MODAL =============== */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#fff",
    width: "90%",
    maxWidth: 380,
    borderRadius: 12,
    padding: 24,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4f46e5",
    marginBottom: 10,
    textAlign: "center",
  },

  modalText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#50dcf5",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 22,
  },

  otpButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  cancelButton: {
    backgroundColor: "#888",
  },

  resendText: {
    marginTop: 12,
    color: "#4f46e5",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },

  otpError: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "500",
  },
});

