// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../api';

// const StudentLogin = () => {
//   const navigation = useNavigation();
//   const [formData, setFormData] = useState({
//     identifier: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     const token = await AsyncStorage.getItem('hlopgToken');
//     const user = await AsyncStorage.getItem('hlopgUser');
//     const owner = await AsyncStorage.getItem('hlopgOwner');

//     if (token && user) {
//       navigation.navigate('UserPanel');
//     } else if (token && owner) {
//       navigation.navigate('AdminPanel');
//     }
//   };

//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setError('');
//   };

//   const handleSubmit = async () => {
//     if (!formData.identifier || !formData.password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await api.post('/auth/loginuser', { formData });
//       const { token, user } = res.data;
      
//       if (!token || !user) {
//         setError('Login failed');
//         return;
//       }

//       await AsyncStorage.setItem('hlopgToken', token);
//       await AsyncStorage.setItem('hlopgUser', JSON.stringify(user));
      
//       Alert.alert('Success', 'Login successful!');
//       navigation.navigate('UserPanel');
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={require('../assets/login.png')}
//             style={styles.loginImage}
//             resizeMode="cover"
//           />
//         </View>

//         <View style={styles.formContainer}>
//           <Text style={styles.title}>Student / Professional Login</Text>

//           {error ? (
//             <View style={styles.errorContainer}>
//               <Text style={styles.errorText}>{error}</Text>
//             </View>
//           ) : null}

//           <View style={styles.inputContainer}>
//             <Icon name="mail-outline" size={20} color="#4f46e5" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Email Address"
//               placeholderTextColor="#999"
//               value={formData.identifier}
//               onChangeText={(text) => handleChange('identifier', text)}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Icon name="lock-closed-outline" size={20} color="#4f46e5" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#999"
//               value={formData.password}
//               onChangeText={(text) => handleChange('password', text)}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               style={styles.eyeIcon}
//             >
//               <Icon
//                 name={showPassword ? 'eye-off-outline' : 'eye-outline'}
//                 size={20}
//                 color="#4f46e5"
//               />
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             style={styles.forgotPassword}
//             onPress={() => navigation.navigate('StudentForgetPassword')}
//           >
//             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[styles.loginButton, loading && styles.loginButtonDisabled]}
//             onPress={handleSubmit}
//             disabled={loading}
//           >
//             <Text style={styles.loginButtonText}>
//               {loading ? 'Logging in...' : 'Log In'}
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.signupContainer}>
//             <Text style={styles.signupText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('StudentSignup')}>
//               <Text style={styles.signupLink}>Create Account</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   imageContainer: {
//     height: 250,
//     width: '100%',
//   },
//   loginImage: {
//     width: '100%',
//     height: '100%',
//   },
//   formContainer: {
//     flex: 1,
//     backgroundColor: '#d4ebf7',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 30,
//     paddingVertical: 40,
//     marginTop: -30,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   errorContainer: {
//     backgroundColor: '#fee',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#fcc',
//   },
//   errorText: {
//     color: '#c00',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   inputIcon: {
//     marginHorizontal: 12,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 15,
//     color: '#333',
//   },
//   eyeIcon: {
//     paddingHorizontal: 12,
//   },
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     fontSize: 14,
//     color: '#4f46e5',
//     fontWeight: '500',
//   },
//   loginButton: {
//     backgroundColor: '#4f46e5',
//     borderRadius: 8,
//     paddingVertical: 14,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   loginButtonDisabled: {
//     opacity: 0.6,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   signupText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   signupLink: {
//     fontSize: 14,
//     color: '#4f46e5',
//     fontWeight: '600',
//   },
// });

// export default StudentLogin;

// // // screens/StudentLogin.jsx
// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   Image,
// //   ScrollView,
// //   StyleSheet,
// //   Alert,
// //   KeyboardAvoidingView,
// //   Platform,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import Icon from 'react-native-vector-icons/Ionicons';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // Note: You'll need to create or remove this api import
// // // import api from '../api';

