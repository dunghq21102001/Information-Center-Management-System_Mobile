import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import API from "../API";
const Equipment = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [originalEquipmentList, setOriginalEquipmentList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = () => {
    API.getEquipment()
      .then((res) => {
        setEquipmentList(res.data);
        setOriginalEquipmentList(res.data);
      })
      .catch((err) => {});
  };
  const handleSearch = (text) => {
    if (text === "") {
      setEquipmentList(originalEquipmentList);
    } else {
      const filteredList = originalEquipmentList.filter((item) => {
        const itemName = item.name.toLowerCase();
        const searchText = text.toLowerCase();
        return itemName.includes(searchText);
      });
      setEquipmentList(filteredList);
    }
  };

  const selectChild = (item) => {
    console.log(item);
  };
  return (
    <View style={styles.container}>
      <Text style={{ marginLeft: 20, fontSize: 18 }}>Filter</Text>
      <TextInput
        placeholder="Equipment's name, Ex: Television"
        onChangeText={(newText) => handleSearch(newText)}
        style={{
          width: wp("100%"),
          borderColor: "#f1f2f5",
          borderStyle: "solid",
          borderWidth: 2,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      />
      <View style={{ width: wp("100%") }}>
        <FlatList
          style={{ width: wp("100%"), height: hp("75%") }}
          data={equipmentList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                selectChild(item);
              }}
              style={styles.item}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  source={{
                    uri: item?.image,
                  }}
                />
                <Text style={{ marginLeft: 10 }}>{item?.name}</Text>
              </View>
              <Text>{item?.age} years old</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Equipment;

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "#ffffff",
  },
  item: {
    width: wp("100%"),
    paddingHorizontal: 20,
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#edf1f3",
    borderBottomWidth: 2,
    borderStyle: "solid",
  },
});
