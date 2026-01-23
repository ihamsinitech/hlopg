// // import React, { useState, useEffect } from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { SafeAreaProvider } from 'react-native-safe-area-context';
// // import { StatusBar } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import FlashMessage from 'react-native-flash-message';

// // import AppNavigator from './src/navigation/AppNavigator';
// // import IntroVideo from './src/components/IntroVideo';
// // import LoadingVideo from './src/components/LoadingVideo';
// // import { VideoProvider } from './src/context/VideoContext';

// // export default function App() {
// //   const [showIntro, setShowIntro] = useState(true);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     checkIntroStatus();
// //   }, []);

// //   const checkIntroStatus = async () => {
// //     try {
// //       const seen = await AsyncStorage.getItem('seenIntro');
// //       if (seen === 'true') {
// //         setShowIntro(false);
// //       }
// //     } catch (error) {
// //       console.error('Error checking intro status:', error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleIntroFinish = async () => {
// //     try {
// //       await AsyncStorage.setItem('seenIntro', 'true');
// //       setShowIntro(false);
// //     } catch (error) {
// //       console.error('Error saving intro status:', error);
// //     }
// //   };

// //   if (isLoading) {
// //     return null;
// //   }

// //   return (
// //     <SafeAreaProvider>
// //       <VideoProvider>
// //         <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
// //         {showIntro ? (
// //           <IntroVideo onFinish={handleIntroFinish} />
// //         ) : (
// //           <>
// //             <NavigationContainer>
// //               <AppNavigator />
// //             </NavigationContainer>
// //             <FlashMessage position="top" />
// //           </>
// //         )}
// //         <LoadingVideo />
// //       </VideoProvider>
// //     </SafeAreaProvider>
// //   );
// // }

import React, {useState}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import StudentLogin from './src/screens/StudentLogin';
import StudentSignup from './src/screens/StudentSignup';
import StudentForgetPassword from './src/screens/StudentForgetPassword';
import RoleSelection from './src/components/RoleSelection';
import OwnerLogin from './src/screens/OwnerLogin';
import OwnerSignup from './src/screens/OwnerSignup';
import OwnerForgetPassword from './src/screens/OwnerForgetPassword';

import IntroVideo from "./src/components/IntroVideo";
import LoadingVideo from "./src/components/LoadingVideo";
import AboutUs from './src/screens/AboutUs';
import AdminPanel from './src/screens/AdminPanel';
import ContactUs from './src/screens/Contact';

import EditPG from "./src/screens/EditPG";
import EditRooms from "./src/screens/EditRooms";
import Dashboard from "./src/screens/Dashboard";
import MyPGs from './src/screens/MyPGs';
import HostelDetails from './src/screens/HostelDetails';
import MyRooms from './src/screens/MyRooms';
import PaymentsList from './src/screens/PaymentsList';
import PGMembersList from './src/screens/PGMembersList';
import Reviews from './src/screens/Reviews';
import UploadPG from './src/screens/UploadPG';
import PGMembers from './src/screens/PGMembers';
import UserPanel from './src/screens/UserPanel';
import CityHostels from './src/screens/CityHostels';



const Stack = createStackNavigator();

export default function App() {

  const [showIntro, setShowIntro] = useState(true);
  const [loading, setLoading] = useState(false); // use when needed

  // 🎬 Show intro video first
  if (showIntro) {
    return <IntroVideo onFinish={() => setShowIntro(false)} />;
  }

  // ⏳ Show loading video when loading = true
  if (loading) {
    return <LoadingVideo />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StudentLogin"
          component={StudentLogin}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="StudentSignup"
          component={StudentSignup}
          options={{ title: 'Signup' }}
        />

        <Stack.Screen
  name="StudentForgetPassword"
  component={StudentForgetPassword}
  options={{ title: " ForgetPassword" }}
/>

<Stack.Screen
  name="RoleSelection"
  component={RoleSelection}
/>
<Stack.Screen name="OwnerLogin" component={OwnerLogin} />
        <Stack.Screen name="OwnerSignup" component={OwnerSignup} />

        <Stack.Screen
  name="OwnerForgetPassword"
  component={OwnerForgetPassword}
  options={{ title: "Reset Password" }}
/>

 <Stack.Screen
  name="AboutUs"
  component={AboutUs}
  options={{ title: "About Us" }}
/>

 <Stack.Screen
          name="AdminPanel"
          component={AdminPanel}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{ title: "Contact Us" }}
        />
        <Stack.Screen
    name="EditPG"
    component={EditPG}
    options={{ title: "Edit PG" }}
  />

  <Stack.Screen
    name="EditRooms"
    component={EditRooms}
    options={{ title: "Edit Rooms" }}
  />

  <Stack.Screen
    name="Dashboard"
    component={Dashboard}
    options={{ headerShown: false }}
  />

  <Stack.Screen
    name="HostelDetails"
    component={HostelDetails}
    options={{ title: "HostelDetails" }}
  />

  <Stack.Screen
    name="MyPGs"
    component={MyPGs}
    options={{ title: "MyPGs" }}
  />

  <Stack.Screen
    name="MyRooms"
    component={MyRooms}
    options={{ title: "MyRooms" }}
  />

  <Stack.Screen
    name="PaymentList"
    component={PaymentsList}
    options={{ title: "PaymentList" }}
  />

  <Stack.Screen
    name="PGMembers"
    component={PGMembers}
    options={{ title: "PGMembers" }}
  />

  <Stack.Screen
    name="PGMembersList"
    component={PGMembersList}
    options={{ title: "PGMembersList" }}
  />

  <Stack.Screen
    name="Reviews"
    component={Reviews}
    options={{ title: "Reviews" }}
  />

  <Stack.Screen
    name="UploadPG"
    component={UploadPG}
    options={{ title: "UploadPG" }}
  />

<Stack.Screen
    name="UserPanel"
    component={UserPanel}
    options={{ title: "UserPanel" }}
  />

  <Stack.Screen
    name="CityHostels"
    component={CityHostels}
    options={{ title: "CityHostels" }}
  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

