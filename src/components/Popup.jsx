// // src/components/Popup.jsx
// import React, { useState } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from "react-native";
// import { Calendar } from "react-native-calendars";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// const Popup = ({ visible, hostel = {}, onClose, onContinue }) => {
//   const [selectedSharing, setSelectedSharing] = useState(null);
//   const [date, setDate] = useState(null);
//   const [priceType, setPriceType] = useState("monthly");
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   const images = hostel.images?.length
//     ? hostel.images
//     : [
//         require("../assets/pg1.jpg"),
//         require("../assets/pg2.jpg"),
//       ];

//   const deposit = Number(hostel.deposit || 0);

//   const rent = selectedSharing?.price || 0;
//   const total = rent + deposit;

//   const isPayEnabled = selectedSharing && date && acceptedTerms;

//   return (
//     <Modal visible={visible} transparent animationType="fade">
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           {/* CLOSE */}
//           <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
//             <Text style={styles.closeText}>×</Text>
//           </TouchableOpacity>

//           <ScrollView showsVerticalScrollIndicator={false}>
//             <Text style={styles.title}>Book Your PG</Text>

//             {/* IMAGES */}
//             <ScrollView horizontal pagingEnabled>
//               {images.map((img, idx) => (
//                 <Image key={idx} source={img} style={styles.image} />
//               ))}
//             </ScrollView>

//             {/* PRICE TYPE */}
//             <View style={styles.toggleRow}>
//               {["daily", "monthly"].map((t) => (
//                 <TouchableOpacity
//                   key={t}
//                   style={[
//                     styles.toggleBtn,
//                     priceType === t && styles.activeToggle,
//                   ]}
//                   onPress={() => setPriceType(t)}
//                 >
//                   <Text
//                     style={[
//                       styles.toggleText,
//                       priceType === t && styles.activeToggleText,
//                     ]}
//                   >
//                     {t === "daily" ? "Day Wise" : "Monthly Wise"}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* SHARING */}
//             <Text style={styles.sectionTitle}>Sharing</Text>
//             <View style={styles.row}>
//               {Object.entries(hostel.sharing || {}).map(([type, price]) => (
//                 <TouchableOpacity
//                   key={type}
//                   style={[
//                     styles.priceBtn,
//                     selectedSharing?.type === type && styles.activePrice,
//                   ]}
//                   onPress={() =>
//                     setSelectedSharing({ type, price })
//                   }
//                 >
//                   <Text
//                     style={
//                       selectedSharing?.type === type
//                         ? styles.activePriceText
//                         : styles.priceText
//                     }
//                   >
//                     {type} ₹{price}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* CALENDAR */}
//             <Text style={styles.sectionTitle}>Move-in Date</Text>
//             <Calendar
//               onDayPress={(day) => setDate(day.dateString)}
//               markedDates={
//                 date
//                   ? { [date]: { selected: true, selectedColor: "#6b4eff" } }
//                   : {}
//               }
//             />

//             {/* SUMMARY */}
//             <View style={styles.summary}>
//               <Row label="Rent" value={`₹${rent}`} />
//               <Row label="Deposit" value={`₹${deposit}`} />
//               <Row label="Total" value={`₹${total}`} bold />
//             </View>

//             {/* TERMS */}
//             <TouchableOpacity
//               style={styles.termsRow}
//               onPress={() => setAcceptedTerms(!acceptedTerms)}
//             >
//               <Icon
//                 name={
//                   acceptedTerms
//                     ? "checkbox-marked"
//                     : "checkbox-blank-outline"
//                 }
//                 size={22}
//                 color="#6b4eff"
//               />
//               <Text style={styles.termsText}>
//                 I agree to Terms & Conditions
//               </Text>
//             </TouchableOpacity>

