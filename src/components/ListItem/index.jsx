import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const ListItem = ({ data, label, type }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      {type === "money" ? (
        <Text style={styles.value}>Rp. {data}</Text>
      ) : (
        <Text style={styles.value}>{label}</Text>
      )}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  label: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#101828",
  },
  value: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    color: "#101828",
  },
});
