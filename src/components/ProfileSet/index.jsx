import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Arrow from "../../assets/icon/arrow.svg";
import LogOut from "../../assets/icon/logout.svg";
import Profile from "../../assets/icon/user-profile.svg";
import fonts from "../../utilities/fonts";

const ProfileSet = ({ title, subtitle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          {title === "Akun anda" && <Profile width={25} height={25} />}
          {title === "Logout" && <LogOut width={25} height={25} />}
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {title === "Logout" && <Arrow style={styles.arrow} />}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileSet;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconWrapper: {
    backgroundColor: "rgba(78, 64, 196, 0.1)",
    padding: 10,
    borderRadius: 40,
  },
  title: {
    color: "#181D27",
    fontFamily: fonts.fontFamily.medium,
    fontSize: fonts.size.font16,
  },
  wrapper: {
    gap: 2,
  },
  arrow: {
    marginLeft: "auto",
  },
});