// // const StudentLogin = () => {
// //   const navigation = useNavigation();
// //   const [formData, setFormData] = useState({
// //     identifier: '',
// //     password: '',
// //   });
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   useEffect(() => {
// //     checkAuthStatus();
// //   }, []);

// //   const checkAuthStatus = async () => {
// //     const token = await AsyncStorage.getItem('hlopgToken');
// //     const user = await AsyncStorage.getItem('hlopgUser');
// //     const owner = await AsyncStorage.getItem('hlopgOwner');

// //     if (token && user) {
// //       navigation.navigate('UserPanel');
// //     } else if (token && owner) {
// //       navigation.navigate('AdminPanel');
// //     }
// //   };

// //   const handleChange = (field, value) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //     setError('');
// //   };

// //   const handleSubmit = async () => {
// //     if (!formData.identifier || !formData.password) {
// //       setError('Please fill in all fields');
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       // TODO: Replace with actual API call
// //       // const res = await api.post('/auth/loginuser', { formData });
// //       // const { token, user } = res.data;
      
// //       // Simulate successful login for now
// //       await AsyncStorage.setItem('hlopgToken', 'dummy-token');
// //       await AsyncStorage.setItem('hlopgUser', JSON.stringify({ name: 'Test User' }));
      
// //       Alert.alert('Success', 'Login successful!');
// //       navigation.navigate('UserPanel');
// //     } catch (err) {
// //       console.error(err);
// //       setError('Login failed. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <KeyboardAvoidingView
// //       style={styles.container}
// //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //     >
// //       <ScrollView contentContainerStyle={styles.scrollContainer}>
// //         <View style={styles.imageContainer}>
// //           {/* Create assets folder and add login.png or use a placeholder */}
// //           <Image
// //             source={require('../assets/login.png')}
// //             style={styles.loginImage}
// //             resizeMode="cover"
// //           />
// //         </View>

// //         <View style={styles.formContainer}>
// //           <Text style={styles.title}>Student / Professional Login</Text>

// //           {error ? (
// //             <View style={styles.errorContainer}>
// //               <Text style={styles.errorText}>{error}</Text>
// //             </View>
// //           ) : null}

// //           <View style={styles.inputContainer}>
// //             <Icon name="mail-outline" size={20} color="#4f46e5" style={styles.inputIcon} />
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Email Address"
// //               placeholderTextColor="#999"
// //               value={formData.identifier}
// //               onChangeText={(text) => handleChange('identifier', text)}
// //               keyboardType="email-address"
// //               autoCapitalize="none"
// //             />
// //           </View>

// //           <View style={styles.inputContainer}>
// //             <Icon name="lock-closed-outline" size={20} color="#4f46e5" style={styles.inputIcon} />
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Password"
// //               placeholderTextColor="#999"
// //               value={formData.password}
// //               onChangeText={(text) => handleChange('password', text)}
// //               secureTextEntry={!showPassword}
// //             />
// //             <TouchableOpacity
// //               onPress={() => setShowPassword(!showPassword)}
// //               style={styles.eyeIcon}
// //             >
// //               <Icon
// //                 name={showPassword ? 'eye-off-outline' : 'eye-outline'}
// //                 size={20}
// //                 color="#4f46e5"
// //               />
// //             </TouchableOpacity>
// //           </View>

// //           <TouchableOpacity
// //             style={styles.forgotPassword}
// //             onPress={() => navigation.navigate('StudentForgetPassword')}
// //           >
// //             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity
// //             style={[styles.loginButton, loading && styles.loginButtonDisabled]}
// //             onPress={handleSubmit}
// //             disabled={loading}
// //           >
// //             <Text style={styles.loginButtonText}>
// //               {loading ? 'Logging in...' : 'Log In'}
// //             </Text>
// //           </TouchableOpacity>

// //           <View style={styles.signupContainer}>
// //             <Text style={styles.signupText}>Don't have an account? </Text>
// //             <TouchableOpacity onPress={() => navigation.navigate('StudentSignup')}>
// //               <Text style={styles.signupLink}>Create Account</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </KeyboardAvoidingView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   scrollContainer: {
// //     flexGrow: 1,
// //   },
// //   imageContainer: {
// //     height: 250,
// //     width: '100%',
// //   },
// //   loginImage: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   formContainer: {
// //     flex: 1,
// //     backgroundColor: '#d4ebf7',
// //     borderTopLeftRadius: 30,
// //     borderTopRightRadius: 30,
// //     paddingHorizontal: 30,
// //     paddingVertical: 40,
// //     marginTop: -30,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: '600',
// //     color: '#333',
// //     marginBottom: 30,
// //     textAlign: 'center',
// //   },
// //   errorContainer: {
// //     backgroundColor: '#fee',
// //     padding: 12,
// //     borderRadius: 8,
// //     marginBottom: 20,
// //     borderWidth: 1,
// //     borderColor: '#fcc',
// //   },
// //   errorText: {
// //     color: '#c00',
// //     textAlign: 'center',
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //     borderRadius: 8,
// //     marginBottom: 15,
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //   },
// //   inputIcon: {
// //     marginHorizontal: 12,
// //   },
// //   input: {
// //     flex: 1,
// //     paddingVertical: 12,
// //     fontSize: 15,
// //     color: '#333',
// //   },
// //   eyeIcon: {
// //     paddingHorizontal: 12,
// //   },
// //   forgotPassword: {
// //     alignSelf: 'flex-end',
// //     marginBottom: 20,
// //   },
// //   forgotPasswordText: {
// //     fontSize: 14,
// //     color: '#4f46e5',
// //     fontWeight: '500',
// //   },
// //   loginButton: {
// //     backgroundColor: '#4f46e5',
// //     borderRadius: 8,
// //     paddingVertical: 14,
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   loginButtonDisabled: {
// //     opacity: 0.6,
// //   },
// //   loginButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: '600',
// //   },
// //   signupContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   signupText: {
// //     fontSize: 14,
// //     color: '#555',
// //   },
// //   signupLink: {
// //     fontSize: 14,
// //     color: '#4f46e5',
// //     fontWeight: '600',
// //   },
// // });

// // export default StudentLogin;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import api from "../api"; // uncomment when backend ready

const { width } = Dimensions.get("window");

const StudentLogin = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.identifier || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      // const res = await api.post("/auth/loginuser", { formData });
      // const { token, user } = res.data;

      // AsyncStorage.setItem("hlopgToken", token);
      // AsyncStorage.setItem("hlopgUser", JSON.stringify(user));

      Alert.alert("Success", "Login successful");
      navigation.navigate("Home");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* LOGO */}
        <Image
          source={require("../assets/logo.png")}
          style={styles.image}
        />

        {/* LOGIN CARD */}
        <View style={styles.card}>
          <Text style={styles.title}>StudentLogin</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={formData.identifier}
            onChangeText={(v) => handleChange("identifier", v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={formData.password}
            onChangeText={(v) => handleChange("password", v)}
          />

          <TouchableOpacity
            style={styles.forgot}
            onPress={() => navigation.navigate("StudentForgetPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("StudentSignup")}
          >
            <Text style={styles.signupText}>
              Don’t have an account?{" "}
              <Text style={styles.signupLink}>Create Account</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentLogin;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eef7fb",
  },

  scroll: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  image: {
    width: width * 0.65,
    height: 260,
    resizeMode: "contain",
    borderRadius: 20,
    marginBottom: 30,
  },

  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#d4ebf7",
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 25,
  },

  error: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  forgot: {
    alignItems: "flex-end",
    marginBottom: 15,
  },

  forgotText: {
    fontSize: 14,
    color: "#4f46e5",
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },

  signupLink: {
    color: "#4f46e5",
    fontWeight: "600",
  },
});

