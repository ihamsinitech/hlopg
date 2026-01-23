import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "hlopg_myrooms_v3";

export default function MyRooms({ navigation }) {
  /** Hide Header */
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const hasLoaded = useRef(false);

  const saveLayout = async (data) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const [floors, setFloors] = useState([]);
  const [setupPopup, setSetupPopup] = useState(false);

  const [setupData, setSetupData] = useState({
    floors: "",
    roomsPerFloor: "",
    sharing: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("add");

  const [popupData, setPopupData] = useState({ roomNo: "", sharing: "" });
  const [activeFloorIndex, setActiveFloorIndex] = useState(null);
  const [activeRoomIndex, setActiveRoomIndex] = useState(null);

  /** Load Saved Layout */
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setFloors(parsed);
            setSetupPopup(false);
            return;
          }
        }
        setSetupPopup(true);
      } catch (err) {
        console.log(err);
        setSetupPopup(true);
      }
    })();
  }, []);

  /** Generate Layout */
  const generateLayout = () => {
    const { floors, roomsPerFloor, sharing } = setupData;
    if (!floors || !roomsPerFloor || !sharing)
      return Alert.alert("Error", "Fill all fields");

    const newFloors = Array.from({ length: Number(floors) }, (_, f) => ({
      floor: `${f + 1} Floor`,
      rooms: Array.from({ length: Number(roomsPerFloor) }, (_, r) => ({
        roomNo: `${f + 1}${String(r + 1).padStart(2, "0")}`,
        beds: Array(Number(sharing)).fill(false),
      })),
    }));

    setFloors(newFloors);
    saveLayout(newFloors);
    setSetupPopup(false);
  };

  /** Toggle Bed */
  const toggleBed = (f, r, b) => {
    const updated = [...floors];
    updated[f].rooms[r].beds[b] = !updated[f].rooms[r].beds[b];
    setFloors(updated);
    saveLayout(updated);
  };

  /** Add Floor */
  const addFloor = () => {
    const updated = [
      ...floors,
      { floor: `${floors.length + 1} Floor`, rooms: [] },
    ];
    setFloors(updated);
    saveLayout(updated);
  };

  /** Open Popup */
  const openPopup = (mode, f, r = null) => {
    setPopupMode(mode);
    setActiveFloorIndex(f);
    setActiveRoomIndex(r);

    if (mode === "edit") {
      const room = floors[f].rooms[r];
      setPopupData({
        roomNo: room.roomNo,
        sharing: room.beds.length.toString(),
      });
    } else {
      setPopupData({ roomNo: "", sharing: "" });
    }

    setShowPopup(true);
  };

  /** Save Room */
  const saveRoom = () => {
    const { roomNo, sharing } = popupData;
    if (!roomNo || !sharing)
      return Alert.alert("Error", "Fill all fields");

    const beds = Array(Math.min(6, Math.max(1, Number(sharing)))).fill(false);
    const updated = [...floors];

    if (popupMode === "add") {
      updated[activeFloorIndex].rooms.push({ roomNo, beds });
    } else {
      updated[activeFloorIndex].rooms[activeRoomIndex] = { roomNo, beds };
    }

    setFloors(updated);
    saveLayout(updated);
    setShowPopup(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Rooms</Text>
        {floors.length > 0 && (
          <Pressable style={styles.addFloorBtn} onPress={addFloor}>
            <Text style={styles.btnText}>+ Add Floor</Text>
          </Pressable>
        )}
      </View>

      {/* FLOORS */}
      {floors.map((floor, fIndex) => (
        <View key={fIndex} style={styles.floorSection}>
          <View style={styles.floorHeader}>
            <Text style={styles.floorTitle}>{floor.floor}</Text>
            <Pressable
              style={styles.addRoomBtn}
              onPress={() => openPopup("add", fIndex)}
            >
              <Text style={styles.btnText}>+ Add Room</Text>
            </Pressable>
          </View>

          <View style={styles.roomsContainer}>
            {floor.rooms.map((room, rIndex) => (
              <View key={rIndex} style={styles.roomCard}>
                <View style={styles.roomHeader}>
                  <Text style={styles.roomNo}>{room.roomNo}</Text>
                  <Pressable
                    onPress={() => openPopup("edit", fIndex, rIndex)}
                  >
                    <Text style={styles.editText}>Edit</Text>
                  </Pressable>
                </View>

                <View style={styles.roomImageBox}>
                  <Image
                    source={{
                      uri: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
                    }}
                    style={styles.roomImage}
                  />

                  <View style={styles.bedsGrid}>
                    {room.beds.map((filled, bIndex) => (
                      <Pressable
                        key={bIndex}
                        onPress={() => toggleBed(fIndex, rIndex, bIndex)}
                        style={[
                          styles.bed,
                          filled ? styles.bedFilled : styles.bedEmpty,
                        ]}
                      />
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* SETUP POPUP */}
      <Modal transparent visible={setupPopup} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Setup Hostel Layout</Text>

            <TextInput
              placeholder="Floors"
              keyboardType="numeric"
              style={styles.input}
              value={setupData.floors}
              onChangeText={(v) =>
                setSetupData({ ...setupData, floors: v })
              }
            />

            <TextInput
              placeholder="Rooms per Floor"
              keyboardType="numeric"
              style={styles.input}
              value={setupData.roomsPerFloor}
              onChangeText={(v) =>
                setSetupData({ ...setupData, roomsPerFloor: v })
              }
            />

            <TextInput
              placeholder="Sharing per Room"
              keyboardType="numeric"
              style={styles.input}
              value={setupData.sharing}
              onChangeText={(v) =>
                setSetupData({ ...setupData, sharing: v })
              }
            />

            <Pressable style={styles.saveBtn} onPress={generateLayout}>
              <Text style={styles.btnText}>Generate</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ADD / EDIT ROOM */}
      <Modal transparent visible={showPopup} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>
              {popupMode === "add" ? "Add Room" : "Edit Room"}
            </Text>

            <TextInput
              placeholder="Room Number"
              style={styles.input}
              value={popupData.roomNo}
              onChangeText={(v) =>
                setPopupData({ ...popupData, roomNo: v })
              }
            />

            <TextInput
              placeholder="Sharing"
              keyboardType="numeric"
              style={styles.input}
              value={popupData.sharing}
              onChangeText={(v) =>
                setPopupData({ ...popupData, sharing: v })
              }
            />

            <View style={styles.popupBtns}>
              <Pressable onPress={() => setShowPopup(false)}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveBtn} onPress={saveRoom}>
                <Text style={styles.btnText}>
                  {popupMode === "add" ? "Add" : "Update"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6ff", padding: 16 },

  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "600" },

  addFloorBtn: {
    backgroundColor: "#6b5bff",
    padding: 10,
    borderRadius: 8,
  },

  btnText: { color: "#fff", fontWeight: "600" },

  floorSection: { marginBottom: 30 },
  floorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffeaa7",
    padding: 10,
    borderRadius: 10,
  },

  floorTitle: { fontWeight: "600" },
  addRoomBtn: {
    backgroundColor: "#00c896",
    padding: 6,
    borderRadius: 6,
  },

  roomsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
  roomCard: {
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },

  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#f2f2f2",
  },

  editText: { color: "#6b5bff" },

  roomImageBox: { height: 130 },
  roomImage: { width: "100%", height: "100%" },

  bedsGrid: {
    position: "absolute",
    inset: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  bed: { width: 24, height: 24, borderRadius: 6 },
  bedEmpty: { backgroundColor: "#00d26a" },
  bedFilled: { backgroundColor: "#ff3b30" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    width: 320,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },

  popupTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  saveBtn: {
    backgroundColor: "#6b5bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  popupBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
