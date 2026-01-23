// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   View,
// //   Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// //   StyleSheet,
// //   Animated,
// //   Platform,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import Icon from 'react-native-vector-icons/Ionicons';
// // // import Carousel from 'react-native-snap-carousel';
// // import { BlurView } from 'expo-blur';
// // import api from '../api';

// // const { width, height } = Dimensions.get('window');

// // const Home = () => {
// //   const navigation = useNavigation();
// //   const [hostels, setHostels] = useState([]);
// //   const [currentBg, setCurrentBg] = useState(0);
// //   const [likedPgIds, setLikedPgIds] = useState([]);
// //   const [showPopup, setShowPopup] = useState(false);

// //   const cities = [
// //     { 
// //       name: "Hostel's in Hyderabad", 
// //       bg: require('../assets/hyderabad.png'),
// //       route: 'hyderabad'
// //     },
// //     { 
// //       name: "Hostel's in Chennai", 
// //       bg: require('../assets/chennai.png'),
// //       route: 'chennai'
// //     },
// //     { 
// //       name: "Hostel's in Mumbai", 
// //       bg: require('../assets/mumbai.png'),
// //       route: 'mumbai'
// //     },
// //     { 
// //       name: "Hostel's in Bangalore", 
// //       bg: require('../assets/bangalore.png'),
// //       route: 'bangalore'
// //     },
// //   ];

// //   const facilityIcons = {
// //     Beds: 'bed-outline',
// //     Food: 'fast-food-outline',
// //     Clean: 'brush-outline',
// //     Wash: 'water-outline',
// //   };

// //   useEffect(() => {
// //     fetchHostels();
// //     fetchLikedHostels();
    
// //     // Background rotation
// //     const interval = setInterval(() => {
// //       setCurrentBg((prev) => (prev + 1) % cities.length);
// //     }, 5000);
    
// //     // App download popup
// //     const popupTimer = setTimeout(() => {
// //       setShowPopup(true);
// //     }, 5000);
    
// //     return () => {
// //       clearInterval(interval);
// //       clearTimeout(popupTimer);
// //     };
// //   }, []);

// //   const fetchHostels = async () => {
// //     try {
// //       const res = await api.get('/hostel/gethostels');
// //       setHostels(res.data || []);
// //     } catch (err) {
// //       console.error('Error fetching hostels:', err);
// //     }
// //   };

// //   const fetchLikedHostels = async () => {
// //     try {
// //       const res = await api.get('/hostel/liked-hostels');
// //       setLikedPgIds(res.data.map(pg => pg.hostel_id));
// //     } catch (err) {
// //       console.error('Error fetching liked hostels:', err);
// //     }
// //   };

// //   const toggleLike = async (pg) => {
// //     try {
// //       const res = await api.post('/hostel/like-hostel', {
// //         hostel_id: pg.id,
// //       });
// //       setLikedPgIds(prev =>
// //         res.data.liked
// //           ? [...prev, pg.id]
// //           : prev.filter(id => id !== pg.id)
// //       );
// //     } catch (err) {
// //       console.error('Error toggling like:', err);
// //     }
// //   };

// //   const renderCitySection = (city, index) => {
// //     const cityHostels = hostels.filter(h => 
// //       city.name.toLowerCase().includes(h.city?.toLowerCase() || '')
// //     ).slice(0, 10); // Limit to 10 for performance

// //     if (cityHostels.length === 0) return null;

// //     return (
// //       <View key={index} style={styles.citySection}>
// //         <View style={styles.cityHeader}>
// //           <Text style={styles.cityTitle}>{city.name}</Text>
// //           <TouchableOpacity
// //             style={styles.knowMoreButton}
// //             onPress={() => navigation.navigate('CityHostels', { 
// //               cityName: city.route 
// //             })}
// //           >
// //             <Text style={styles.knowMoreText}>See More...</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <ScrollView 
// //           horizontal 
// //           showsHorizontalScrollIndicator={false}
// //           style={styles.hostelScroll}
// //         >
// //           {cityHostels.map((hostel, idx) => (
// //             <TouchableOpacity
// //               key={idx}
// //               style={styles.hostelCard}
// //               onPress={() => navigation.navigate('HostelPage', { 
// //                 hostelId: hostel.hostel_id 
// //               })}
// //             >
// //               <View style={styles.hostelImageContainer}>
// //                 <Image 
// //                   source={require('../assets/pg1.jpg')} 
// //                   style={styles.hostelImage}
// //                   resizeMode="cover"
// //                 />
// //                 <TouchableOpacity
// //                   style={styles.likeButton}
// //                   onPress={(e) => {
// //                     e.stopPropagation();
// //                     toggleLike(hostel);
// //                   }}
// //                 >
// //                   <Icon
// //                     name={likedPgIds.includes(hostel.hostel_id) ? 'heart' : 'heart-outline'}
// //                     size={24}
// //                     color={likedPgIds.includes(hostel.hostel_id) ? '#ff2b4d' : '#fff'}
// //                   />
// //                 </TouchableOpacity>
// //               </View>

