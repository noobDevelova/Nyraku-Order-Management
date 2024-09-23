import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Wp from "../../assets/img/login-wp.svg";
import { InputAcc, MainButton } from "../../components";

import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { useAuthManager } from "../../config/userAuthManager";
import fonts from "../../utilities/fonts";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const { signIn } = useAuthManager();

  const validateEmail = () => {
    // Validasi email di sini
    if (email === "") {
      setErrEmail("Email tidak boleh kosong");
      return false;
    } else if (!isValidEmail(email)) {
      setErrEmail("Email tidak valid");
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = () => {
    // Validasi password di sini
    if (password === "") {
      setErrPassword("Password tidak boleh kosong");
      return false;
    } else {
      return true;
    }
  };

  const isValidEmail = (email) => {
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      try {
        await signIn(email, password, setErrEmail, setErrPassword);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Masuk</Text>
      <Wp style={styles.wp} />
      <View style={styles.inputWrapper}>
        <InputAcc
          placeholder="Email"
          type="email"
          value={email}
          onChange={setEmail}
          keyboard="email-address"
          error={errEmail}
        />
        <InputAcc
          placeholder="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errPassword}
        />
      </View>

      <View style={styles.wrapper}>
        <MainButton type="primary" title="Masuk" onPress={login} />
      </View>
      <TouchableOpacity
        style={styles.btnForgot}
        onPress={() => navigation.navigate("Forgot")}
      >
        <Text style={styles.btnText}>Lupa password?</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    position: "relative",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginTop: 68,
    fontSize: fonts.size.font20 + 4,
    fontFamily: fonts.fontFamily.bold,
  },
  wp: {
    alignSelf: "center",
    marginTop: 5,
  },
  inputWrapper: {
    gap: 12,
  },
  wrapper: {
    flexDirection: "row",
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    paddingHorizontal: 26,
  },
  btnForgot: {
    marginTop: 10,
    marginRight: 10,
  },
  btnText: {
    fontFamily: fonts.fontFamily.bold,
    textAlign: "right",
    color: "#5D5FEF",
  },
});
