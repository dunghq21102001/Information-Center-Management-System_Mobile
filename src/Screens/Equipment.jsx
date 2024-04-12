import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PanResponder,
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
import Spinner from "react-native-loading-spinner-overlay";

const Equipment = ({ navigation, route }) => {
  const [originalEquipmentList, setOriginalEquipmentList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showReloadIcon, setShowReloadIcon] = useState(false);
  const [reloadIconPosition, setReloadIconPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = () => {
    setLoading(true);
    API.getEquipment()
      .then((res) => {
        setLoading(false);
        setEquipmentList(res.data);
        setOriginalEquipmentList(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
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

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event) => {
        setIsSwiping(true);
        setShowReloadIcon(true);
        // const { moveX, moveY } = event.nativeEvent;
        // const x = Number(moveX);
        // const y = Number(moveY);
        // setReloadIconPosition({ x: x - 27, y: y - 27 });
      },
      onPanResponderRelease: () => {
        setIsSwiping(false);
        fetchEquipment();
        setShowReloadIcon(false);
        // setReloadIconPosition({ x: 0, y: 0 });
      },
    })
  ).current;

  const selectItem = (item) => {
    navigation.navigate("Equipment Detail", { data: item?.id });
  };

  const goToCreate = () => {
    navigation.navigate("CameraScan");
  };
  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Spinner
        visible={loading}
        textContent={"Đang tải..."}
        textStyle={styles.spinnerTextStyle}
      />
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
        placeholder="Tên thiết bị, ví dụ: Tivi"
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
      <View style={{ width: wp("100%"), position: "relative" }}>
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
        {showReloadIcon && (
          <View style={[styles.reloadIconContainer]}>
            <Ionicons name="reload" size={54} color="black" />
          </View>
        )}
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
  spinnerTextStyle: {
    color: "#ffffff",
  },
  reloadIconContainer: {
    position: "relative",
    bottom: "90%",
    left: "50%",
    transform: [{ translateX: -12 }],
    zIndex: 999,
  },
});