// //               <View style={styles.hostelInfo}>
// //                 <View style={styles.hostelHeader}>
// //                   <Text style={styles.hostelName} numberOfLines={1}>
// //                     {hostel.hostel_name || 'Unnamed PG'}
// //                   </Text>
// //                   <View style={styles.ratingContainer}>
// //                     <Icon name="star" size={16} color="#f5b50a" />
// //                     <Text style={styles.ratingText}>{hostel.rating || 4.5}</Text>
// //                   </View>
// //                 </View>

// //                 <View style={styles.locationContainer}>
// //                   <Icon name="location-outline" size={18} color="#777" />
// //                   <Text style={styles.locationText} numberOfLines={1}>
// //                     {hostel.area || hostel.city || 'Unknown'}
// //                   </Text>
// //                 </View>

// //                 <View style={styles.facilitiesContainer}>
// //                   {['Beds', 'Food', 'Clean', 'Wash'].map((facility, i) => (
// //                     <View key={i} style={styles.facilityItem}>
// //                       <Icon 
// //                         name={facilityIcons[facility]} 
// //                         size={16} 
// //                         color="#363636" 
// //                       />
// //                       <Text style={styles.facilityText}>{facility}</Text>
// //                     </View>
// //                   ))}
// //                 </View>

// //                 <View style={styles.priceContainer}>
// //                   <Text style={styles.priceLabel}>Starts From</Text>
// //                   <View style={styles.priceRow}>
// //                     <Text style={styles.price}>
// //                       ₹{hostel.price || 5000}
// //                     </Text>
// //                     <Text style={styles.perPerson}>Per person</Text>
// //                   </View>
// //                 </View>
// //               </View>
// //             </TouchableOpacity>
// //           ))}
// //         </ScrollView>
// //       </View>
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {/* Hero Section */}
// //       <View style={styles.heroSection}>
// //         <Image 
// //           source={cities[currentBg].bg} 
// //           style={styles.heroImage}
// //           resizeMode="cover"
// //         />
// //         <BlurView intensity={50} style={StyleSheet.absoluteFill} />
// //         <View style={styles.heroOverlay}>
// //           <Text style={styles.heroTitle}>HloPG</Text>
// //           <Text style={styles.heroSubtitle}>
// //             Because finding a PG shouldn't feel like a struggle.
// //           </Text>
// //         </View>
// //       </View>

// //       {/* City Sections */}
// //       <ScrollView 
// //         style={styles.content}
// //         showsVerticalScrollIndicator={false}
// //       >
// //         {cities.map((city, index) => renderCitySection(city, index))}
// //       </ScrollView>

// //       {/* App Download Popup */}
// //       {showPopup && (
// //         <View style={styles.popupOverlay}>
// //           <BlurView intensity={50} style={StyleSheet.absoluteFill} />
// //           <View style={styles.popupCard}>
// //             <TouchableOpacity 
// //               style={styles.popupClose}
// //               onPress={() => setShowPopup(false)}
// //             >
// //               <Icon name="close" size={24} color="#333" />
// //             </TouchableOpacity>

// //             <Image 
// //               source={require('../assets/logo.png')} 
// //               style={styles.popupLogo}
// //               resizeMode="contain"
// //             />

// //             <Text style={styles.popupTitle}>
// //               Download Our <Text style={styles.brandText}>HLOPG</Text> Mobile App
// //             </Text>
// //             <Text style={styles.popupSubtitle}>
// //               Find hostels faster, easier & smarter with our app.
// //             </Text>

