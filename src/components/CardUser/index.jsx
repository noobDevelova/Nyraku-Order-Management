import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Detail from "../../assets/icon/Document.svg";
import Female from "../../assets/img/female.svg";
import Male from "../../assets/img/male-sm.svg";
import fonts from "../../utilities/fonts";
const CardUser = ({ user }) => {
  useEffect(() => {
    console.log(user);
  }, []);
  const navigation = useNavigation();
  const formatLastLogin = (lastLogin) => {
    const date = dayjs(
      lastLogin.seconds * 1000 + lastLogin.nanoseconds / 1000000
    );
    const formattedDate = date.format("YY/MM/DD | HH:mm");
    return formattedDate;
  };

  const formattedLastLogin = user.terakhir_login
    ? formatLastLogin(user.terakhir_login)
    : "";

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.cardProfile}>
          {user.jenis_kelamin === "Laki Laki" ? (
            <Male width={33} height={30} />
          ) : (
            <Female width={33} height={30} />
          )}
          <Text style={styles.cardName}>{user.username}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Profil User", { user: user })}
        >
          <Detail width={20} height={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardFooter}>
        <LinearGradient
          colors={["#D8D8D8", "#D8D8D8"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.line}
        />
        <View style={styles.list}>
          <Text style={styles.label}>Jabatan</Text>
          <View
            style={[
              styles.labelBox,
              user.role === "admin" ? styles.admin : styles.karyawan,
            ]}
          >
            {user.role === "admin" ? (
              <Text style={styles.textAdmin}>Admin</Text>
            ) : (
              <Text style={styles.textKaryawan}>Karyawan</Text>
            )}
          </View>
        </View>
        <View style={styles.list}>
          <Text style={styles.label}>Terakhir Login</Text>
          <View style={styles.labelTime}>
            <Text style={styles.textLabel}>{formattedLastLogin}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardUser;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#A5A6F6",
    padding: 9,
    borderRadius: 8,
  },
  line: {
    height: 1,
    opacity: 0.5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContainer: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F2F4F7",
    borderRadius: 12,
    gap: 12,
  },
  cardProfile: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  cardName: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.bold,
    color: "#5D5FEF",
  },
  cardFooter: {
    gap: 7,
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
  },
  labelBox: {
    paddingHorizontal: 18,
    borderRadius: 4,
    paddingVertical: 4,
  },
  labelTime: {
    backgroundColor: "#98A2B3",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  admin: {
    backgroundColor: "#97F2E2",
  },
  karyawan: {
    backgroundColor: "#6CE9A6",
  },
  textAdmin: {
    fontFamily: fonts.fontFamily.regular,
  },
  textKaryawan: {
    fontFamily: fonts.fontFamily.regular,
  },
});
