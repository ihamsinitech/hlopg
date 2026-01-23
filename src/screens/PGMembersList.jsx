import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // npm i @react-native-picker/picker
import api from "../api";

const PGMembersList = ({ user }) => {
  const ownerId = user?.owner_id;

  const [pgs, setPgs] = useState([]);
  const [selectedPg, setSelectedPg] = useState("");
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All"); // default filter

  // Fetch Owner PGs
  useEffect(() => {
    const fetchOwnerPGs = async () => {
      try {
        const res = await api.get(`/owner/pgs/${ownerId}`);
        const pgList = res.data.data || res.data;
        setPgs(pgList);

        if (pgList.length > 0) {
          setSelectedPg(pgList[0].hostel_id.toString());
        }
      } catch (err) {
        console.error("Error fetching PGs:", err);
        setError("Failed to load PGs");
      } finally {
        setLoading(false);
      }
    };
    if (ownerId) fetchOwnerPGs();
  }, [ownerId]);

  // Fetch PG members
  useEffect(() => {
    if (!selectedPg) return;

    const fetchMembers = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/booking/pg/${selectedPg}`);
        const allMembers = Array.isArray(res.data.members)
          ? res.data.members
          : [];
        setMembers(allMembers);
        setFilteredMembers(allMembers); // default: all
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to load members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [selectedPg]);

  // Filter members whenever `filter` changes
  useEffect(() => {
    const now = new Date();
    let filtered = [...members];

    if (filter === "This Month") {
      filtered = members.filter((m) => {
        const joining = new Date(m.joiningDate);
        return (
          joining.getMonth() === now.getMonth() &&
          joining.getFullYear() === now.getFullYear()
        );
      });
    } else if (filter === "Last Month") {
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      filtered = members.filter((m) => {
        const joining = new Date(m.joiningDate);
        return joining.getMonth() === lastMonth && joining.getFullYear() === year;
      });
    }

    setFilteredMembers(filtered);
  }, [filter, members]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6c63ff" />
        <Text style={{ marginTop: 10 }}>Loading…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  const selectedPgName = pgs.find(
    (p) => p.hostel_id === Number(selectedPg)
  )?.hostel_name;

  const renderMember = ({ item }) => (
    <View style={styles.memberCard}>
      <Text style={styles.memberName}>{item.name}</Text>

      <View style={styles.memberRow}>
        <Text style={styles.label}>Sharing:</Text>
        <Text style={styles.value}>{item.sharing}</Text>
      </View>

      <View style={styles.memberRow}>
        <Text style={styles.label}>Joining:</Text>
        <Text style={styles.value}>{item.joiningDate}</Text>
      </View>

      <View style={styles.memberRow}>
        <Text style={styles.label}>Vacate:</Text>
        <Text style={styles.value}>{item.vacateDate || "-"}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* PG Picker */}
      <Text style={styles.labelText}>Select PG:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedPg}
          onValueChange={(val) => setSelectedPg(val)}
        >
          {pgs.map((pg) => (
            <Picker.Item
              key={pg.hostel_id}
              label={pg.hostel_name}
              value={pg.hostel_id.toString()}
            />
          ))}
        </Picker>
      </View>

      {/* Filter Picker */}
      <Text style={[styles.labelText, { marginTop: 15 }]}>Filter:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={filter} onValueChange={(val) => setFilter(val)}>
          <Picker.Item label="All Members" value="All" />
          <Picker.Item label="This Month" value="This Month" />
          <Picker.Item label="Last Month" value="Last Month" />
        </Picker>
      </View>

      <Text style={styles.pgTitle}>{selectedPgName} — Members</Text>

      {filteredMembers.length === 0 ? (
        <View style={styles.center}>
          <Text>No members found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredMembers}
          keyExtractor={(item) => item.booking_id.toString()}
          renderItem={renderMember}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
};

export default PGMembersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontWeight: "600",
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  pgTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 15,
  },
  memberCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  memberName: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 6,
  },
  memberRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 100,
    color: "#555",
    fontWeight: "500",
  },
  value: {
    color: "#222",
  },
});
