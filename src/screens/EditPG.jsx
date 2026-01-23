import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";

export default function EditPG() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit PG Details</Text>

      <Text style={styles.label}>PG Name</Text>
      <TextInput style={styles.input} placeholder="Enter PG Name" />

      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} placeholder="Enter Location" />

      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Contact Number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Description"
        multiline
      />

      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9ff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveBtn: {
    backgroundColor: "#007bff",
    marginTop: 20,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
