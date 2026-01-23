import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import api from "../api";

// Local fallback image
const pgDefaultImg = require("../assets/pg1.png");

const MyPGs = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchOwnerPGs = async () => {
      try {
        const token = await AsyncStorage.getItem("hlopgToken");
        if (!token) throw new Error("Token missing");

        const res = await api.get("/owner/pgs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPgs(res.data?.data || []);
      } catch (err) {
        console.error("Error fetching PGs:", err);
        setError("Failed to load PGs");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerPGs();
  }, []);

  const handleAction = (hostelId, action) => {
    if (action === "editRooms") {
      navigation.navigate("EditRooms", { hostelId });
    }
  };

  const renderPG = ({ item }) => (
    <View style={styles.pgCard}>
      <Image
        source={
          item.image
            ? { uri: item.image }
            : pgDefaultImg
        }
        style={styles.pgImage}
      />

      <Text style={styles.pgName}>{item.hostel_name}</Text>

      <View style={styles.pgActions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAction(item.hostel_id, "editRooms")}
        >
          <Text style={styles.buttonText}>View Room's</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5b5ff8" />
        <Text>Loading PGs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My PGs</Text>

      {pgs.length === 0 ? (
        <Text>No PGs found</Text>
      ) : (
        <FlatList
          data={pgs}
          keyExtractor={(item) => item.hostel_id.toString()}
          renderItem={renderPG}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default MyPGs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },

  row: {
    justifyContent: "space-between",
  },

  pgCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    width: "48%",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  pgImage: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
  },

  pgName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },

  pgActions: {
    gap: 8,
  },

  button: {
    backgroundColor: "#5b5ff8",
    paddingVertical: 8,
    borderRadius: 6,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    color: "red",
    fontSize: 14,
  },
});
