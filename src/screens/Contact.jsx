import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import Icon6 from "react-native-vector-icons/FontAwesome6";

const Contact = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>Get Started</Text>
        <Text style={styles.title}>
          Get in touch with us. We're here to assist you.
        </Text>

        <View style={styles.socialIcons}>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => Linking.openURL("https://www.facebook.com/")}
          >
            <Icon name="facebook-f" size={18} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => Linking.openURL("https://www.instagram.com/")}
          >
            <Icon name="instagram" size={18} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => Linking.openURL("https://twitter.com/")}
          >
            <Icon6 name="x-twitter" size={18} />
          </TouchableOpacity>
        </View>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <TextInput
          placeholder="Your Name"
          style={styles.input}
        />
        <TextInput
          placeholder="Email Address"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Message"
          multiline
          numberOfLines={5}
          style={[styles.input, styles.textArea]}
        />

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Leave Us a Message</Text>
        </TouchableOpacity>
      </View>

      {/* CONTACT INFO */}
      <View style={styles.info}>
        <View style={styles.infoLeft}>
          <Text style={styles.infoTitle}>Contact Info</Text>
          <Text style={styles.infoHeading}>
            We are always happy to{"\n"}assist you
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email Address</Text>
          <View style={styles.divider} />
          <Text style={styles.infoText}>support@hlopg.com</Text>
          <Text style={styles.infoSmall}>Assistance hours: 24/7</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    marginBottom: 30,
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111",
  },

  socialIcons: {
    flexDirection: "row",
    gap: 12,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },

  /* FORM */
  form: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 6,
    padding: 20,
    marginBottom: 25,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 20,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  submitBtn: {
    backgroundColor: "#7b61ff",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  /* INFO */
  info: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 6,
    padding: 20,
  },

  infoLeft: {
    marginBottom: 20,
  },

  infoTitle: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },

  infoHeading: {
    fontSize: 20,
    fontWeight: "700",
  },

  infoItem: {
    marginTop: 10,
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  divider: {
    width: 20,
    height: 2,
    backgroundColor: "#000",
    marginBottom: 6,
  },

  infoText: {
    fontWeight: "500",
    marginBottom: 3,
  },

  infoSmall: {
    fontSize: 12,
    color: "#555",
  },
});

