import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import fonts from "../../utilities/fonts";

const LinearBtn = ({ isAvailable, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={["#82C3FF", "#3DA9FC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.btnText}>
          {isAvailable ? "Cek Pesanan" : "Buat Pesanan"}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LinearBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  gradient: {
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  btnText: {
    color: "#FFF",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 48,
  },
});
