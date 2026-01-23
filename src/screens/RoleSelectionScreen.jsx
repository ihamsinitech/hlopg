// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const RoleSelectionScreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Select Your Role</Text>
      
//       <TouchableOpacity 
//         style={styles.button}
//         onPress={() => navigation.navigate('StudentLogin')}
//       >
//         <Text style={styles.buttonText}>Student</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity 
//         style={styles.button}
//         onPress={() => navigation.navigate('OwnerLogin')}
//       >
//         <Text style={styles.buttonText}>Owner</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 40,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 40,
//     paddingVertical: 15,
//     borderRadius: 10,
//     marginVertical: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default RoleSelectionScreen;

// screens/RoleSelectionScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RoleSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('StudentLogin')}
      >
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('OwnerLogin')}
      >
        <Text style={styles.buttonText}>Owner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RoleSelectionScreen;