// //             <View style={styles.popupButtons}>
// //               <TouchableOpacity 
// //                 style={styles.storeButton}
// //                 onPress={() => Linking.openURL('https://play.google.com/')}
// //               >
// //                 <Icon name="logo-google-playstore" size={24} color="#fff" />
// //                 <Text style={styles.storeButtonText}>Google Play</Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity 
// //                 style={[styles.storeButton, styles.appleButton]}
// //                 onPress={() => Linking.openURL('https://www.apple.com/app-store/')}
// //               >
// //                 <Icon name="logo-apple" size={24} color="#fff" />
// //                 <Text style={styles.storeButtonText}>App Store</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   heroSection: {
// //     height: height * 0.4,
// //     position: 'relative',
// //   },
// //   heroImage: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   heroOverlay: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: 'rgba(0,0,0,0.5)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     paddingHorizontal: 20,
// //   },
// //   heroTitle: {
// //     fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
// //     fontSize: 68,
// //     fontWeight: '100',
// //     color: '#fff',
// //     marginBottom: 10,
// //   },
// //   heroSubtitle: {
// //     fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
// //     fontSize: 24,
// //     fontWeight: '100',
// //     color: '#fff',
// //     textAlign: 'center',
// //   },
// //   content: {
// //     flex: 1,
// //   },
// //   citySection: {
// //     padding: 20,
// //     marginBottom: 20,
// //   },
// //   cityHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 15,
// //   },
// //   cityTitle: {
// //     fontSize: 22,
// //     fontWeight: '700',
// //     color: '#7556ff',
// //   },
// //   knowMoreButton: {
// //     paddingVertical: 8,
// //     paddingHorizontal: 16,
// //   },
// //   knowMoreText: {
// //     color: '#7556ff',
// //     fontSize: 16,
// //     fontWeight: '500',
// //   },
// //   hostelScroll: {
// //     marginHorizontal: -20,
// //   },
// //   hostelCard: {
// //     width: width * 0.7,
// //     backgroundColor: '#fff',
// //     borderRadius: 20,
// //     marginRight: 15,
// //     overflow: 'hidden',
// //     elevation: 3,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 8,
// //   },
// //   hostelImageContainer: {
// //     position: 'relative',
// //     height: 180,
// //   },
// //   hostelImage: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   likeButton: {
// //     position: 'absolute',
// //     top: 12,
// //     right: 12,
// //     backgroundColor: 'rgba(0,0,0,0.3)',
// //     borderRadius: 20,
// //     padding: 6,
// //   },
// //   hostelInfo: {
// //     padding: 15,
// //   },
// //   hostelHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //   },
// //   hostelName: {
// //     fontSize: 18,
// //     fontWeight: '600',
// //     color: '#000',
// //     flex: 1,
// //     marginRight: 10,
// //   },
// //   ratingContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   ratingText: {
// //     fontSize: 14,
// //     color: '#000',
// //     marginLeft: 4,
// //   },
// //   locationContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //   },
// //   locationText: {
// //     fontSize: 14,
// //     color: '#777',
// //     marginLeft: 6,
// //     flex: 1,
// //   },
// //   facilitiesContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 12,
// //   },
// //   facilityItem: {
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   facilityText: {
// //     fontSize: 11,
// //     color: '#444',
// //     marginTop: 2,
// //   },
// //   priceContainer: {
// //     marginTop: 8,
// //   },
// //   priceLabel: {
// //     fontSize: 14,
// //     color: '#555',
// //     marginBottom: 4,
// //   },
// //   priceRow: {
// //     flexDirection: 'row',
// //     alignItems: 'baseline',
// //   },
// //   price: {
// //     fontSize: 22,
// //     fontWeight: '700',
// //     color: '#000',
// //     marginRight: 6,
// //   },
// //   perPerson: {
// //     fontSize: 13,
// //     color: '#666',
// //   },
// //   popupOverlay: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: 'rgba(0,0,0,0.55)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     zIndex: 1000,
// //   },
// //   popupCard: {
// //     width: '90%',
// //     maxWidth: 520,
// //     backgroundColor: '#fff',
// //     borderRadius: 22,
// //     padding: 26,
// //     alignItems: 'center',
// //     elevation: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 10 },
// //     shadowOpacity: 0.35,
// //     shadowRadius: 20,
// //   },
// //   popupClose: {
// //     position: 'absolute',
// //     top: 14,
// //     right: 16,
// //     padding: 8,
// //   },
// //   popupLogo: {
// //     width: 90,
// //     height: 90,
// //     marginBottom: 10,
// //   },
// //   popupTitle: {
// //     fontSize: 22,
// //     fontWeight: '800',
// //     color: '#111',
// //     textAlign: 'center',
// //     marginBottom: 8,
// //   },
// //   brandText: {
// //     color: '#7556ff',
// //   },
// //   popupSubtitle: {
// //     fontSize: 14,
// //     color: '#555',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   popupButtons: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     gap: 12,
// //     width: '100%',
// //   },
// //   storeButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#007bff',
// //     borderRadius: 10,
// //     paddingHorizontal: 20,
// //     paddingVertical: 12,
// //     gap: 8,
// //     flex: 1,
// //     justifyContent: 'center',
// //   },
// //   appleButton: {
// //     backgroundColor: '#000',
// //   },
// //   storeButtonText: {
// //     color: '#fff',
// //     fontSize: 14,
// //     fontWeight: '600',
// //   },
// // });

// // export default Home;

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';

// const { width } = Dimensions.get('window');

// const Home = () => {
//   const cities = [
//     { name: 'Hyderabad' },
//     { name: 'Chennai' },
//     { name: 'Mumbai' },
//     { name: 'Bangalore' },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>HloPG</Text>
//       <Text style={styles.subtitle}>
//         Find PGs & Hostels Easily
//       </Text>

//       {cities.map((city, index) => (
//         <View key={index} style={styles.citySection}>
//           <Text style={styles.cityTitle}>{city.name}</Text>

//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             {[1, 2, 3].map((item) => (
//               <TouchableOpacity key={item} style={styles.card}>
//                 <Image
//                   source={require('../assets/pg1.jpg')}
//                   style={styles.image}
//                 />
//                 <Text style={styles.cardTitle}>Sample PG</Text>
//                 <Text style={styles.price}>₹5000 / month</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#7556ff',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 20,
//   },
//   citySection: {
//     marginBottom: 30,
//   },
//   cityTitle: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   card: {
//     width: width * 0.65,
//     marginRight: 15,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: 140,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     padding: 8,
//   },
//   price: {
//     paddingHorizontal: 8,
//     paddingBottom: 10,
//     color: '#333',
//   },
// });

import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Layout from "../components/Layout";

import Popup from "../components/Popup";

const { width } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const cities = ["Hyderabad", "Chennai", "Mumbai", "Bangalore"];
  const [showPopup, setShowPopup] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const hostelData = {
    deposit: 3000,
    sharing: {
      Single: 9000,
      Double: 6500,
      Triple: 5000,
    },
  };


  return (
    <Layout>
      <Text style={styles.title}>HloPG</Text>
      <Text style={styles.subtitle}>Find PGs & Hostels Easily</Text>

      {cities.map((city, i) => (
        <View key={i} style={styles.citySection}>
          <Text style={styles.cityTitle}>{city}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.card}
                onPress={() => {
                  setSelectedHostel(hostelData);
                  setShowPopup(true);
                }}
              >
                <Image
                  source={require("../assets/pg1.jpg")}
                  style={styles.image}
                />
                <Text style={styles.cardTitle}>Sample PG</Text>
                <Text style={styles.price}>₹5000 / month</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}

      {/* ✅ POPUP */}
      {selectedHostel && (
        <Popup
          visible={showPopup}
          hostel={selectedHostel}
          onClose={() => setShowPopup(false)}
          onContinue={(data) => {
            console.log("Booking Data:", data);
            setShowPopup(false);
            // navigation.navigate("Payment", { booking: data });
          }}
        />
      )}
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#7556ff",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 25,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 30,
  },
  loginBtn: {
    flex: 1,
    backgroundColor: "#7556ff",
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
  },
  signupBtn: {
    flex: 1,
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  citySection: {
    marginBottom: 30,
  },
  cityTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  card: {
    width: width * 0.65,
    marginRight: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: 140,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    padding: 8,
  },
  price: {
    padding: 8,
  },
});
