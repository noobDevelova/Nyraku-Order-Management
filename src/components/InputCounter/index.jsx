import { PrivateValueStore } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Minus from "../../assets/icon/minus.svg";
import Plus from "../../assets/icon/plus.svg";
import fonts from "../../utilities/fonts";

const InputCounter = ({ kurang, tambah, data }) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.counterBtn} onPress={kurang}>
        {/* <Image source={minus} style={styles.btnIcon} /> */}
        <Minus />
      </TouchableOpacity>
      <Text style={styles.text}>{data}</Text>
      <TouchableOpacity style={styles.counterBtn} onPress={tambah}>
        {/* <Image source={plus} style={styles.btnIcon} /> */}
        <Plus />
      </TouchableOpacity>
    </View>
  </View>
);

export default InputCounter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "#A5A6F6",
    gap: 16,
    borderRadius: 20,
  },
  counterBtn: {
    flexDirection: "row",
    backgroundColor: "#5D5FEF",
    padding: 5,
    alignItems: "center",
    borderRadius: 20,
  },
  btnIcon: {
    resizeMode: "contain",
    width: 20,
    height: 20,
  },
  text: {
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.regular,
  },
});
