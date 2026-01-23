import React, { useState, useEffect } from "react";
import { 
  View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, ActivityIndicator 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FaPlus, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa"; // use react-native-vector-icons for RN
import api from "../api";

import Icon from 'react-native-vector-icons/FontAwesome'; // RN vector icons

const UserPanel = ({ onSave, onLogout }) => {
  const navigation = useNavigation();

  const [activeSection, setActiveSection] = useState("basic-info");
  const [user, setUser] = useState({});
  const [draftUser, setDraftUser] = useState({});
  const [message, setMessage] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passwordRules, setPasswordRules] = useState({ length: false, letter: false, number: false, symbol: false });
  const [confirmValid, setConfirmValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");

  const [bookedPGs, setBookedPGs] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Verify token & fetch user
  useEffect(() => {
    const verifyAndFetchUser = async () => {
      const token = localStorage.getItem("hlopgToken");
      if (!token) {
        navigation.navigate("RoleSelection");
        return;
      }
      try {
        const res = await api.get("/auth/user", { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 200) {
          const userRes = await api.get("/auth/userid", { headers: { Authorization: `Bearer ${token}` } });
          if (userRes.status === 200) {
            setUser(userRes.data);
            setDraftUser(userRes.data);
          }
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("hlopgToken");
        navigation.navigate("RoleSelection");
      }
    };
    verifyAndFetchUser();
  }, [navigation]);

  // Fetch booked PGs
  useEffect(() => {
    const fetchBookedPGs = async () => {
      const token = localStorage.getItem("hlopgToken");
      if (!token) return;
      setLoadingBookings(true);
      try {
        const res = await api.get("/booking/user-bookings", { headers: { Authorization: `Bearer ${token}` } });
        if (res.status === 200) setBookedPGs(res.data.bookings || []);
      } catch (err) { console.error(err); }
      setLoadingBookings(false);
    };
    fetchBookedPGs();
  }, []);

  const handleInputChange = (field, value) => setDraftUser({ ...draftUser, [field]: value });

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "new") {
        setPasswordRules({
          length: value.length >= 6,
          letter: /[a-zA-Z]/.test(value),
          number: /\d/.test(value),
          symbol: /[^a-zA-Z0-9]/.test(value),
        });
        setConfirmValid(updated.confirm === "" || value === updated.confirm);
      }
      if (field === "confirm") setConfirmValid(value === updated.new);
      return updated;
    });
  };

  const canUpdatePassword = passwordRules.length && passwordRules.letter && passwordRules.number && passwordRules.symbol && confirmValid;

  const handleUpdatePassword = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordMsg("All fields are required");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordMsg("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("hlopgToken");
      const res = await api.put("/auth/change-password", { currentPassword: passwords.current, newPassword: passwords.new }, { headers: { Authorization: `Bearer ${token}` } });
      setPasswordMsg(res.data.message || "Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      setPasswordMsg(err.response?.data?.message || "Failed to update password");
    } finally { setLoading(false); }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("hlopgToken");
      const payload = { name: draftUser.name, gender: draftUser.gender };
      const res = await api.put("/auth/update-basic-info", payload, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) {
        setUser(res.data.user);
        setDraftUser(res.data.user);
        if (onSave) onSave(res.data.user);
        setMessage("Changes saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) { console.error(err); setMessage("Failed to save changes"); }
  };

  const renderSection = () => {
    switch(activeSection){
      case "basic-info":
        return (
          <View>
            <Text style={styles.sectionTitle}>User Information</Text>
            <View style={styles.infoSection}>
              <View style={styles.profile}>
                <Image source={{ uri: draftUser.profileImage || "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" }} style={styles.profileImage} />
              </View>
              <View style={styles.infoForm}>
                {["name","email","phone","gender","city"].map((field,index)=>(
                  <View style={styles.formGroup} key={index}>
                    <Text style={styles.label}>{field.toUpperCase()}</Text>
                    <TextInput
                      value={draftUser[field] || ""}
                      style={[styles.input, field==="email" || field==="phone" || field==="city"?styles.readonly:{}]}
                      editable={!(field==="email" || field==="phone" || field==="city")}
                      onChangeText={val=>handleInputChange(field,val)}
                    />
                  </View>
                ))}
                <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
                {message ? <Text style={styles.saveMessage}>{message}</Text> : null}
              </View>
            </View>
          </View>
        );

      case "booked-pg":
        return (
          <ScrollView>
            <Text style={styles.sectionTitle}>Booked PG's List</Text>
            {loadingBookings ? <ActivityIndicator size="large" color="#3b82f6" /> :
            bookedPGs.length ? bookedPGs.map(pg=>(
              <View key={pg.bookingId} style={styles.pgCard}>
                <Text style={styles.pgName}>🏠 {pg.hostelName}</Text>
                <Text>📍 {pg.area}, {pg.city}</Text>
                <Text>🛏 Sharing: {pg.sharing}</Text>
                <Text>📅 Joining Date: {pg.date}</Text>
                <Text>💰 Rent: ₹{pg.rentAmount}</Text>
                <Text>🔐 Deposit: ₹{pg.deposit}</Text>
                <Text>💳 Total: ₹{pg.totalAmount}</Text>
              </View>
            )):<Text>No booked PGs</Text>}
          </ScrollView>
        );

      case "change-password":
        return (
          <View>
            <Text style={styles.sectionTitle}>Change Password</Text>
            {["current","new","confirm"].map((field,index)=>(
              <View key={index} style={styles.formGroup}>
                <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)} Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput
                    style={[styles.input, field==="confirm"&&!confirmValid?styles.invalid:{}]}
                    secureTextEntry={!(field==="current"?showCurrent:field==="new"?showNew:showConfirm)}
                    value={passwords[field]}
                    onChangeText={val=>handlePasswordChange(field,val)}
                  />
                  <TouchableOpacity onPress={()=>field==="current"?setShowCurrent(!showCurrent):field==="new"?setShowNew(!showNew):setShowConfirm(!showConfirm)}>
                    <Icon name={field==="confirm"&&!confirmValid?"times":"eye"} size={18} color="#555" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.saveBtn} onPress={handleUpdatePassword} disabled={!canUpdatePassword || loading}>
              <Text style={styles.saveBtnText}>{loading?"Updating...":"Update Password"}</Text>
            </TouchableOpacity>
            {passwordMsg ? <Text style={styles.saveMessage}>{passwordMsg}</Text> : null}
          </View>
        );

      default: return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.sidebar}>
        {["basic-info","booked-pg","change-password"].map(section=>(
          <TouchableOpacity key={section} style={[styles.sidebarBtn, activeSection===section?styles.activeBtn:{}]} onPress={()=>setActiveSection(section)}>
            <Text style={styles.sidebarBtnText}>{section.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.mainContent}>{renderSection()}</ScrollView>
    </View>
  );
};

export default UserPanel;

const styles = StyleSheet.create({
  container:{ flex:1, flexDirection:"row", backgroundColor:"#f4f6f8"},
  sidebar:{ width:120, backgroundColor:"#fff", padding:10 },
  sidebarBtn:{ padding:10, marginBottom:10, borderRadius:8, backgroundColor:"#fff" },
  activeBtn:{ backgroundColor:"#3b82f6" },
  sidebarBtnText:{ color:"#111", textAlign:"center" },
  mainContent:{ flex:1, padding:20 },
  sectionTitle:{ fontSize:18,fontWeight:"600", marginBottom:15 },
  infoSection:{ flexDirection:"row", gap:20, backgroundColor:"#fafafa", padding:20, borderRadius:10 },
  profile:{ alignItems:"center" },
  profileImage:{ width:100, height:100, borderRadius:50, marginBottom:10 },
  infoForm:{ flex:1, gap:10 },
  formGroup:{ marginBottom:12 },
  label:{ fontSize:13, color:"#555", marginBottom:4 },
  input:{ borderWidth:1, borderColor:"#ddd", borderRadius:6, padding:10, fontSize:14, backgroundColor:"#fff" },
  readonly:{ backgroundColor:"#f3f4f6", color:"#6b7280" },
  saveBtn:{ marginTop:15, padding:12, backgroundColor:"#3b82f6", borderRadius:6, alignItems:"center" },
  saveBtnText:{ color:"#fff", fontWeight:"500" },
  saveMessage:{ color:"green", marginTop:6 },
  pgCard:{ backgroundColor:"#fff", padding:15, borderRadius:10, marginBottom:12, shadowColor:"#000", shadowOpacity:0.05, shadowRadius:5 },
  pgName:{ fontWeight:"600", fontSize:16 },
  passwordWrapper:{ flexDirection:"row", alignItems:"center", justifyContent:"space-between" },
  invalid:{ borderColor:"#f87171" },
});

