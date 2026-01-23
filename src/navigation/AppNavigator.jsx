// import React, { useState, useEffect } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Auth Screens
// import RoleSelectionScreen from '../screens/RoleSelectionScreen';
// import StudentLogin from '../screens/StudentLogin';
// import StudentSignup from '../screens/StudentSignup';
// import StudentForgetPassword from '../screens/StudentForgetPassword';
// import OwnerLogin from '../screens/OwnerLogin';
// import OwnerSignup from '../screens/OwnerSignup';
// import OwnerForgetPassword from '../screens/OwnerForgetPassword';

// // Main Screens
// import Home from '../screens/Home';
// import AboutUs from '../screens/AboutUs';
// import Contact from '../screens/Contact';
// import HostelPage from '../screens/HostelPage';
// import CityHostels from '../screens/CityHostels';

// // Owner Screens
// import AdminPanel from '../screens/AdminPanel';
// import Dashboard from '../screens/Dashboard';
// import UploadPG from '../screens/UploadPG';
// import MyPGs from '../screens/MyPGs';
// import EditPG from '../screens/EditPG';
// import EditRooms from '../screens/EditRooms';
// import PGMembersList from '../screens/PGMembersList';

// // Student Screens
// import UserPanel from '../screens/UserPanel';

// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   const [initialRoute, setInitialRoute] = useState('Home');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const token = await AsyncStorage.getItem('hlopgToken');
//       const user = await AsyncStorage.getItem('hlopgUser');
//       const owner = await AsyncStorage.getItem('hlopgOwner');

//       if (token) {
//         if (user) {
//           setInitialRoute('UserPanel');
//         } else if (owner) {
//           setInitialRoute('AdminPanel');
//         } else {
//           setInitialRoute('Home');
//         }
//       } else {
//         setInitialRoute('Home');
//       }
//     } catch (error) {
//       console.error('Error checking auth status:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return null;
//   }

//   return (
//     <Stack.Navigator 
//       initialRouteName={initialRoute}
//       screenOptions={{
//         headerShown: false,
//         cardStyle: { backgroundColor: '#fff' },
//       }}
//     >
//       {/* Auth Stack */}
//       <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
//       <Stack.Screen name="StudentLogin" component={StudentLogin} />
//       <Stack.Screen name="StudentSignup" component={StudentSignup} />
//       <Stack.Screen name="StudentForgetPassword" component={StudentForgetPassword} />
//       <Stack.Screen name="OwnerLogin" component={OwnerLogin} />
//       <Stack.Screen name="OwnerSignup" component={OwnerSignup} />
//       <Stack.Screen name="OwnerForgetPassword" component={OwnerForgetPassword} />

//       {/* Main Stack */}
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="AboutUs" component={AboutUs} />
//       <Stack.Screen name="Contact" component={Contact} />
//       <Stack.Screen name="HostelPage" component={HostelPage} />
//       <Stack.Screen name="CityHostels" component={CityHostels} />

//       {/* Owner Stack */}
//       <Stack.Screen name="AdminPanel" component={AdminPanel} />
//       <Stack.Screen name="Dashboard" component={Dashboard} />
//       <Stack.Screen name="UploadPG" component={UploadPG} />
//       <Stack.Screen name="MyPGs" component={MyPGs} />
//       <Stack.Screen name="EditPG" component={EditPG} />
//       <Stack.Screen name="EditRooms" component={EditRooms} />
//       <Stack.Screen name="PGMembersList" component={PGMembersList} />

//       {/* Student Stack */}
//       <Stack.Screen name="UserPanel" component={UserPanel} />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;

// navigation/AppNavigator.jsx
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Auth Screens
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import StudentLogin from '../screens/StudentLogin';
import StudentSignup from '../screens/StudentSignup';
import StudentForgetPassword from '../screens/StudentForgetPassword';
import OwnerLogin from '../screens/OwnerLogin';
import OwnerSignup from '../screens/OwnerSignup';
import OwnerForgetPassword from '../screens/OwnerForgetPassword';

// Main Screens
import Home from '../screens/Home';
import AboutUs from '../screens/AboutUs';
import Contact from '../screens/Contact';
import HostelPage from '../screens/HostelPage';
import CityHostels from '../screens/CityHostels';

// Owner Screens
import AdminPanel from '../screens/AdminPanel';
import Dashboard from '../screens/Dashboard';
import UploadPG from '../screens/UploadPG';
import MyPGs from '../screens/MyPGs';
import EditPG from '../screens/EditPG';
import EditRooms from '../screens/EditRooms';
import PGMembersList from '../screens/PGMembersList';

// Student Screens
import UserPanel from '../screens/UserPanel';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState('Home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('hlopgToken');
      const user = await AsyncStorage.getItem('hlopgUser');
      const owner = await AsyncStorage.getItem('hlopgOwner');

      if (token) {
        if (user) {
          setInitialRoute('UserPanel');
        } else if (owner) {
          setInitialRoute('AdminPanel');
        } else {
          setInitialRoute('Home');
        }
      } else {
        setInitialRoute('Home');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator 
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      {/* Auth Stack */}
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="StudentLogin" component={StudentLogin} />
      <Stack.Screen name="StudentSignup" component={StudentSignup} />
      <Stack.Screen name="StudentForgetPassword" component={StudentForgetPassword} />
      <Stack.Screen name="OwnerLogin" component={OwnerLogin} />
      <Stack.Screen name="OwnerSignup" component={OwnerSignup} />
      <Stack.Screen name="OwnerForgetPassword" component={OwnerForgetPassword} />

      {/* Main Stack */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="HostelPage" component={HostelPage} />
      <Stack.Screen name="CityHostels" component={CityHostels} />

      {/* Owner Stack */}
      <Stack.Screen name="AdminPanel" component={AdminPanel} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="UploadPG" component={UploadPG} />
      <Stack.Screen name="MyPGs" component={MyPGs} />
      <Stack.Screen name="EditPG" component={EditPG} />
      <Stack.Screen name="EditRooms" component={EditRooms} />
      <Stack.Screen name="PGMembersList" component={PGMembersList} />

      {/* Student Stack */}
      <Stack.Screen name="UserPanel" component={UserPanel} />
    </Stack.Navigator>
  );
};

export default AppNavigator;