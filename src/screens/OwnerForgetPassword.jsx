import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
// import api from "../api";
import { useNavigation } from "@react-navigation/native";

const OwnerForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccessMsg("");

    // Basic email validation
    if (!email) {
      setError("Email is required");
      return;
    } 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/owner-forgot-password", { email });
      setSuccessMsg(res.data.message || "OTP sent to your email!");
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your registered email to receive a password reset OTP.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMsg ? <Text style={styles.success}>{successMsg}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Sending..." : "Send OTP"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("OwnerLogin")}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OwnerForgetPassword;

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#4f46e5", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "600" },
  link: { color: "#4f46e5", textAlign: "center", marginTop: 10 },
  error: { color: "#e63946", marginBottom: 10, textAlign: "center" },
  success: { color: "#22c55e", marginBottom: 10, textAlign: "center" },
});