//             {/* PAY */}
//             <TouchableOpacity
//               style={[
//                 styles.payBtn,
//                 !isPayEnabled && styles.disabled,
//               ]}
//               disabled={!isPayEnabled}
//               onPress={() =>
//                 onContinue({
//                   sharing: selectedSharing?.type,
//                   priceType,
//                   date,
//                   rent,
//                   deposit,
//                   total,
//                 })
//               }
//             >
//               <Text style={styles.payText}>Proceed to Pay →</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const Row = ({ label, value, bold }) => (
//   <View style={styles.rowBetween}>
//     <Text style={bold && styles.bold}>{label}</Text>
//     <Text style={bold && styles.bold}>{value}</Text>
//   </View>
// );

// export default Popup;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     padding: 16,
//   },
//   container: {
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 16,
//     maxHeight: "92%",
//   },
//   closeBtn: {
//     position: "absolute",
//     right: 10,
//     top: 8,
//     zIndex: 10,
//   },
//   closeText: {
//     fontSize: 26,
//     color: "#444",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 12,
//   },
//   image: {
//     width: 280,
//     height: 180,
//     borderRadius: 12,
//     marginRight: 10,
//   },
//   toggleRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 12,
//   },
//   toggleBtn: {
//     padding: 10,
//     borderRadius: 20,
//     marginHorizontal: 5,
//     backgroundColor: "#eee",
//   },
//   activeToggle: {
//     backgroundColor: "#6b4eff",
//   },
//   toggleText: {
//     fontWeight: "600",
//   },
//   activeToggleText: {
//     color: "#fff",
//   },
//   sectionTitle: {
//     fontWeight: "700",
//     marginTop: 16,
//     marginBottom: 6,
//   },
//   row: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   priceBtn: {
//     padding: 10,
//     borderRadius: 20,
//     backgroundColor: "#f2f2f2",
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   activePrice: {
//     backgroundColor: "#6b4eff",
//   },
//   priceText: {
//     fontWeight: "600",
//   },
//   activePriceText: {
//     color: "#fff",
//     fontWeight: "700",
//   },
//   summary: {
//     backgroundColor: "#f4f4ff",
//     padding: 12,
//     borderRadius: 10,
//     marginVertical: 12,
//   },
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 4,
//   },
//   bold: {
//     fontWeight: "700",
//   },
//   termsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   termsText: {
//     marginLeft: 8,
//   },
//   payBtn: {
//     backgroundColor: "#6b4eff",
//     padding: 14,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   disabled: {
//     opacity: 0.5,
//   },
//   payText: {
//     color: "#fff",
//     fontWeight: "700",
//   },
// });

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Popup = ({ visible, hostel, onClose, onContinue }) => {
  const [sharing, setSharing] = useState("Single");
  const [priceType, setPriceType] = useState("monthly");

  const rent = hostel.sharing[sharing];
  const total = rent + hostel.deposit;

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Choose Options</Text>

          {/* Sharing */}
          <Text style={styles.label}>Sharing</Text>
          <View style={styles.row}>
            {Object.keys(hostel.sharing).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.option,
                  sharing === type && styles.active,
                ]}
                onPress={() => setSharing(type)}
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Type */}
          <Text style={styles.label}>Price Type</Text>
          <View style={styles.row}>
            {["monthly", "daily"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.option,
                  priceType === type && styles.active,
                ]}
                onPress={() => setPriceType(type)}
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Summary */}
          <View style={styles.summary}>
            <Text>Rent: ₹{rent}</Text>
            <Text>Deposit: ₹{hostel.deposit}</Text>
            <Text style={styles.total}>Total: ₹{total}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() =>
                onContinue({
                  sharing,
                  priceType,
                  rent,
                  deposit: hostel.deposit,
                  total,
                })
              }
            >
              <Text style={{ color: "#fff" }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    marginVertical: 8,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
  },
  active: {
    backgroundColor: "#dbeafe",
    borderColor: "#4f46e5",
  },
  summary: {
    marginTop: 15,
  },
  total: {
    fontWeight: "700",
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  cancel: {
    color: "#666",
  },
  continueBtn: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
