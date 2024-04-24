import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = ({ navigation, route, logout }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const goTo = (routeName) => {
    navigation.navigate(routeName);
  };

  async function getUserData() {
    try {
      let data = await AsyncStorage.getItem("userData");
      data = JSON.parse(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Image
          style={styles.avt}
          source={{
            uri: userData?.avatar,
          }}
          alt="user avatar"
        />
        <Text
          style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 10 }}
        >
          {userData?.userName || userData?.username}
        </Text>
        <Text style={{ fontSize: 16, color: "#9b9b9b" }}>
          {userData?.roleName}
        </Text>
      </View>
      <View style={styles.box2}>
        <TouchableOpacity
          onPress={() => {
            goTo("Profile Detail");
          }}
          style={styles.listItem}
        >
          <AntDesign
            style={[styles.listItemIcon, { backgroundColor: "#ffdee8" }]}
            name="user"
            size={24}
            color="#fe346e"
          />
          <Text style={styles.listItemText}>Edit Profile</Text>
          <Icon
            name="chevron-right"
            size={18}
            color="black"
            style={{
              position: "absolute",
              right: wp("18%"),
              top: "50%",
              transform: [{ translateY: -8 }],
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            goTo("Security");
          }}
          style={styles.listItem}
        >
          <MaterialIcons
            name="security"
            style={[styles.listItemIcon, { backgroundColor: "#ccf2ee" }]}
            size={24}
            color="#26c7b6"
          />
          <Text style={styles.listItemText}>Security</Text>
          <Icon
            name="chevron-right"
            size={18}
            color="black"
            style={{
              position: "absolute",
              right: wp("18%"),
              top: "50%",
              transform: [{ translateY: -8 }],
            }}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            goTo("Children");
          }}
          style={styles.listItem}
        >
          <MaterialIcons
            name="face"
            style={[styles.listItemIcon, { backgroundColor: "#dcf7ff" }]}
            size={24}
            color="#2cbce3"
          />
          <Text style={styles.listItemText}>Children</Text>
          <Icon
            name="chevron-right"
            size={18}
            color="black"
            style={{
              position: "absolute",
              right: wp("18%"),
              top: "50%",
              transform: [{ translateY: -8 }],
            }}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={logout} style={styles.listItem}>
          <AntDesign
            style={[styles.listItemIcon, { backgroundColor: "#e4e4e4" }]}
            name="logout"
            size={24}
            color="black"
          />
          <Text style={styles.listItemText}>Logout</Text>
          <Icon
            name="chevron-right"
            size={18}
            color="black"
            style={{
              position: "absolute",
              right: wp("18%"),
              top: "50%",
              transform: [{ translateY: -8 }],
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    backgroundColor: "#eeeced",
    height: hp("100%"),
  },
  box1: {
    height: hp("40%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avt: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  box2: {
    height: hp("60%"),
    width: wp("100%"),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  list: {},
  listItem: {
    width: wp("100%"),
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  listItemIcon: {
    padding: 12,
    borderRadius: 10,
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
