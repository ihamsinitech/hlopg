import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Dashboard from "./Dashboard";
import UploadPG from "./UploadPG";
import MyPGs from "./MyPGs";
import PGMembersList from "./PGMembersList";
import PaymentsList from "./PaymentsList";
import Reviews from "./Reviews";

import logo from "../assets/logo.png";
import api from "../api";

const sidebarOptions = [
  { name: "Dashboard", icon: "home" },
  { name: "Upload PG", icon: "upload" },
  { name: "My PG’s", icon: "list" },
  { name: "PG Members List", icon: "user" },
  { name: "Payments List", icon: "money" },
  { name: "Reviews", icon: "heart" },
];

export default function AdminPanel() {
  const [selected, setSelected] = useState("Dashboard");
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  // -------- LOGOUT --------
  const handleLogout = async () => {
    await AsyncStorage.multiRemove([
      "hlopgToken",
      "hlopgUser",
      "hlopgOwner",
    ]);

    Alert.alert("Success", "Logged out successfully");
    navigation.replace("Home");
  };

  // ------ AUTH CHECK ------
  useEffect(() => {
    const verifyUser = async () => {
      const token = await AsyncStorage.getItem("hlopgToken");
      const userRole = await AsyncStorage.getItem("hlopgUser");

      if (!token) {
        navigation.replace("RoleSelection");
        return;
      }

      if (userRole) {
        navigation.replace("UserDashboard");
        return;
      }

      try {
        const res = await api.get("/auth/owner", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          const userRes = await api.get("/auth/ownerid", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(userRes.data);
        }
      } catch (err) {
        await AsyncStorage.clear();
        navigation.replace("RoleSelection");
      }
    };

    verifyUser();
  }, []);

  // ---- RENDER CONTENT ----
  const renderComponent = () => {
    switch (selected) {
      case "Dashboard":
        return <Dashboard user={user} />;
      case "Upload PG":
        return <UploadPG />;
      case "My PG’s":
        return <MyPGs user={user} />;
      case "PG Members List":
        return <PGMembersList user={user} />;
      case "Payments List":
        return <PaymentsList />;
      case "Reviews":
        return <Reviews />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* SIDEBAR */}
      <View style={styles.sidebar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>

        <ScrollView>
          {sidebarOptions.map(item => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.menuItem,
                selected === item.name && styles.activeItem,
              ]}
              onPress={() => setSelected(item.name)}
            >
              <Icon
                name={item.icon}
                size={18}
                color={selected === item.name ? "#5b5ff8" : "#555"}
              />
              <Text
                style={[
                  styles.menuText,
                  selected === item.name && styles.activeText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Icon name="sign-out" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.main}>
        <View style={styles.topbar}>
          <Text style={styles.title}>{selected}</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.content}>{renderComponent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f4f4fb",
  },

  sidebar: {
    width: 90,
    backgroundColor: "#fff",
    paddingVertical: 20,
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#e5e7eb",
  },

  logo: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginBottom: 25,
  },

  menuItem: {
    alignItems: "center",
    marginVertical: 12,
  },

  activeItem: {
    backgroundColor: "#e8e9ff",
    borderRadius: 10,
    padding: 8,
  },

  menuText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },

  activeText: {
    color: "#5b5ff8",
    fontWeight: "600",
  },

  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#5b5ff8",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  logoutText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 13,
  },

  main: {
    flex: 1,
    padding: 16,
  },

  topbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
  },
});

