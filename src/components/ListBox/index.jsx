import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const ListBox = ({ data }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.value}>{data}</Text>
    </View>
  );
};

export default ListBox;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 5,
    backgroundColor: "#F9FAFB",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#98A2B3",
  },
  value: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    color: "#101828",
  },
});
