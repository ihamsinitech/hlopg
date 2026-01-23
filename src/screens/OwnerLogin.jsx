import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
// import api from "../api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OwnerLogin = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("hlopgToken");
      const owner = await AsyncStorage.getItem("hlopgOwner");
    

    if (token && owner) navigation.navigate("OwnerDashboard");
    };

    checkLogin();
  }, []);

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await api.post("/auth/loginowner", { formData });
      const { token, owner } = res.data;
      localStorage.setItem("hlopgToken", token);
      localStorage.setItem("hlopgOwner", JSON.stringify(owner));
      navigation.navigate("OwnerDashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>PG / Hostel Owner Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.forgotContainer}>
  <TouchableOpacity onPress={() => navigation.navigate("OwnerForgetPassword")}>
    <Text style={styles.forgotLink}>Forgot Password?</Text>
  </TouchableOpacity>
</View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("OwnerSignup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OwnerLogin;

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#4f46e5", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "#fff", fontWeight: "600" },
  link: { color: "#4f46e5", textAlign: "center", marginTop: 10 },
  error: { color: "#e63946", marginBottom: 10, textAlign: "center" },
  forgotContainer: {
  alignItems: "flex-end",
  marginBottom: 15, // space between link and login button
},
forgotLink: {
  color: "#4f46e5",
  fontWeight: "500",
},

});
