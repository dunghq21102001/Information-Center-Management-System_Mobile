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

const Children = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [originalChildrenList, setOriginalChildrenList] = useState([]);
  const [childrenList, setChildrenList] = useState([
    {
      name: "Nguyen Van A",
      image:
        "https://media.npr.org/assets/img/2013/03/11/istock-4306066-baby_custom-aee07650b312c1f240125b669c2aa92a7d36e73b-s1100-c50.jpg",
      age: 8,
    },
    {
      name: "Tran Thi Lan Ngoc Anh",
      image:
        "https://pixnio.com/free-images/2019/03/18/2019-03-18-04-35-24-e1552891364241-1200x900.jpg",
      age: 15,
    },
    {
      name: "Nguyen Ngoc Thi Van ABC",
      image:
        "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?cs=srgb&dl=pexels-bess-hamiti-35537.jpg&fm=jpg",
      age: 8,
    },
  ]);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = () => {
    setOriginalChildrenList(childrenList);
  };
  const handleSearch = (text) => {
    if (text === "") {
      setChildrenList(originalChildrenList);
    } else {
      const filteredList = originalChildrenList.filter((item) => {
        const itemName = item.name.toLowerCase();
        const searchText = text.toLowerCase();
        return itemName.includes(searchText);
      });
      setChildrenList(filteredList);
    }
  };

  const selectChild = (item) => {
    console.log(item);
  }
  return (
    <View style={styles.container}>
      <Text style={{ marginLeft: 20, fontSize: 18 }}>Filter</Text>
      <TextInput
        placeholder="Child's name, Ex: James"
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
          data={childrenList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              selectChild(item)
            }} style={styles.item}>
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

export default Children;

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
