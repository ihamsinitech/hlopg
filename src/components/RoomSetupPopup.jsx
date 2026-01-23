import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const RoomSetupPopup = ({ visible, onClose, onGenerate }) => {
  const [floors, setFloors] = useState("");
  const [roomsPerFloor, setRoomsPerFloor] = useState("");
  const [sharing, setSharing] = useState("");
  const [bedsPerRoom, setBedsPerRoom] = useState("");

  const handleSubmit = () => {
    if (!floors || !roomsPerFloor || !sharing || !bedsPerRoom) {
      alert("Please fill out all fields");
      return;
    }

    onGenerate({
      floors,
      roomsPerFloor,
      sharing,
      bedsPerRoom,
    });

    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Setup Rooms</Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Number of Floors"
              keyboardType="number-pad"
              value={floors}
              onChangeText={setFloors}
              style={styles.input}
            />
            <TextInput
              placeholder="Rooms per Floor"
              keyboardType="number-pad"
              value={roomsPerFloor}
              onChangeText={setRoomsPerFloor}
              style={styles.input}
            />
          </View>

          <View style={styles.row}>
            <TextInput
              placeholder="Sharing per Room"
              keyboardType="number-pad"
              value={sharing}
              onChangeText={setSharing}
              style={styles.input}
            />
            <TextInput
              placeholder="Beds per Room"
              keyboardType="number-pad"
              value={bedsPerRoom}
              onChangeText={setBedsPerRoom}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.generateBtn} onPress={handleSubmit}>
            <Text style={styles.generateText}>Generate Rooms</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RoomSetupPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "92%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  generateBtn: {
    backgroundColor: "#7556ff",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  generateText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cancelText: {
    textAlign: "center",
    color: "#444",
    fontSize: 15,
  },
});

