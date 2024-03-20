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
import Modal from "react-native-modal";
import API from "../API";
import func from "../common/func";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Equipment = ({ navigation, route }) => {
  const [originalEquipmentList, setOriginalEquipmentList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

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

  const convertVND = (price) => {
    return func.convertVND(price);
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

  const selectItem = (item) => {
    navigation.navigate("Equipment Detail", { data: item?.id });
  };

  const goToCreate = () => {
    navigation.navigate("CameraScan");
  };
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
        Trang thiết bị
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ marginLeft: 20, fontSize: 18 }}>Tìm kiếm</Text>
        <AntDesign
          name="scan1"
          size={24}
          color="black"
          onPress={goToCreate}
          style={{ marginRight: 20 }}
        />
      </View>
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
        <Text style={{ marginLeft: 20, fontSize: 16, marginTop: 30 }}>
          Danh sách trang thiết bị
        </Text>
        <FlatList
          style={{ width: wp("100%"), height: hp("75%") }}
          data={equipmentList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                selectItem(item);
              }}
              style={styles.item}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item?.name}</Text>
              </View>
              <Text style={{ fontSize: 10 }}>
                {convertVND(item?.price)} &ensp; - &ensp;
                {item?.status == "Borrowed"
                  ? "Đang mượn"
                  : item?.status == "Returned"
                  ? "Trong kho"
                  : item?.status == "Repair"
                  ? "Đang sửa"
                  : "Lỗi"}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* modal */}
      <Modal isVisible={isShowModal}>
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
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
