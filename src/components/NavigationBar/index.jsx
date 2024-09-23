import { useNavigation, withNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Home from "../../assets/icon/home.svg";
import List from "../../assets/icon/list.svg";
import Profile from "../../assets/icon/profile.svg";
import Users from "../../assets/icon/users.svg";
import fonts from "../../utilities/fonts";
import matrics from "../../utilities/screenDimensions";

const NavigationBar = ({ role }) => {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => nav.navigate("Home")}>
        <View style={styles.homeWrapper}>
          <Home />
          <Text style={styles.btnText}>Home</Text>
        </View>
      </TouchableOpacity>
      {role === "admin" && (
        <View>
          <TouchableOpacity onPress={() => nav.navigate("Kelola")}>
            <List width={25} height={25} />
          </TouchableOpacity>
        </View>
      )}
      {role === "admin" && (
        <View>
          <TouchableOpacity onPress={() => nav.navigate("Admin")}>
            <Users width={25} height={25} />
          </TouchableOpacity>
        </View>
      )}
      <View>
        <TouchableOpacity onPress={() => nav.navigate("Profile")}>
          <Profile width={25} height={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 26,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: matrics.screenWidth,
    borderRadius: 20,
    justifyContent: "space-around",
    elevation: 5, // Untuk Android
    shadowColor: "#000", // Untuk iOS
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  homeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 14,
    backgroundColor: "#F1F9FF",
    paddingHorizontal: 13,
    borderRadius: 100,
  },
  btnText: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
  },
  nav: {
    flexDirection: "row",
    gap: 20,
  },
});
