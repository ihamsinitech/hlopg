import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../api";
import { useNavigation } from "@react-navigation/native";

const OwnerSignup = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});
  const [apiError, setApiError] = useState("");

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState("");

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9,11}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  // Countdown timer for OTP
  useEffect(() => {
    let interval;
    if (showOTPModal && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOTPModal, resendTimer]);

  // Field validation
  const validateField = (name, value) => {
    let message = "";
    let isValid = false;

    switch (name) {
      case "name":
        if (!value.trim()) message = "Name is required.";
        else if (value.trim().length < 3) message = "Name must be at least 3 characters.";
        else if (value.trim().length > 22) message = "Name cannot exceed 22 characters.";
        else isValid = true;
        break;

      case "email":
        if (!emailRegex.test(value)) message = "Enter a valid email.";
        else if (!value.endsWith("@gmail.com") && !value.endsWith("@outlook.com"))
          message = "Only Gmail or Outlook emails allowed.";
        else isValid = true;
        break;

      case "phone":
        if (!phoneRegex.test(value)) message = "Enter valid Indian phone number.";
        else isValid = true;
        break;

      case "password":
        if (!passwordRegex.test(value))
          message = "Min 6 chars, must include letters & numbers.";
        else isValid = true;
        break;

      case "confirmPassword":
        if (value !== formData.password) message = "Passwords do not match.";
        else isValid = true;
        break;

      default:
        isValid = true;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
    setValidFields((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Send OTP
  const sendOTP = () => {
    setShowOTPModal(true);
    setResendTimer(30);
    setCanResend(false);
    setOtpValues(["", "", "", ""]);
    otpRefs[0]?.current?.focus();
  };

  // Submit signup
  const handleSubmit = async () => {
    // Validate all fields
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    if (Object.values(validFields).includes(false) || Object.values(errors).some((e) => e))
      return;

    try {
      const res = await api.post("/auth/registerowner", { formData });
      sendOTP();
      Alert.alert("Success", "OTP sent to your phone");
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "";
      setApiError(msg.includes("phone") ? "Phone already exists" : msg.includes("email") ? "Email already registered" : msg);
    }
  };

  // OTP Verification
  const verifyOTP = async () => {
    const enteredOTP = otpValues.join("");
    try {
      const res = await api.post("/auth/verify-otp", {
        identifier: formData.phone,
        otp_code: enteredOTP,
        purpose: "registration",
      });

      if (res.data.success) {
        Alert.alert("Success", res.data.message);
        setShowOTPModal(false);
        navigation.navigate("OwnerLogin");
      } else {
        setOtpError(res.data.message);
      }
    } catch (err) {
      setOtpError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleOTPChange = (val, idx) => {
    const digit = val.replace(/\D/, "");
    const newOtp = [...otpValues];
    newOtp[idx] = digit;
    setOtpValues(newOtp);

    if (digit && idx < 3) otpRefs[idx + 1]?.current?.focus();
    if (!digit && idx > 0) otpRefs[idx - 1]?.current?.focus();
  };

  const resendOTP = async () => {
    try {
      await api.post("/auth/resend-otp", { identifier: formData.phone, purpose: "registration" });
      setResendTimer(30);
      setCanResend(false);
      setOtpValues(["", "", "", ""]);
      otpRefs[0]?.current?.focus();
      setOtpError("OTP resent!");
    } catch {
      setOtpError("Failed to resend OTP.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>PG / Hostel Owner Signup</Text>

      {["name", "email", "phone", "password", "confirmPassword"].map((field) => (
        <View key={field} style={styles.inputContainer}>
          <TextInput
            style={[styles.input, validFields[field] ? styles.validInput : errors[field] ? styles.invalidInput : null]}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            secureTextEntry={field.includes("password")}
            value={formData[field]}
            onChangeText={(text) => handleChange(field, text)}
          />
        </View>
      ))}

      {Object.values(errors).some((e) => e) && (
        <Text style={styles.error}>{Object.values(errors).filter((e) => e).join("\n")}</Text>
      )}
      {apiError ? <Text style={styles.error}>{apiError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("OwnerLogin")}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>

      {/* OTP Modal */}
      {showOTPModal && (
        <View style={styles.otpModal}>
          <View style={styles.otpContainer}>
            <Text style={styles.otpTitle}>Enter OTP</Text>
            <Text>Sent to: {formData.phone}</Text>

            <View style={styles.otpInputs}>
              {otpValues.map((val, idx) => (
                <TextInput
                  key={idx}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="numeric"
                  value={val}
                  ref={otpRefs[idx]}
                  onChangeText={(text) => handleOTPChange(text, idx)}
                />
              ))}
            </View>

            {otpError ? <Text style={styles.error}>{otpError}</Text> : null}

            <View style={styles.otpButtons}>
              <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#888" }]}
                onPress={() => setShowOTPModal(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity disabled={!canResend} onPress={resendOTP}>
              <Text style={[styles.link, !canResend && { color: "#aaa" }]}>
                Resend OTP {canResend ? "" : `(${resendTimer}s)`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default OwnerSignup;

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: "#f9fdff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  inputContainer: { marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#50dcf5", borderRadius: 8, padding: 12 },
  validInput: { borderColor: "#22c55e" },
  invalidInput: { borderColor: "#e63946" },
  error: { color: "#e63946", marginBottom: 10 },
  button: { backgroundColor: "#4f46e5", padding: 14, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "600" },
  link: { color: "#4f46e5", textAlign: "center", marginTop: 10 },
  otpModal: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  otpContainer: { width: "85%", backgroundColor: "#fff", padding: 20, borderRadius: 12, alignItems: "center" },
  otpTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  otpInputs: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15, width: "100%" },
  otpInput: { borderWidth: 1, borderColor: "#50dcf5", width: 50, height: 50, textAlign: "center", borderRadius: 8, fontSize: 20 },
  otpButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
});
