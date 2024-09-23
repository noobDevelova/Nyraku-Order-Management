import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const ListTitle = ({ title }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ListTitle;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 7,
  },
  title: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#101828",
    lineHeight: 26,
  },
});
