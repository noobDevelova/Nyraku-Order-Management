import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Female from "../../assets/img/female.svg";
import Male from "../../assets/img/male-sm.svg";
import fonts from "../../utilities/fonts";

const ProfileHeader = ({ nama, email, jk }) => {
  return (
    <View style={styles.container}>
      <View>
        <View>
          {jk === "Laki Laki" ? (
            <Male width={55} height={56} />
          ) : (
            <Female width={55} height={56} />
          )}
        </View>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{nama}</Text>
        <Text style={styles.role}>{email}</Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0601B4",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    gap: 11,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },

  name: {
    color: "#ffff",
    fontFamily: fonts.fontFamily.bold,
    fontSize: fonts.size.font18,
  },
  role: {
    color: "#fff",
    fontFamily: fonts.fontFamily.regular,
  },
  wrapper: {
    gap: 5,
  },
});
