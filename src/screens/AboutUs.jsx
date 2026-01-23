import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AboutUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I book a PG through HloPG?",
      a: "Browse verified listings, select a PG and connect directly with the owner.",
    },
    {
      q: "Are the listings really verified?",
      a: "Yes, every property is physically verified by our team.",
    },
    {
      q: "Do I have to pay brokerage?",
      a: "No, HloPG is completely brokerage-free.",
    },
    {
      q: "What support do you provide?",
      a: "We guide you from search to move-in.",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* ABOUT US */}
      <View style={styles.aboutSection}>
        <Image
          source={require("../assets/main.png")}
          style={styles.aboutImage}
        />

        <Text style={styles.title}>
          Find Your Perfect PG with{" "}
          <Text style={styles.highlight}>HloPG</Text>
        </Text>

        <Text style={styles.subtitle}>
          Verified PGs for students & professionals
        </Text>

        <View style={styles.iconRow}>
          <Feature icon="shield-alt" label="Verified" />
          <Feature icon="rupee-sign" label="No Fees" />
          <Feature icon="users" label="Trusted" />
          <Feature icon="headset" label="Support" />
        </View>
      </View>

      {/* WHY US */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Why <Text style={styles.highlight}>Us?</Text>
        </Text>

        <WhyCard icon="shield-alt" title="100% Verified" />
        <WhyCard icon="rupee-sign" title="Zero Brokerage" />
        <WhyCard icon="search" title="Transparent Pricing" />
        <WhyCard icon="users" title="Safe Community" />
        <WhyCard icon="filter" title="Easy Search" />
        <WhyCard icon="headset" title="24/7 Support" />
      </View>

      {/* MISSION & VISION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          About <Text style={styles.highlight}>Us</Text>
        </Text>

        <MVCard
          image={require("../assets/mission.png")}
          title="Our Mission"
          text="Build India’s most trusted accommodation platform."
        />

        <MVCard
          image={require("../assets/vision.png")}
          title="Our Vision"
          text="Empower relocations with trust & transparency."
        />
      </View>

      {/* FAQ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Frequently Asked <Text style={styles.highlight}>Questions</Text>
        </Text>

        {faqs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.faqItem,
              openIndex === index && styles.faqActive,
            ]}
            onPress={() => toggleFAQ(index)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.q}</Text>
              <Icon
                name={openIndex === index ? "chevron-up" : "chevron-down"}
                size={16}
              />
            </View>

            {openIndex === index && (
              <Text style={styles.faqAnswer}>{item.a}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

/* ================= COMPONENTS ================= */

const Feature = ({ icon, label }) => (
  <View style={styles.feature}>
    <Icon name={icon} size={20} color="#6a0dad" />
    <Text style={styles.featureText}>{label}</Text>
  </View>
);

const WhyCard = ({ icon, title }) => (
  <View style={styles.card}>
    <Icon name={icon} size={22} color="#6a0dad" />
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

const MVCard = ({ image, title, text }) => (
  <View style={styles.mvCard}>
    <Image source={image} style={styles.mvImage} />
    <Text style={styles.cardText}>{text}</Text>
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  aboutSection: {
    padding: 20,
    alignItems: "center",
  },

  aboutImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    textAlign: "center",
  },

  highlight: {
    color: "#6a0dad",
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
    textAlign: "center",
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },

  feature: {
    alignItems: "center",
    flex: 1,
  },

  featureText: {
    marginTop: 6,
    fontSize: 12,
  },

  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  cardText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 8,
    textAlign: "center",
  },

  mvCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },

  mvImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  faqItem: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },

  faqActive: {
    backgroundColor: "#e1b6ff",
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  faqQuestion: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },

  faqAnswer: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
});

export default AboutUs;
