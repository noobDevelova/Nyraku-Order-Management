import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import Bell from "../../assets/icon/bell-icon.svg";

const BellBtn = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bg}>
        <Bell style={styles.icon} />
        <View style={styles.indicator} />
      </View>
    </View>
  );
};

export default BellBtn;

const styles = StyleSheet.create({
  wrapper: {},
  bg: {
    backgroundColor: "rgba(78, 64, 196, 0.1)",
    padding: 10,
    borderRadius: 40,
  },
  indicator: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 10,
    position: "absolute",
    right: 10,
    top: 10,
  },
});
