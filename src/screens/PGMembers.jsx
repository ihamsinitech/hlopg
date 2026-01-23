import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import api from "../api"; // same api file

const PGMembers = ({ route }) => {
  const { pgId } = route.params; // 👈 from navigation
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.get(`/pg/members/${pgId}`);
        setMembers(res.data || []);
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [pgId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5b5ff8" />
        <Text style={styles.loadingText}>Loading members...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PG Members</Text>

      {members.length === 0 ? (
        <Text style={styles.emptyText}>No members found</Text>
      ) : (
        <FlatList
          data={members}
          keyExtractor={(item) =>
            String(item.id || item.user_id)
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.row}>
                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{item.age}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Sharing:</Text>
                <Text style={styles.value}>{item.sharing}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Joining Date:</Text>
                <Text style={styles.value}>{item.joiningDate}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default PGMembers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f6f7ff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 110,
    fontWeight: "500",
    color: "#555",
  },
  value: {
    color: "#222",
  },
  emptyText: {
    marginTop: 40,
    textAlign: "center",
    color: "#888",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
});
