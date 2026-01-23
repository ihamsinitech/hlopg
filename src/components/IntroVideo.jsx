// // import React, { useEffect } from 'react';
// // import { View, StyleSheet } from 'react-native';
// // import { Video } from 'expo-av';

// // const IntroVideo = ({ onFinish }) => {
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       onFinish();
// //     }, 5000);

// //     return () => clearTimeout(timer);
// //   }, [onFinish]);

// //   return (
// //     <View style={styles.container}>
// //       <Video
// //         source={require('../assets/videos/loadingVideo.mp4')}
// //         style={styles.video}
// //         shouldPlay
// //         isLooping={false}
// //         resizeMode="cover"
// //         onPlaybackStatusUpdate={(status) => {
// //           if (status.didJustFinish) {
// //             onFinish();
// //           }
// //         }}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //   },
// //   video: {
// //     flex: 1,
// //   },
// // });

// // export default IntroVideo;

// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const IntroVideo = ({ onFinish }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onFinish();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to Hostel/PG App</Text>
//       <TouchableOpacity style={styles.button} onPress={onFinish}>
//         <Text style={styles.buttonText}>Skip Intro</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#4f46e5',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: 'white',
//     paddingHorizontal: 30,
//     paddingVertical: 15,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: '#4f46e5',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default IntroVideo;

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";

const IntroVideo = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish && onFinish();
    }, 5000); // match video duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/videos/loadingVideo.mp4")}
        style={styles.video}
        resizeMode="cover"
        muted
        repeat={false}
        paused={false}
      />
    </View>
  );
};

export default IntroVideo;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 5000,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
