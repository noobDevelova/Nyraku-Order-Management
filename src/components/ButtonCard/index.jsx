import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Add from "../../assets/icon/add.svg";
import User from "../../assets/icon/user-icon.svg";
import fonts from "../../utilities/fonts";

const ButtonCard = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <User />
        <Text style={styles.title}>{title}</Text>
        <Add />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5, // Untuk Android
    shadowColor: "#000", // Untuk iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
  },
});
