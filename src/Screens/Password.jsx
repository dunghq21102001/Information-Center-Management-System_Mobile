import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import API from "../API";
import func from "../common/func";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Password = ({ navigation, route }) => {
  const [curPass, setCurPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");

  const changePass = async () => {
    if (newPass1.trim() == newPass2.trim()) {
      let userData = await AsyncStorage.getItem("userData");
      userData = JSON.parse(userData);
      API.changePass({
        id: userData?.id,
        currentPassword: curPass,
        newPasswordHash: newPass1,
      })
        .then((res) => {
          func.showMess("success", "Change password successfully!");
          setCurPass('')
          setNewPass1('')
          setNewPass2('')
        })
        .catch((err) => {
          func.showMess("danger", "Change password failed! Try again");
        });
    } else {
      func.showMess(
        "warning",
        "The 2 new passwords you must enter are the same"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>Bảo mật</Text>
      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(newText) => setCurPass(newText)}
        secureTextEntry={true}
        value={curPass}
      />
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(newText) => setNewPass1(newText)}
        value={newPass1}
        secureTextEntry={true}
      />
      <Text style={styles.label}>New Password Again</Text>
      <TextInput
        style={styles.input}
        onChangeText={(newText) => setNewPass2(newText)}
        value={newPass2}
        secureTextEntry={true}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={changePass}
          style={{
            width: wp("20%"),
            paddingHorizontal: 10,
            paddingVertical: 12,
            backgroundColor: "#f0f0f0",
            borderRadius: 10,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1,
  },
});
