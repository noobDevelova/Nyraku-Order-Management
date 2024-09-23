import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ball from "../../assets/icon/circle.svg";
import fonts from "../../utilities/fonts";
import withIndicators from "../../utilities/withIndicators";
import LinearBtn from "../LinearBtn";

const Hero = ({ isAvailable, dataLength, onPress }) => {
  const num = dataLength;
  return (
    <View style={styles.container}>
      <Ball style={styles.circle} />
      <View style={styles.wrapper}>
        <View style={styles.indicatorWrapper}>
          <View
            style={[
              styles.heroIndicator,
              isAvailable
                ? styles.indicatorAvailable
                : styles.indicatorNotAvailable,
            ]}
          />
          {isAvailable ? (
            <Text style={styles.indicatorText}>
              {num} Pesanan masih diproses
            </Text>
          ) : (
            <Text style={styles.indicatorText}>Tidak ada pesanan nih</Text>
          )}
        </View>
        <Text style={styles.heroText}>
          {isAvailable ? "Selesaikan pesanan anda" : "Buat pesanan yuk"}
        </Text>
        <LinearBtn isAvailable={isAvailable} onPress={onPress} />
      </View>
    </View>
  );
};

export default withIndicators(Hero);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A5A6F6",
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  wrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  heroIndicator: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderRadius: 8,
  },
  indicatorAvailable: {
    backgroundColor: "#5EFF6E",
    borderColor: "rgba(94, 255, 110, 0.20)",
  },
  indicatorNotAvailable: {
    backgroundColor: "#98A2B3",
    borderColor: "rgba(117, 117, 117, 0.20)",
  },
  indicatorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  indicatorText: {
    color: "#fff",
    fontSize: fonts.size.font14,
  },
  heroText: {
    fontSize: fonts.size.font20,
    width: 150,
    color: "#fff",
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 24,
  },
  circle: {
    position: "absolute",
    right: 0,
  },
});
