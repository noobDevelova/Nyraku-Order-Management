import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ButtonCard, NavigationBar } from "../../components";
import fonts from "../../utilities/fonts";

const AdminPanel = ({ userData, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Buat akun</Text>
        <Text style={styles.subTitle}>Buat akun untuk karyawan anda</Text>
      </View>
      <View style={styles.optionWrapper}>
        <Text style={styles.label}>
          Klik tombol dibawah ini untuk menuju ke halaman pembuatan akun
        </Text>
        <View style={styles.wrapper}>
          <ButtonCard
            title="Buat akun karyawan"
            onPress={() => navigation.navigate("Buat Akun Karyawan")}
          />
        </View>
      </View>
      <NavigationBar role={userData.role} />
    </View>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 30,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: fonts.size.font36,
    color: "#000000",
    fontFamily: fonts.fontFamily.bold,
  },
  subTitle: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
    color: "#667085",
  },
  optionWrapper: {
    marginTop: 51,
  },
  label: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
    marginBottom: 24,
  },
  wrapper: {
    gap: 10,
  },
});
