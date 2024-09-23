import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Arrow from "../../assets/icon/arrowEx.svg";
import { AlertModal, NavigationBar, ProfileHeader } from "../../components";
import { useDeleteUserManager } from "../../config/useDeleteUserManager";
import fonts from "../../utilities/fonts";

const UsersProfile = ({ route, userData }) => {
  const [isShow, setShow] = useState(false);

  const navigation = useNavigation();
  const { user } = route.params;
  const { deleteUserData } = useDeleteUserManager();

  useEffect(() => {
    console.log(user.id);
  }, []);

  const formatLastLogin = (lastLogin) => {
    const date = dayjs(
      lastLogin.seconds * 1000 + lastLogin.nanoseconds / 1000000
    );
    const formattedDate = date.format("YY/MM/DD | HH:mm");
    return formattedDate;
  };

  const toggleModal = () => {
    setShow(!isShow);
  };

  const submitDelete = async () => {
    try {
      await deleteUserData(user.user_id);
    } catch (error) {
      console.log("Gagal menghapus data", error);
    } finally {
      navigation.navigate("Kelola");
    }
  };
  const formattedLastLogin = formatLastLogin(user.terakhir_login);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <Arrow width={20} height={20} />
      </TouchableOpacity>
      <Text style={styles.title}>Profil akun {user.role}</Text>
      <ProfileHeader
        nama={user.username}
        email={user.email}
        jk={user.jenis_kelamin}
      />
      {/* <View
        style={[
          styles.labelRole,
          user.role === "admin" ? styles.adminLabel : styles.karyawanLabel,
        ]}
      >
        <Text style={styles.text}>{user.role.toUpperCase()}</Text>
      </View> */}
      <View style={styles.descWrapper}>
        <View style={styles.descItem}>
          <Text style={styles.itemLabel}>Nama</Text>
          <View style={styles.itemBox}>
            <Text style={styles.value}>{user.username}</Text>
          </View>
        </View>
        <View style={styles.descItem}>
          <Text style={styles.itemLabel}>Email</Text>
          <View style={styles.itemBox}>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.descItem}>
          <Text style={styles.itemLabel}>Jenis Kelamin</Text>
          <View style={styles.itemBox}>
            <Text style={styles.value}>{user.jenis_kelamin}</Text>
          </View>
        </View>
        <View style={styles.descItem}>
          <Text style={styles.itemLabel}>Terakhir Login</Text>
          <View style={styles.itemBox}>
            <Text style={styles.value}>{formattedLastLogin}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={toggleModal}>
        <Text style={styles.btnText}>Hapus Akun</Text>
      </TouchableOpacity>
      <AlertModal
        title="Anda yakin ingin menghapus akun ini?"
        subtitle="akun akan dihapus permanen"
        btnTitle="Batal"
        isCancel={true}
        toggle={toggleModal}
        isShow={isShow}
        success={false}
        submitPressed={submitDelete}
      />
    </View>
  );
};

export default UsersProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: "#FFF",
  },
  backArrow: {
    marginTop: 25,
    marginLeft: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.bold,
    marginBottom: 20,
  },
  labelRole: {
    borderRadius: 20,
    paddingVertical: 11,
    marginTop: 20,
  },
  adminLabel: {
    backgroundColor: "#97F2E2",
  },
  karyawanLabel: {
    backgroundColor: "#6CE9A6",
  },
  text: {
    textAlign: "center",
    fontSize: fonts.size.font20,
    fontFamily: fonts.fontFamily.bold,
  },

  descWrapper: {
    gap: 9,
    marginTop: 10,
  },
  descItem: {
    gap: 3,
  },
  itemBox: {
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    borderColor: "#D9D9D9",
  },
  itemLabel: {
    fontSize: fonts.size.font16 - 1,
    fontFamily: fonts.fontFamily.semiBold,
  },
  deleteBtn: {
    backgroundColor: "#F04438",
    paddingVertical: 13,
    borderRadius: 8,
    marginTop: 15,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
  },
  value: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
  },
});
