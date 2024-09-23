import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CardUser, NavigationBar, PageHeader } from "../../components";

const ManageUsers = ({ userData, usersList }) => {
  useEffect(() => {
    console.log(usersList);
  }, [usersList]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader
          headerTitle="Kelola akun"
          subHeader="Kelola akun admin & karyawan anda"
        />
      </View>
      <ScrollView>
        <View style={styles.listContainer}>
          {usersList.map((user, index) => (
            <View key={index}>
              <CardUser user={user} />
            </View>
          ))}
        </View>
      </ScrollView>
      {userData && <NavigationBar role={userData.role} />}
    </View>
  );
};

export default ManageUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: "#fff",
    gap: 10,
  },
  header: {
    marginTop: 30,
  },
  listContainer: {
    gap: 10,
    marginBottom: 100,
  },
});
