// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   Modal,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const cities = ["Hyderabad", "Chennai", "Bangalore", "Mumbai"];

// const Header = () => {
//   const navigation = useNavigation();
//   const [search, setSearch] = useState("");
//   const [filtered, setFiltered] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleSearch = (text) => {
//     setSearch(text);
//     setFiltered(
//       cities.filter((c) =>
//         c.toLowerCase().startsWith(text.toLowerCase())
//       )
//     );
//   };

//   return (
//     <View>
//       {/* TOP BAR */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.navigate("Home")}>
//           <Image
//             source={require("../assets/logo.png")}
//             style={styles.logo}
//           />
//         </TouchableOpacity>

//         <View style={styles.searchBox}>
//           <Ionicons name="search" size={18} color="#555" />
//           <TextInput
//             placeholder="Search city"
//             value={search}
//             onChangeText={handleSearch}
//             style={styles.searchInput}
//           />
//         </View>

//         <TouchableOpacity onPress={() => setMenuOpen(true)}>
//           <Ionicons name="menu" size={28} />
//         </TouchableOpacity>
//       </View>

//       {/* SEARCH SUGGESTIONS */}
//       {filtered.length > 0 && (
//         <View style={styles.suggestions}>
//           <FlatList
//             data={filtered}
//             keyExtractor={(item) => item}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.suggestionItem}
//                 onPress={() => {
//                   setSearch("");
//                   setFiltered([]);
//                 }}
//               >
//                 <Text>{item}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}

//       {/* DRAWER */}
//       <Modal visible={menuOpen} animationType="slide">
//         <View style={styles.drawer}>
//           <TouchableOpacity
//             style={{ alignSelf: "flex-end" }}
//             onPress={() => setMenuOpen(false)}
//           >
//             <Ionicons name="close" size={28} />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.drawerItem}>
//             <Text style={styles.drawerText}>Home</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.drawerItem}>
//             <Text style={styles.drawerText}>About</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.drawerItem}>
//             <Text style={styles.drawerText}>Contact</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     elevation: 6,
//   },
//   logo: {
//     width: 40,
//     height: 40,
//   },
//   searchBox: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f1f1f1",
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     marginHorizontal: 10,
//     height: 40,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 6,
//   },
//   suggestions: {
//     backgroundColor: "#fff",
//     marginHorizontal: 16,
//     borderRadius: 10,
//     elevation: 5,
//   },
//   suggestionItem: {
//     padding: 12,
//     borderBottomWidth: 0.5,
//     borderColor: "#ddd",
//   },
//   drawer: {
//     flex: 1,
//     padding: 30,
//   },
//   drawerItem: {
//     paddingVertical: 16,
//   },
//   drawerText: {
//     fontSize: 18,
//   },
// });

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";


const Header = ({ onAuthPress }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />

      <TouchableOpacity style={styles.authBtn} onPress={onAuthPress}>
        <Text style={styles.authText}>Login / Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },

  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  authBtn: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  authText: {
    color: "#fff",
    fontWeight: "600",
  },
});

