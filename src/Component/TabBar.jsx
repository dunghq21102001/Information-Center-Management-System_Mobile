import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

function TabBar({ state, descriptors, navigation }) {
  const getIcon = (label) => {
    let returnIcon = "";
    switch (label) {
      case "Home":
        returnIcon = "home";
        break;
      case "Profile":
        returnIcon = "user";
        break;
      case "Schedule":
        returnIcon = "calendar-times-o";
        break;
      case "Equipment":
        returnIcon = "dropbox";
        break;
    }
    return returnIcon;
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={
              label != "Profile Detail" &&
              label != "Security" &&
              label != "Children" &&
              label != "Equipment Detail" &&
              label != 'CameraScan'
                ? { flex: 1, alignItems: "center" }
                : { flex: 1, alignItems: "center", display: "none" }
            }
          >
            <Icon
              name={getIcon(label)}
              size={24}
              color={isFocused ? "#146ebe" : "#222"}
            />
            <Text
              style={{ color: isFocused ? "#146ebe" : "#222", marginTop: 4 }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
