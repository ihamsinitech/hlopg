// // import React from 'react';
// // import { View, StyleSheet } from 'react-native';
// // import { Video } from 'expo-av';

// // const LoadingVideo = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Video
// //         source={require('../assets/videos/loadingVideo.mp4')}
// //         style={styles.video}
// //         shouldPlay
// //         isLooping
// //         resizeMode="cover"
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     ...StyleSheet.absoluteFillObject,
// //     backgroundColor: '#000',
// //     zIndex: 9999,
// //   },
// //   video: {
// //     flex: 1,
// //   },
// // });



// // export default LoadingVideo;

// import React from 'react';
// import { View, ActivityIndicator, StyleSheet } from 'react-native';

// const LoadingVideo = () => {
//   return (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="#4f46e5" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     zIndex: 999,
//   },
// });

// export default LoadingVideo;

import React from "react";
import { View, StyleSheet } from "react-native";
import Video from "react-native-video";

const LoadingVideo = () => {
  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/videos/loadingVideo.mp4")}
        style={styles.video}
        resizeMode="cover"
        muted
        repeat
        paused={false}
      />
    </View>
  );
};

export default LoadingVideo;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    zIndex: 9999,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});
