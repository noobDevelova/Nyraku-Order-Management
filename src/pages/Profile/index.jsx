import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationBar, ProfileHeader, ProfileSet } from "../../components";
import { FIREBASE_AUTH } from "../../config/FIREBASE";

import fonts from "../../utilities/fonts";

const Profile = ({ userData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profil</Text>
      {userData && (
        <ProfileHeader
          nama={userData.username}
          email={userData.email}
          jk={userData.jenis_kelamin}
        />
      )}
      <View style={styles.setWrapper}>
        <ProfileSet
          title="Logout"
          subtitle="Keluar akun ini"
          onPress={() => FIREBASE_AUTH.signOut()}
        />
      </View>
      <NavigationBar role={userData.role} />
      <StatusBar style="auto" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 20,
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: fonts.size.font24,
    fontFamily: fonts.fontFamily.bold,
    marginVertical: 17,
    color: "#181D27",
  },
  setWrapper: {
    marginTop: 31,
    paddingVertical: 10,
    gap: 25,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
