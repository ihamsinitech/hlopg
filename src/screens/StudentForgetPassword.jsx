import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const StudentForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    Alert.alert("Success", `Password reset link sent to ${email}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>

        {/* 🔹 LOGO */}
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.subtitle}>
          Enter your registered email to reset your password
        </Text>

        <Text style={styles.label}>Email Address</Text>

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("StudentLogin")}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
};

export default StudentForgetPassword;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 30,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 15,
    resizeMode: "contain",
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#111",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  back: {
    marginTop: 20,
    alignItems: "center",
  },

  backText: {
    color: "#4f46e5",
    fontSize: 14,
    fontWeight: "500",
  },
});
