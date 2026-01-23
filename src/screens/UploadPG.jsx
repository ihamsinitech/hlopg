import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import api from "../api";
import RoomSetupPopup from "../components/RoomSetupPopup";


const UploadPG = ({ user }) => {
  const [pgImages, setPgImages] = useState([]);
  const [pgImageFiles, setPgImageFiles] = useState([]);
  const [selectedPgType, setSelectedPgType] = useState("");
  const [pgName, setPgName] = useState("");
  const [pgInfo, setPgInfo] = useState("");
  const [owner, setOwner] = useState(null);
  const ownerId = user?.owner_id;

  const [pgLocation, setPgLocation] = useState({
    address: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [sharingOptions, setSharingOptions] = useState([{ type: "", price: "" }]);
  const [selectedFurnish, setSelectedFurnish] = useState([]);
  const [rules, setRules] = useState([
    { name: "No Alcohol", icon: "wine-glass" },
    { name: "No Smoking", icon: "ban" },
    { name: "No Pets", icon: "paw" },
    { name: "Keep Clean", icon: "broom" },
  ]);
  const [selectedRules, setSelectedRules] = useState([]);

  const [foodMenu, setFoodMenu] = useState({
    monday: { breakfast: "", lunch: "", dinner: "" },
    tuesday: { breakfast: "", lunch: "", dinner: "" },
    wednesday: { breakfast: "", lunch: "", dinner: "" },
    thursday: { breakfast: "", lunch: "", dinner: "" },
    friday: { breakfast: "", lunch: "", dinner: "" },
    saturday: { breakfast: "", lunch: "", dinner: "" },
    sunday: { breakfast: "", lunch: "", dinner: "" },
  });
  const days = Object.keys(foodMenu);

  const [loading, setLoading] = useState(false);
  const [showRoomSetup, setShowRoomSetup] = useState(false);
  const [createdPgId, setCreatedPgId] = useState(null);

  const locationData = {
    Telangana: { Hyderabad: ["Ameerpet","Dilshuknagar","Gachibowli"], Warangal: ["Hanamkonda","Kazipet"] },
    Karnataka: { Bangalore: ["Bannerghatta","Basavanagudi"], Mysore: ["Gokulam","Vijayanagar"] },
    AndhraPradesh: { Vijayawada: ["Benz Circle","Gunadala"], Vizag: ["Gajuwaka","MVP Colony"] },
    Maharashtra: { Mumbai: ["Airoli","Andheri"], Pune: ["Aundh","Baner"] },
    TamilNadu: { Chennai: ["Ambattur","Anna Nagar"] },
  };

  const amenityKeys = { "Free WiFi":"wifi", Fan:"fan", Bed:"bed", Lights:"lights", Cupboard:"cupboard", Geyser:"geyser", Water:"water", Gym:"gym", TV:"tv", Food:"food", Parking:"parking", AC:"ac" };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const token = await localStorage.getItem("hlopgToken");
        if (!token) return;
        const res = await api.get("/auth/ownerid", { headers: { Authorization: `Bearer ${token}` } });
        setOwner(res.data.owner_id);
      } catch (err) { console.error(err); }
    };
    fetchOwner();
  }, []);

  const handleImageUpload = (files) => {
    const imageUrls = files.map(file => file.uri);
    setPgImages(prev => [...prev, ...imageUrls]);
    setPgImageFiles(prev => [...prev, ...files]);
  };

  const toggleFurnish = name =>
    setSelectedFurnish(prev => prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]);
  const toggleRule = name =>
    setSelectedRules(prev => prev.includes(name) ? prev.filter(r => r !== name) : [...prev, name]);

  const handleFoodChange = (day, meal, value) =>
    setFoodMenu(prev => ({ ...prev, [day]: { ...prev[day], [meal]: value } }));
  const handleLocationChange = (field, value) =>
    setPgLocation(prev => ({ ...prev, [field]: value }));

  const buildSharingObject = () => {
    const obj = {};
    sharingOptions.forEach(opt => { if(opt.type && opt.price) obj[opt.type] = Number(opt.price); });
    return obj;
  };

  const saveGeneratedRooms = async (floorsData) => {
    try {
      const token = await localStorage.getItem("hlopgToken");
      await api.post("/rooms/bulkCreate", { hostel_id: createdPgId, floors: floorsData }, { headers: { Authorization: `Bearer ${token}` } });
      Alert.alert("Rooms saved successfully!");
    } catch (err) { Alert.alert("Room saving error"); }
  };

  const handleSubmit = async () => {
    if (!pgName || !pgInfo || !selectedPgType) { Alert.alert("Fill all required fields."); return; }
    setLoading(true);
    try {
      const token = await localStorage.getItem("hlopgToken");
      const formData = new FormData();
      formData.append("pgName", pgName);
      formData.append("pgInfo", pgInfo);
      formData.append("pgType", selectedPgType);
      formData.append("address", pgLocation.address);
      formData.append("area", pgLocation.area);
      formData.append("city", pgLocation.city);
      formData.append("state", pgLocation.state);
      formData.append("pincode", pgLocation.pincode);
      formData.append("sharing", JSON.stringify(buildSharingObject()));
      formData.append("rules", JSON.stringify(selectedRules));
      const amenityObj = {};
      selectedFurnish.forEach(item => { const key = amenityKeys[item]; if(key) amenityObj[key]=true; });
      formData.append("furnish", JSON.stringify(amenityObj));
      formData.append("foodMenu", JSON.stringify(foodMenu));
      pgImageFiles.forEach(file => formData.append("images", file));

      const res = await api.post("/hostel/addhostel", formData, { headers:{ Authorization:`Bearer ${token}`, "Content-Type":"multipart/form-data" } });

      Alert.alert("PG Uploaded Successfully!");
      const newPgId = res.data?.hostel?.hostel_id;
      setCreatedPgId(newPgId);
      setShowRoomSetup(true);

      // reset
      setPgName(""); setPgInfo(""); setSelectedPgType(""); setSelectedRules([]); setSelectedFurnish([]); setPgImages([]); setPgImageFiles([]); setPgLocation({ address: "", area: "", city: "", state: "", pincode: "" }); setSharingOptions([{ type: "", price: "" }]);
    } catch(err) { Alert.alert("Failed to upload PG"); }
    finally { setLoading(false); }
  };

  const addSharingRow = () => setSharingOptions(prev => [...prev, { type: "", price: "" }]);
  const removeSharingRow = index => setSharingOptions(prev => prev.filter((_,i)=>i!==index));

  const furnishList = [
    { name:"Free WiFi", icon:"wifi" }, { name:"Fan", icon:"fan" }, { name:"Bed", icon:"bed" },
    { name:"Lights", icon:"lightbulb-o" }, { name:"Cupboard", icon:"columns" }, { name:"Geyser", icon:"tint" },
    { name:"Water", icon:"tint" }, { name:"Gym", icon:"dumbbell" }, { name:"TV", icon:"tv" },
    { name:"Food", icon:"cutlery" }, { name:"Parking", icon:"car" }, { name:"AC", icon:"snowflake-o" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Upload PG</Text>

      <View style={styles.form}>
        <Text>PG Name</Text>
        <TextInput placeholder="Enter PG Name" value={pgName} onChangeText={setPgName} style={styles.input} />
        <Text>PG Info</Text>
        <TextInput placeholder="Enter PG Info" value={pgInfo} onChangeText={setPgInfo} style={styles.input} />

        <Text>PG Type</Text>
        <View style={styles.pgTypeContainer}>
          {["Men","Women","Co-Living"].map(type=>(
            <TouchableOpacity key={type} style={[styles.pgTypeBtn, selectedPgType===type && styles.pgTypeSelected]} onPress={()=>setSelectedPgType(type)}>
              <Text style={[styles.pgTypeText, selectedPgType===type && styles.pgTypeTextSelected]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text>PG Location</Text>
        <Picker selectedValue={pgLocation.state} onValueChange={val=>handleLocationChange("state", val)}>
          <Picker.Item label="Select State" value=""/>
          {Object.keys(locationData).map(state=><Picker.Item key={state} label={state} value={state}/>)}
        </Picker>
        <Picker selectedValue={pgLocation.city} enabled={!!pgLocation.state} onValueChange={val=>handleLocationChange("city",val)}>
          <Picker.Item label="Select City" value=""/>
          {pgLocation.state && Object.keys(locationData[pgLocation.state]).map(city=><Picker.Item key={city} label={city} value={city}/>)}
        </Picker>
        <Picker selectedValue={pgLocation.area} enabled={!!pgLocation.city} onValueChange={val=>handleLocationChange("area",val)}>
          <Picker.Item label="Select Area" value=""/>
          {pgLocation.city && locationData[pgLocation.state][pgLocation.city].map(area=><Picker.Item key={area} label={area} value={area}/>)}
        </Picker>
        <TextInput placeholder="Address" value={pgLocation.address} onChangeText={val=>handleLocationChange("address",val)} style={styles.input} />
        <TextInput placeholder="Pincode" value={pgLocation.pincode} onChangeText={val=>handleLocationChange("pincode",val)} style={styles.input} />

        {/* Furnish Section */}
        <Text>Furnish Amenities</Text>
        <View style={styles.grid}>
          {furnishList.map(item=>(
            <TouchableOpacity key={item.name} style={[styles.gridItem, selectedFurnish.includes(item.name)&&styles.gridItemSelected]} onPress={()=>toggleFurnish(item.name)}>
              <FontAwesome name={item.icon} size={24} color={selectedFurnish.includes(item.name)?"#fff":"#555"}/>
              <Text style={[styles.gridText, selectedFurnish.includes(item.name)&&styles.gridTextSelected]}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rules Section */}
        <Text>Rules</Text>
        <View style={styles.grid}>
          {rules.map(rule=>(
            <TouchableOpacity key={rule.name} style={[styles.gridItem, selectedRules.includes(rule.name)&&styles.gridItemSelected]} onPress={()=>toggleRule(rule.name)}>
              <FontAwesome name={rule.icon} size={24} color={selectedRules.includes(rule.name)?"#fff":"#555"}/>
              <Text style={[styles.gridText, selectedRules.includes(rule.name)&&styles.gridTextSelected]}>{rule.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={[styles.gridItem, styles.addRule]} onPress={()=>{
            const newRule = prompt("Enter rule");
            if(newRule) setRules(prev=>[...prev,{name:newRule,icon:"plus"}]);
          }}>
            <FontAwesome name="plus" size={24} color="#5b5ff8"/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.submitText}>Upload PG</Text>}
        </TouchableOpacity>
      </View>

      {showRoomSetup && <RoomSetupPopup onClose={()=>setShowRoomSetup(false)} onGenerate={saveGeneratedRooms}/>}
    </ScrollView>
  );
};

export default UploadPG;



export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9ff",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  form: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  pgTypeContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  pgTypeBtn: {
    marginRight: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  pgTypeSelected: {
    backgroundColor: "#5b5ff8",
  },
  pgTypeText: {
    color: "#000",
  },
  pgTypeTextSelected: {
    color: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  gridItem: {
    width: 80,
    height: 80,
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  gridItemSelected: {
    backgroundColor: "#5b5ff8",
  },
  gridText: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
    color: "#555",
  },
  gridTextSelected: {
    color: "#fff",
  },
  addRule: {
    backgroundColor: "#e8e8e8",
  },
  submitBtn: {
    backgroundColor: "#5b5ff8",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
});
