import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.logoText}>HloPG</Text>
      </View>

      <Text style={styles.description}>
        HLOPG helps you find well-maintained and comfortable PG hostels with ease.
        We provide verified options to ensure a safe and hassle-free stay.
      </Text>

      {/* Top Cities */}
      <View style={styles.section}>
        <Text style={styles.heading}>Top Cities</Text>

        <TouchableOpacity>
          <Text style={styles.link}>Hyderabad</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Delhi</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Chennai</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Links */}
      <View style={styles.section}>
        <Text style={styles.heading}>Quick Links</Text>

        <TouchableOpacity onPress={() => navigation?.navigate("AboutUs")}>
          <Text style={styles.link}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Terms</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Rules</Text>
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.heading}>Support</Text>

        <TouchableOpacity>
          <Text style={styles.link}>T & C</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ContactUs")}>
          <Text style={styles.link}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Store Buttons */}
      <TouchableOpacity
        style={styles.storeBtn}
        onPress={() => Linking.openURL("https://play.google.com/store")}
      >
        <FontAwesome5 name="google-play" size={20} color="#000" brands />

        <Text style={styles.storeText}>Google Play Store</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.storeBtn}
        onPress={() => Linking.openURL("https://www.apple.com/in/app-store/")}
      >
        <FontAwesome name="apple" size={20} color="#000" />
        <Text style={styles.storeText}>Apple App Store</Text>
      </TouchableOpacity>

      {/* Social Icons */}
      <View style={styles.socials}>
        <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
          <FontAwesome name="facebook" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
          <FontAwesome name="instagram" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
          <FontAwesome name="twitter" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom */}
      <Text style={styles.bottom}>
        © 2025 hlopg.com{"\n"}All rights reserved.
      </Text>
    </View>
  );
};

export default Footer;


const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#000",
    padding: 25,
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  logo: {
    width: 36,
    height: 36,
    marginRight: 8,
  },

  logoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  description: {
    color: "#ccc",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
  },

  section: {
    alignItems: "center",
    marginBottom: 18,
  },

  heading: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  link: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 4,
  },

  storeBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 6,
    width: "100%",
    justifyContent: "center",
  },

  storeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },

  socials: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    gap: 15,
  },

  bottom: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#222",
    paddingTop: 10,
    width: "100%",
  },
});
