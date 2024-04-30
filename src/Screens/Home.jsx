import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginLeft: 20,
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Trang chủ
      </Text>

      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/kidproedu-d505c.appspot.com/o/logo%2Fhomenopg.png?alt=media&token=dd40883b-73ce-4e7f-b7ba-1680fc57bdea",
        }}
        style={styles.img}
      />
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
  img: {
    width: "100%",
    height: 350,
    marginTop: 150,
  },
});
