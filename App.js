import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FlashMessage from "react-native-flash-message";
import Login from "./src/Screens/Login";
import Home from "./src/Screens/Home";
import Profile from "./src/Screens/Profile";
import TabBar from "./src/Component/TabBar";
import ProfileDetail from "./src/Screens/ProfileDetail";
import Schedule from "./src/Screens/Schedule";
import Password from "./src/Screens/Password";
import Children from "./src/Screens/Children";
import Equipment from "./src/Screens/Equipment";

const Tab = createBottomTabNavigator();

export default function App() {
  const navigationContainerRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkUserData();
  }, [isLoggedIn]);

  const checkUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        setIsLoggedIn(true)
      } else setIsLoggedIn(false)
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <View style={styles.container}>
      <NavigationContainer ref={navigationContainerRef}>
        {isLoggedIn ? (
          <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Home">
              {(props) => <Home {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Schedule" component={Schedule} />
            <Tab.Screen name="Equipment" component={Equipment} />
            <Tab.Screen name="Profile">
              {(props) => <Profile {...props} logout={logout} />}
            </Tab.Screen>
            <Tab.Screen name="Security" component={Password} />
            <Tab.Screen name="Children" component={Children} />
            <Tab.Screen name="Profile Detail" component={ProfileDetail} />
          </Tab.Navigator>
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40
  },
});
