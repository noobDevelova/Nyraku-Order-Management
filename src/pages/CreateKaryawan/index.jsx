import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Wp from "../../assets/img/wp-create.svg";
import {
  AlertModal,
  InputAcc,
  MainButton,
  NavBtn,
  SelectOption,
} from "../../components";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../config/FIREBASE";
import { userCreateUserManager } from "../../config/userCreateAccountManager";
import fonts from "../../utilities/fonts";

const CreateKaryawan = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [isCreatedSucced, setCreatedSucced] = useState(false);
  const [isShow, setShow] = useState(false);
  const [error, setError] = useState({
    errUsername: "",
    errMail: "",
    errGender: "",

    errPass: "",
    errCurrPass: "",
  });

  const { signUp } = userCreateUserManager(FIREBASE_AUTH, FIREBASE_DB);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isUsernameValid = () => {
    if (username === "") {
      setError((prevError) => ({
        ...prevError,
        errUsername: "Username tidak boleh kosong!",
      }));
      return false;
    } else if (username[0] !== username[0].toUpperCase()) {
      setError((prevError) => ({
        ...prevError,
        errUsername: "Username harus diawali dengan huruf kapital",
      }));
      return false;
    } else {
      return true;
    }
  };
  const isEmailValid = () => {
    if (email === "") {
      setError((prevError) => ({
        ...prevError,
        errMail: "Email tidak boleh kosong",
      }));
      return false;
    } else if (!isValidEmail(email)) {
      setError((prevError) => ({
        ...prevError,
        errMail: "Email tidak valid",
      }));
      return false;
    } else {
      return true;
    }
  };
  const isPasswordValid = () => {
    if (password === "" || currentPassword === "") {
      setError((prevError) => ({
        ...prevError,
        errPass: "Kata sandi tidak boleh kosong!",
        errCurrPass: "Kata sandi tidak boleh kosong!",
      }));
      return false;
    } else if (currentPassword !== password) {
      setError((prevError) => ({
        ...prevError,
        errCurrPass: "Kata sandi tidak sama!",
      }));
      return false;
    } else {
      return true;
    }
  };
  const isGenderValid = () => {
    if (jenis_kelamin === "") {
      setError((prevError) => ({
        ...prevError,
        errGender: "Jenis Kelamin harus diisi!",
      }));
      return false;
    } else {
      return true;
    }
  };

  const submitCreate = async () => {
    try {
      const isUsername = isUsernameValid();
      const isEmail = isEmailValid();
      const isPassword = isPasswordValid();
      const isGender = isGenderValid();
      const rawData = {
        username,
        email,
        jenis_kelamin,
        terakhir_login: "Belum pernah login",
        role: "karyawan",
      };

      if (isUsername && isEmail && isPassword && isGender) {
        console.log("oke");
        setError((prevError) => ({
          ...prevError,
          errUsername: "",
          errMail: "",
          errGender: "",
          errPass: "",
          errCurrPass: "",
        }));
        await signUp(email, password, rawData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <NavBtn type="back" onPress={() => navigation.navigate("Admin")} />
      </View>
      <Text style={styles.label}>Buat akun karyawan</Text>
      <Wp style={styles.wp} />

      <View style={styles.inputWrapper}>
        <InputAcc
          type="text"
          value={username}
          onChange={setUsername}
          placeholder="Username"
          error={error.errUsername}
        />
        <InputAcc
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          error={error.errMail}
        />
        <SelectOption
          setData={setJenisKelamin}
          value={jenis_kelamin}
          error={error.errGender}
        />
        <InputAcc
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Kata sandi"
          error={error.errPass}
        />
        <InputAcc
          type="password"
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Tulis ulang kata sandi"
          error={error.errCurrPass}
        />
      </View>
      <View style={styles.btnWrapper}>
        <MainButton type="primary" title="Buat Akun" onPress={submitCreate} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default CreateKaryawan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 50,
  },
  wp: {
    alignSelf: "center",
  },
  label: {
    marginTop: 15,
    fontSize: fonts.size.font24,
    fontFamily: fonts.fontFamily.bold,
  },
  inputWrapper: {
    gap: 12,
  },
  btnWrapper: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
