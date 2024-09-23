import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Wp from "../../assets/img/acc-wp.svg";
import { MainButton } from "../../components";
import fonts from "../../utilities/fonts";

const Loader = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Selamat Datang di Nyraku</Text>
        <Text style={styles.subTitle}>
          Kuasai Penuh Pesanan Anda dan Optimalisasi Operasional Bisnis Anda
          dengan Solusi Manajemen Pesanan yang Powerfull
        </Text>
      </View>
      <Wp style={styles.wp} />
      <View style={styles.btn}>
        <View style={styles.btnWrapper}>
          <MainButton type="primary" title="Masuk" onPress={goToLogin} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 26,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-around",
  },
  titleWrapper: {
    gap: 5,
  },
  title: {
    fontSize: fonts.size.font20 + 4,
    fontFamily: fonts.fontFamily.bold,
    color: "#101828",
  },
  subTitle: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    color: "#667085",
  },
  wp: {
    alignSelf: "center",
  },
  btnWrapper: {
    flexDirection: "row",
  },
  btn: {
    gap: 5,
  },
});
