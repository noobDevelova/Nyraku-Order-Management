import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Check from "../../assets/icon/check.svg";
import fonts from "../../utilities/fonts";

const InvoiceHeader = ({ onPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Nota Transaksi</Text>
      <TouchableOpacity onPress={onPress}>
        <Check />
      </TouchableOpacity>
    </View>
  );
};

export default InvoiceHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginVertical: 10,
    paddingTop: 25,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: fonts.size.font20,
    color: "#fff",
    fontFamily: fonts.fontFamily.bold,
  },
});
