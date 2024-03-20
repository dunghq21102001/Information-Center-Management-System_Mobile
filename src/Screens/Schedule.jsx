import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Calendar, Agenda } from "react-native-calendars";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Schedule = () => {
  const [items, setItems] = useState({});

  function loadItems(day) {
    // setTimeout(() => {
    //   for (let i = 0; i < 10; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = timeToString(time);

    //     if (!items[strTime]) {
    //       items[strTime] = [];

    //       const numItems = Math.floor(Math.random() * 3 + 1);
    //       for (let j = 0; j < numItems; j++) {
    //         items[strTime].push({
    //           name: "Item for " + strTime + " #" + j,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //           day: strTime,
    //         });
    //       }
    //     }
    //   }

    //   const newItems = {};
    //   Object.keys(items).forEach((key) => {
    //     newItems[key] = items[key];
    //   });
    //   console.log(newItems);
    //   setItems(newItems);
    // }, 1000);
    setItems({
      "2024-02-26": [
        {
          day: "2024-02-26",
          height: 50,
          status: "Absent",
          startTime: "7:30",
          endTime: "11:30",
          name: "Toan",
        },
        {
          day: "2024-02-26",
          height: 50,
          status: "Attendance",
          startTime: "7:30",
          endTime: "11:30",
          name: "Toan 2",
        },
        {
          day: "2024-02-26",
          height: 101,
          status: "Attendance",
          startTime: "7:30",
          endTime: "11:30",
          name: "Dia",
        },
      ],
      "2024-02-27": [
        {
          day: "2024-02-27",
          height: 107,
          status: "Attendance",
          startTime: "7:30",
          endTime: "11:30",
          name: "Van",
        },
        {
          day: "2024-02-27",
          height: 72,
          status: "Attendance",
          startTime: "7:30",
          endTime: "11:30",
          name: "Anh",
        },
      ],
      "2024-02-28": [],
      "2024-02-29": [],
    });
  }

  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }

  const renderItem = (reservation, isFirst) => {
    return (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() => Alert.alert(reservation?.name)}
      >
        <Text>{reservation?.name}</Text>
        <Text>
          {reservation?.startTime} - {reservation?.endTime}
        </Text>
        <Text
          style={[
            reservation?.status.toLowerCase() == "attendance"
              ? styles.attendance
              : styles.absent,
          ]}
        >
          {reservation?.status}
        </Text>
      </TouchableOpacity>
    );
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
        Lịch học
      </Text>

      <View style={{ flex: 1 }}>
        <Agenda
          items={items}
          minDate={"2024-02-01"}
          maxDate={"2024-02-29"}
          loadItemsForMonth={loadItems}
          renderItem={renderItem}
        ></Agenda>
      </View>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "#ffffff",
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: "green",
  },
  dayItem: {
    marginLeft: 34,
  },
  attendance: {
    color: "#5cb85c",
  },
  absent: {
    color: "#ff0000",
  },
});
