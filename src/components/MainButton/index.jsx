import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fonts from "../../utilities/fonts";

const MainButton = ({ onPress, title, type }) => {
  const primaryStyles = {
    backgroundColor: "#614FE0",
    borderRadius: 8,
  };

  const secondaryStyles = {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#5D5FEF",
    borderRadius: 8,
  };

  const style = type === "primary" ? primaryStyles : secondaryStyles;
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.button]}>
      <Text
        style={[
          styles.btnText,
          type === "primary" ? styles.btnTextPrimary : styles.btnTextSecondary,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    flex: 1,
  },
  btnText: {
    textAlign: "center",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    paddingVertical: 12,
  },
  btnTextPrimary: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#fff",
  },
  btnTextSecondary: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#5D5FEF",
  },
});
