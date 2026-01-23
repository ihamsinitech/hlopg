// // import React from "react";
// // import { View, StyleSheet } from "react-native";
// // import Header from "./Header";
// // import Footer from "./Footer";

// // const Layout = ({ children }) => {
// //   return (
// //     <View style={styles.root}>
// //       <Header />

// //       {/* THIS IS THE FIX */}
// //       <View style={styles.content}>
// //         {children}
// //       </View>

// //       <Footer />
// //     </View>
// //   );
// // };

// // export default Layout;

// // const styles = StyleSheet.create({
// //   root: {
// //     flex: 1,                
// //     backgroundColor: "#f5f7fb",
// //   },
// //   content: {
// //     flex: 1,                
// //     overflow: "hidden",     
// //   },
// // });

// import React from "react";
// import { ScrollView, View, StyleSheet } from "react-native";
// import Header from "./Header";
// import Footer from "./Footer";

// const Layout = ({ children }) => {
//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.content}
//       showsVerticalScrollIndicator={false}
//     >
//       <Header />

//       {/* BODY */}
//       <View style={styles.body}>
//         {children}
//       </View>

//       <Footer />
//     </ScrollView>
//   );
// };

// export default Layout;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },

//   content: {
//     paddingBottom: 20,
//   },

//   body: {
//     paddingHorizontal: 16,
//   },
// });

import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Header onAuthPress={() => navigation.navigate("RoleSelection")} />


        <View style={styles.body}>
          {children}
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    paddingBottom: 20,
  },

  body: {
    paddingHorizontal: 16,
  },
});

