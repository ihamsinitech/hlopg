import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigation = useNavigation();

  // ✅ Check token
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("hlopgToken");
      const user = await AsyncStorage.getItem("hlopgUser");
      const owner = await AsyncStorage.getItem("hlopgOwner");

      if (token && user) {
        navigation.replace("UserDashboard");
      } else if (token && owner) {
        navigation.replace("OwnerDashboard");
      }
    };

    checkAuth();
  }, []);

  const handleSignIn = () => {
    if (!selectedRole) {
      Alert.alert("Select role", "Please select a role to continue");
      return;
    }

    if (selectedRole === "student") {
      navigation.navigate("StudentLogin");
    } else {
      navigation.navigate("OwnerLogin");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Join as a User or Owner</Text>

        <View style={styles.options}>
          {/* STUDENT */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedRole === "student" && styles.selected,
            ]}
            onPress={() => setSelectedRole("student")}
          >
            <MaterialIcons
              name="people"
              size={44}
              color="#4f46e5"
            />
            <Text style={styles.cardText}>
              I’m a Student or Professional,{"\n"}looking for a PG / Hostel
            </Text>
          </TouchableOpacity>

          {/* OWNER */}
          <TouchableOpacity
            style={[
              styles.card,
              selectedRole === "owner" && styles.selected,
            ]}
            onPress={() => setSelectedRole("owner")}
          >
            <MaterialIcons
              name="apartment"
              size={44}
              color="#4f46e5"
            />
            <Text style={styles.cardText}>
              I’m an Owner,{"\n"}hosting a PG / Hostel
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.signInBtn,
            !selectedRole && styles.disabledBtn,
          ]}
          onPress={handleSignIn}
          disabled={!selectedRole}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9f9ff",
  },

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },

  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
  },

  selected: {
    borderColor: "#4f46e5",
    shadowColor: "#4f46e5",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },

  cardText: {
    marginTop: 14,
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
  },

  signInBtn: {
    marginTop: 30,
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  signInText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  disabledBtn: {
    backgroundColor: "#ccc",
  },
});

