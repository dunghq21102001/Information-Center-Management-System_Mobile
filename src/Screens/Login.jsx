import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../API";
import func from "../common/func";

const Login = ({ navigation, setIsLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      await API.login({
        userName: userName,
        password: password,
      })
        .then((res) => {
          AsyncStorage.setItem("userData", JSON.stringify(res.data));
          AsyncStorage.setItem("isLoggedIn", "true");
          func.showMess("success", "Đăng nhập thành công");
          // console.log('a');
          setIsLoggedIn(true);
        })
        .catch((err) => {
          // console.log();

          func.showMess("danger", err.response?.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setUserName}
          style={styles.input}
          placeholder="Username or Email"
        />
        <TextInput
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
        />
        <TouchableOpacity onPress={login} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/d2/06/86/d206866fe5c861227fe210ebeb1adf1f.jpg",
        }}
        style={styles.img}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  title: {
    marginTop: 70,
    fontSize: 30,
    textAlign: "center",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 30,
  },
  input: {
    width: "90%",
    height: 60,
    marginBottom: 25,
    backgroundColor: "#f7f8fa",
    borderRadius: 10,
    padding: 10,
  },
  loginBtn: {
    width: "90%",
    height: 50,
    marginBottom: 15,
    backgroundColor: "#36a1ff",
    borderRadius: 10,
    padding: 10,
  },
  loginText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
  },
  img: {
    width: "100%",
    height: 190,
    marginTop: 150,
  },
});
