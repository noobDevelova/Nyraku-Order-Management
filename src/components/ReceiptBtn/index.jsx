import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fonts from "../../utilities/fonts";

const ReceiptBtn = ({ onPress, title, type }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, type === "success" ? styles.error : styles.success]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ReceiptBtn;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: "#32D583",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 11,
  },
  title: {
    textAlign: "center",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#32D583",
    lineHeight: 24,
    letterSpacing: 0.64,
  },
});
