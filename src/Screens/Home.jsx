import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginLeft: 20, fontSize: 24, fontWeight: "bold", marginBottom: 30 }}>
        Trang chủ
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
});
