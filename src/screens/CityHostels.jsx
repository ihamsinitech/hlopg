import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"; // for shower, CCTV, etc.


import api from "../api";

import pg1 from "../assets/pg1.jpg";
import pg2 from "../assets/pg2.jpg";
import pg3 from "../assets/pg3.jpg";
import pg4 from "../assets/pg4.jpg";

import hyderabadBg from "../assets/hyderabad.png";
import chennaiBg from "../assets/chennai.png";
import bangaloreBg from "../assets/bangalore.png";
import mumbaiBg from "../assets/mumbai.png";

const cityImages = {
  hyderabad: hyderabadBg,
  chennai: chennaiBg,
  bangalore: bangaloreBg,
  mumbai: mumbaiBg,
};

const { width } = Dimensions.get("window");

const CityHostels = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cityName } = route.params;

  const [hostels, setHostels] = useState([]);
  const [filters, setFilters] = useState({ area: "All", pg_type: "All" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const endpoints = {
          hyderabad: "/hostel/hydhostels",
          chennai: "/hostel/chehostels",
          bangalore: "/hostel/benhostels",
          mumbai: "/hostel/mumhostels",
        };

        const endpoint = endpoints[cityName.toLowerCase()];
        if (!endpoint) return;

        const res = await api.get(endpoint);
        const data = res.data || [];

        const mappedHostels = data.map((h, index) => {
          let amenities = {};
          try {
            amenities =
              typeof h.amenities === "string"
                ? JSON.parse(h.amenities)
                : h.amenities || {};
          } catch {
            amenities = {};
          }

          const genderText = (h.pg_type || "").toLowerCase();
          let genderLabel = "👨🏻‍💼 Men's PG";
          if (genderText.includes("women")) genderLabel = "💁🏻‍♀️ Women's PG";
          else if (genderText.includes("co")) genderLabel = "👫 Co-Living";

          const images = [pg1, pg2, pg3, pg4];

          return {
            id: h.hostel_id,
            img: images[index % images.length],
            name: h.hostel_name,
            area: h.area,
            price: h.price ? `₹${h.price}` : "₹—",
            rating: h.rating || 4.5,
            amenities,
            pg_type: genderText,
            genderLabel,
          };
        });

        setHostels(mappedHostels);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching ${cityName} hostels:`, err);
        setLoading(false);
      }
    };

    fetchHostels();
  }, [cityName]);

  const filterOptions = {
    area: ["All", ...new Set(hostels.map((pg) => pg.area))],
    pg_type: ["All", ...new Set(hostels.map((pg) => pg.pg_type))],
  };

  const filteredPGs = hostels.filter((pg) =>
    Object.entries(filters).every(([key, value]) =>
      value === "All" ? true : pg[key] === value
    )
  );

  const cityTitle =
    cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Hero */}
      <View style={styles.heroContainer}>
        <Image
          source={cityImages[cityName.toLowerCase()]}
          style={styles.heroImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.heroTitle}>Hostels in {cityTitle}</Text>
          <Text style={styles.heroSubtitle}>
            Explore the best PGs in {cityTitle} for a comfortable stay.
          </Text>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        {Object.keys(filterOptions).map((key) => (
          <View key={key} style={styles.filterItem}>
            <Text style={styles.filterLabel}>
              {key === "pg_type" ? "Gender:" : "Area:"}
            </Text>
            <Picker
              selectedValue={filters[key]}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setFilters((prev) => ({ ...prev, [key]: itemValue }))
              }
            >
              {filterOptions[key].map((opt) => (
                <Picker.Item key={opt} label={opt} value={opt} />
              ))}
            </Picker>
          </View>
        ))}
      </View>

      {/* Hostels */}
      {filteredPGs.length === 0 ? (
        <Text style={styles.noResults}>No PGs found in the selected city.</Text>
      ) : (
        <View style={styles.grid}>
          {filteredPGs.map((pg) => (
            <TouchableOpacity
              key={pg.id}
              style={styles.card}
              onPress={() => navigation.navigate("HostelDetails", { id: pg.id })}
            >
              <Image source={pg.img} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.pgName}>{pg.name}</Text>
                <Text style={styles.pgArea}>📍 {pg.area}</Text>
                <Text style={styles.pgGender}>{pg.genderLabel}</Text>

                <View style={styles.rating}>
                  <FaStar color="#ffb703" /> <Text>{pg.rating}</Text>
                </View>

                <View style={styles.amenities}>
                  {pg.amenities?.wifi && <FaWifi size={16} />}
                  {pg.amenities?.hot_water && <FaShower size={16} />}
                  {pg.amenities?.locker && <FaLock size={16} />}
                  {pg.amenities?.cc_camera && <BiCctv size={16} />}
                  {pg.amenities?.parking && <FaParking size={16} />}
                </View>

                <Text style={styles.price}>
                  {pg.price} <Text style={styles.priceSub}>Per person</Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default CityHostels;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  heroContainer: { height: 250, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heroTitle: { color: "#fff", fontSize: 24, fontWeight: "700", marginBottom: 5 },
  heroSubtitle: { color: "#fff", fontSize: 16, textAlign: "center" },
  filters: { flexDirection: "row", flexWrap: "wrap", padding: 10, gap: 10 },
  filterItem: { flex: 1, minWidth: width / 2 - 20 },
  filterLabel: { fontWeight: "600", marginBottom: 5 },
  picker: { height: 40, width: "100%" },
  grid: { padding: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  cardImage: { width: "100%", height: 150 },
  cardInfo: { padding: 10 },
  pgName: { fontSize: 16, fontWeight: "700" },
  pgArea: { color: "#555", marginTop: 2 },
  pgGender: { color: "#555", marginTop: 2 },
  rating: { flexDirection: "row", alignItems: "center", marginTop: 5, gap: 5 },
  amenities: { flexDirection: "row", gap: 10, marginTop: 5 },
  price: { fontWeight: "700", marginTop: 5 },
  priceSub: { fontWeight: "400", color: "#777" },
  noResults: { textAlign: "center", fontSize: 16, marginVertical: 20 },
});
