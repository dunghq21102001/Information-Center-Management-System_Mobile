import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import func from "../common/func";
import API from "../API";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EquipmentDetail = ({ navigation, route }) => {
  const { data } = route.params;
  const [productDetail, setProductDetail] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userData, setUserData] = useState(null);
  const [logData, setLogData] = useState(null);

  useEffect(() => {
    fetchEquipment();
    cancelAll();
    getUserData();
    fetchLog();
  }, [data, route]);

  async function getUserData() {
    try {
      let data = await AsyncStorage.getItem("userData");
      data = JSON.parse(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }
  const convertVND = (price) => {
    return func.convertVND(price);
  };
  const convertDate = (date) => {
    return func.convertDate(date);
  };
  const fetchEquipment = () => {
    API.getEquipmentById(data)
      .then((res) => {
        setProductDetail(res.data);
      })
      .catch((err) => {
        navigation.navigate("Equipment");
        func.showMess("danger", "Trang thiết bị không tồn tại!");
      });
  };
  const prepareForBorrow = () => {
    getTeacherList();
  };

  const prepareForRepair = () => {
    API.repairEquipment({
      equipment: {
        id: productDetail?.id,
        roomId: null,
      },
      log: {
        userAccountId: userData?.id,
      },
    })
      .then((res) => {
        navigation.navigate("Equipment");
        func.showMess("success", "Đã đưa thiết bị đi sửa chữa");
      })
      .catch((err) => {});
  };
  const getTeacherList = () => {
    API.getTeacherList()
      .then((res) => {
        // setTeachers(res.data);
        let tmpArr = [];
        res.data.map((item) => {
          tmpArr.push({
            key: item?.id,
            value: item?.userName,
          });
          return item;
        });
        setTeachers(tmpArr);
      })
      .catch((err) => {});
  };
  const handleBorrowEquipment = () => {
    if (selected == "")
      return func.showMess(
        "danger",
        "Phải chọn 1 giáo viên để cho mượn trang thiết bị"
      );

    if (selectedDate == "")
      return func.showMess("danger", "Phải chọn ngày trả");
    API.borrowEquipment({
      equipment: {
        id: productDetail?.id,
        roomId: null,
      },
      log: {
        userAccountId: selected,
        returnedDealine: selectedDate,
      },
    })
      .then((res) => {
        func.showMess("success", "Cho mượn trang thiết bị thành công");
        navigation.navigate("Equipment");
        cancelAll();
      })
      .catch((er) => {
        func.showMess("danger", er?.response?.data);
      });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const fetchLog = () => {
    API.logEquipmentById(data)
      .then((res) => {
        setLogData(res.data);
      })
      .catch((err) => {});
  };

  const cancelAll = () => {
    setTeachers([]);
    setSelected("");
    setSelectedDate("");
  };

  const pickingDate = (e) => {
    console.log(e);
  };

  const prepareForReturn = () => {
    API.returnEquipment({
      equipment: {
        id: productDetail?.id,
        roomId: null,
      },
      log: {
        userAccountId: productDetail?.userAccountId,
      },
    })
      .then((res) => {
        func.showMess("success", res.data);
        navigation.navigate("Equipment");
      })
      .catch((err) => {
        func.showMess("danger", err.response?.data);
      });
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
        Chi tiết trang thiết bị
      </Text>
      <Text style={{ fontSize: 18, marginLeft: 20, marginBottom: 10 }}>
        Tên thiết bị: {productDetail?.name}
      </Text>
      <Text style={{ fontSize: 18, marginLeft: 20, marginBottom: 10 }}>
        Giá: {convertVND(productDetail?.price)}
      </Text>
      <Text style={{ fontSize: 18, marginLeft: 20, marginBottom: 10 }}>
        Trạng thái:{" "}
        {productDetail?.status == "Borrowed"
          ? "Đang mượn"
          : productDetail?.status == "Returned"
          ? "Trong kho"
          : productDetail?.status == "Repair"
          ? "Đang sửa"
          : "Lỗi"}
      </Text>
      {productDetail?.status == "Borrowed" ? (
        <Text style={{ fontSize: 18, marginLeft: 20, marginBottom: 10 }}>
          Giáo viên đang mượn: {productDetail?.userName}
        </Text>
      ) : null}

      {productDetail?.status == "Borrowed" ? (
        <Text style={{ fontSize: 18, marginLeft: 20, marginBottom: 10 }}>
          Hạn trả: {convertDate(productDetail?.returnedDealine)}
        </Text>
      ) : null}
      <View
        style={{
          width: wp("100%"),
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: wp("90%"),
          }}
        >
          {productDetail?.status == "Borrowed" ? (
            <Button title="Trả thiết bị" onPress={prepareForReturn} />
          ) : (
            <View>
              {productDetail?.status != "Repair" ? (
                <Button
                  title="Cho mượn giáo viên mượn"
                  onPress={prepareForBorrow}
                />
              ) : null}
              <View style={{ marginTop: 20 }}>
                <Button title="Sửa chữa thiết bị" onPress={prepareForRepair} />
              </View>
            </View>
          )}
        </View>
      </View>

      {teachers.length > 0 ? (
        <View style={{ width: wp("100%") }}>
          <View
            style={{
              width: wp("100%"),
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <SelectList
              boxStyles={{ width: wp("90%") }}
              setSelected={(val) => setSelected(val)}
              data={teachers}
              save="userName"
            />
          </View>
          <View
            style={{
              width: wp("100%"),
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 20,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                width: wp("30%"),
                borderWidth: 2,
                borderColor: "gray",
                borderStyle: "solid",
                borderRadius: 20,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 14 }}>
                Chọn ngày trả
              </Text>
            </TouchableOpacity>
            {selectedDate != "" ? (
              <Text>Ngày trả: {convertDate(selectedDate)}</Text>
            ) : (
              <View></View>
            )}
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View
            style={{
              width: wp("100%"),
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                width: wp("90%"),
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={cancelAll} style={styles.btn}>
                <Text style={{ textAlign: "center" }}>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBorrowEquipment}
                style={styles.btn}
              >
                <Text style={{ textAlign: "center" }}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}

      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            marginLeft: 20,
            fontSize: 22,
            marginTop: 30,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Lịch sử thiết bị
        </Text>
        <View style={styles.center}>
          <FlatList
            style={{ width: wp("100%"), height: hp("65%") }}
            data={logData}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, marginLeft: 10 }}>
                    {item?.name}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, marginLeft: 10 }}>
                  Ngày mượn: {convertDate(item?.borrowedDate)} &ensp; - &ensp;
                  Hạn trả: {convertDate(item?.returnedDealine)}
                </Text>
                <Text style={{ marginLeft: 10, fontSize: 16 }}>
                  Trạng thái:{" "}
                  {item?.status == "Borrowed"
                    ? "Mượn"
                    : item?.status == "Returned"
                    ? "Trả"
                    : item?.status == "Repair"
                    ? "Sửa lỗi"
                    : "Lỗi"}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default EquipmentDetail;

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "#ffffff",
  },
  btn: {
    borderColor: "black",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 1,
    width: wp("20%"),
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 10,
  },
  center: {
    width: wp("100%"),
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});
