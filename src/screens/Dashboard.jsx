import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AreaChart, Grid, XAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";

import api from "../api";

import pg1 from "../assets/pg1.png";
import userImg from "../assets/user.png";

const Dashboard = ({ user }) => {
  const [pgUpdate, setPgUpdate] = useState(
    "Update here Any new Rules / Food Changes / New things ETC..."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [pgs, setPgs] = useState([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const ownerId = user?.owner_id;

  /* ---------- BOOKINGS ---------- */
  useEffect(() => {
    if (!ownerId) return;

    const fetchBookings = async () => {
      try {
        const res = await api.get(`/booking/owner/${ownerId}`);
        const bookings = res.data.bookings || [];

        setBookingsCount(bookings.length);

        const amount = bookings.reduce(
          (sum, b) => sum + (b.totalAmount || 0),
          0
        );
        setTotalAmount(amount);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookings();
  }, [ownerId]);

  /* ---------- PG LIST ---------- */
  useEffect(() => {
    const fetchPGs = async () => {
      const token = await AsyncStorage.getItem("hlopgToken");
      if (!token) return;

      try {
        const res = await api.get("/owner/pgs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPgs(res.data.data || []);
      } catch (e) {
        console.log(e);
      }
    };

    fetchPGs();
  }, []);

  const chartData = [4, 5, 6, 4, 7, 5, 8];

  return (
    <ScrollView style={styles.container}>
      {/* GREETING */}
      <Text style={styles.welcome}>
        Hi, <Text style={styles.highlight}>{user?.name || "Owner"}</Text>. Welcome
        to <Text style={styles.highlight}>HloPG</Text> Admin!
      </Text>

      {/* MY PGs */}
      <Text style={styles.sectionTitle}>My PG’s</Text>
      <FlatList
        horizontal
        data={pgs}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.pgCard}>
            <Image
              source={item.image ? { uri: item.image } : pg1}
              style={styles.pgImage}
            />
            <Text style={styles.pgName}>{item.hostel_name}</Text>
          </View>
        )}
      />

      {/* PG UPDATES */}
      <Text style={styles.sectionTitle}>PG Daily Updates</Text>
      <View style={styles.card}>
        {isEditing ? (
          <TextInput
            value={pgUpdate}
            onChangeText={setPgUpdate}
            multiline
            style={styles.textArea}
          />
        ) : (
          <Text>{pgUpdate}</Text>
        )}

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.editText}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* BOOKINGS */}
      <Text style={styles.sectionTitle}>Bookings</Text>
      <View style={styles.card}>
        <Text>
          <Text style={styles.bold}>Number of Bookings:</Text>{" "}
          {bookingsCount}
        </Text>
        <Text>
          <Text style={styles.bold}>Amount Received:</Text> ₹ {totalAmount}
        </Text>

        <AreaChart
          style={{ height: 160, marginTop: 10 }}
          data={chartData}
          svg={{ fill: "rgba(91,95,248,0.6)" }}
          curve={shape.curveNatural}
        >
          <Grid />
        </AreaChart>

        <XAxis
          style={{ marginTop: 5 }}
          data={chartData}
          formatLabel={(v, i) => `D${i + 1}`}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: "#555" }}
        />
      </View>

      {/* COMPLAINTS */}
      <Text style={styles.sectionTitle}>Complaints</Text>
      {[1, 2, 3].map((i) => (
        <View style={styles.reviewCard} key={i}>
          <Image source={userImg} style={styles.userImg} />
          <View>
            <Text style={styles.userName}>Chaitanya Thota</Text>
            <Text style={styles.reviewText}>
              Hlo PG made finding my PG easy!
            </Text>
          </View>
        </View>
      ))}

      {/* REVIEWS */}
      <Text style={styles.sectionTitle}>Reviews</Text>
      {[1, 2, 3].map((i) => (
        <View style={styles.reviewCard} key={i}>
          <Image source={userImg} style={styles.userImg} />
          <View>
            <Text style={styles.userName}>Chaitanya Thota</Text>
            <Text style={styles.reviewText}>
              Verified listings gave peace of mind.
            </Text>
            <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fb",
  },

  welcome: {
    fontSize: 18,
    marginBottom: 20,
  },

  highlight: {
    color: "#5b5ff8",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },

  pgCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
    width: 160,
  },

  pgImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },

  pgName: {
    marginTop: 6,
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
  },

  editBtn: {
    backgroundColor: "#5b5ff8",
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
  },

  editText: {
    color: "#fff",
    fontWeight: "600",
  },

  bold: {
    fontWeight: "600",
  },

  reviewCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  userImg: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 10,
  },

  userName: {
    fontWeight: "600",
  },

  reviewText: {
    fontSize: 13,
    color: "#555",
  },

  stars: {
    marginTop: 4,
    color: "#fbbf24",
  },
});

