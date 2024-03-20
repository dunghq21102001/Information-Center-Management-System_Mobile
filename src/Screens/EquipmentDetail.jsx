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
import func from "../common/func";
import API from "../API";
import { SelectList } from "react-native-dropdown-select-list";

const EquipmentDetail = ({ navigation, route }) => {
  const { data } = route.params;
  const [productDetail, setProductDetail] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = React.useState("");

  useEffect(() => {
    fetchEquipment();
    cancelAll();
  }, [data]);
  const convertVND = (price) => {
    return func.convertVND(price);
  };
  const fetchEquipment = () => {
    API.getEquipmentById(data)
      .then((res) => {
        setProductDetail(res.data);
      })
      .catch((err) => {
        navigation.navigate("Equipment");
        func.showMess(
          "danger",
          "Trang thiết bị không tồn tại!"
        );
      });
  };
  const prepareForBorrow = () => {
    getTeacherList();
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
    API.borrowEquipment({
      equipment: {
        id: productDetail?.id,
        roomId: null,
      },
      log: {
        userAccountId: selected,
        returnedDealine: "2024-03-30T16:15:59.428Z",
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

  const cancelAll = () => {
    setTeachers([]);
    setSelected("");
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
        Trạng thái: {productDetail?.status}
      </Text>
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
          <Button title="Cho mượn giáo viên mượn" onPress={prepareForBorrow} />
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
});
