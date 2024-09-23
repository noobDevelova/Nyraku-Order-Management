import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const Label = ({ status, type }) => {
  return (
    <View
      style={[
        styles.wrapper,
        type === "checkout" ? styles.wait : styles.success,
        type === "histori" && status === "Dibatalkan" ? styles.failed : null,
      ]}
    >
      {type === "checkout" ? (
        <Text style={styles.text}>Menunggu</Text>
      ) : (
        <Text style={styles.text}>{status}</Text>
      )}
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  success: {
    backgroundColor: "#97F2E2",
  },
  wait: {
    backgroundColor: "#FEDF89",
  },
  failed: {
    backgroundColor: "#F8A5A5",
  },
  text: {
    color: "#19594D",
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 22,
  },
});
