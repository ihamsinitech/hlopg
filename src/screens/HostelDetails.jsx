import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const { width } = Dimensions.get("window");

const fallbackImages = [
  require("../assets/pg1.jpg"),
  require("../assets/pg2.jpg"),
  require("../assets/pg3.jpg"),
  require("../assets/pg4.jpg"),
];

const HostelDetails = ({ route, navigation }) => {
  const { hostel } = route.params;

  const [imageIndex, setImageIndex] = useState(0);

  const images = hostel.images?.length
    ? hostel.images
    : fallbackImages;

  const nextImage = () =>
    setImageIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );

  return (
    <ScrollView style={styles.container}>
      {/* ===== IMAGE CAROUSEL ===== */}
      <View style={styles.imageWrapper}>
        <Image source={images[imageIndex]} style={styles.mainImage} />

        <TouchableOpacity style={styles.leftArrow} onPress={prevImage}>
          <Ionicons name="chevron-back" size={26} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.rightArrow} onPress={nextImage}>
          <Ionicons name="chevron-forward" size={26} />
        </TouchableOpacity>
      </View>

      {/* ===== THUMBNAILS ===== */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((img, i) => (
          <TouchableOpacity key={i} onPress={() => setImageIndex(i)}>
            <Image
              source={img}
              style={[
                styles.thumb,
                imageIndex === i && styles.activeThumb,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ===== DETAILS ===== */}
      <View style={styles.details}>
        <Text style={styles.name}>{hostel.name}</Text>
        <Text style={styles.address}>{hostel.address}</Text>

        {/* PRICE */}
        <View style={styles.priceRow}>
          {Object.entries(hostel.sharing).map(([type, price]) => (
            <View key={type} style={styles.priceBox}>
              <Text>{type} 👤 ₹{price}</Text>
            </View>
          ))}
        </View>

        {/* AMENITIES */}
        <Text style={styles.section}>Amenities</Text>
        <View style={styles.rowWrap}>
          <Amenity icon="wifi" label="WiFi" />
          <Amenity icon="tv" label="TV" />
          <Amenity icon="bed" label="Bed" />
          <Amenity icon="shower" label="Water" />
          <Amenity icon="car" label="Parking" />
        </View>

        {/* RULES */}
        <Text style={styles.section}>PG Rules</Text>
        <View style={styles.rowWrap}>
          <Rule label="No Smoking" icon="smoking-ban" />
          <Rule label="No Alcohol" icon="wine-bottle" />
          <Rule label="Keep Clean" icon="broom" />
        </View>

        {/* REVIEWS */}
        <Text style={styles.section}>Reviews</Text>
        {hostel.reviews?.length ? (
          hostel.reviews.map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <Text>⭐ {r.rating}</Text>
              <Text>{r.review_text}</Text>
            </View>
          ))
        ) : (
          <Text>No reviews yet</Text>
        )}
      </View>

      {/* ===== BOOK NOW ===== */}
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => navigation.navigate("Booking", { hostel })}
      >
        <Text style={styles.bookText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HostelDetails;

/* ===== SMALL COMPONENTS ===== */

const Amenity = ({ icon, label }) => (
  <View style={styles.amenity}>
    <Ionicons name={icon} size={18} />
    <Text>{label}</Text>
  </View>
);

const Rule = ({ icon, label }) => (
  <View style={styles.rule}>
    <FontAwesome5 name={icon} size={14} />
    <Text>{label}</Text>
  </View>
);

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  imageWrapper: {
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: 260,
  },
  leftArrow: {
    position: "absolute",
    left: 10,
    top: "45%",
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
  },
  rightArrow: {
    position: "absolute",
    right: 10,
    top: "45%",
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
  },

  thumb: {
    width: 80,
    height: 60,
    margin: 8,
    borderRadius: 8,
  },
  activeThumb: {
    borderWidth: 2,
    borderColor: "#7556ff",
  },

  details: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  address: {
    color: "#555",
    marginBottom: 12,
  },

  priceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  priceBox: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },

  section: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
  },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  amenity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 8,
    borderRadius: 10,
    margin: 6,
    gap: 6,
  },

  rule: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 8,
    borderRadius: 10,
    margin: 6,
    gap: 6,
  },

  reviewCard: {
    backgroundColor: "#f3f3f3",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },

  bookBtn: {
    margin: 20,
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
