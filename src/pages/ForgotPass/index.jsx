import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Wp from "../../assets/img/wp_forgot.svg";
import { AlertModal, InputAcc, MainButton, NavBtn } from "../../components";
import { userForgotPasswordManager } from "../../config/userForgotPasswordManager";
import fonts from "../../utilities/fonts";

const ForgotPassword = ({ navigation }) => {
  const [sendMail, setSendMail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [isShow, setShow] = useState(false);
  const { resetPassword } = userForgotPasswordManager();
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateEmail = () => {
    // Validasi email di sini
    if (sendMail === "") {
      setErrEmail("Email tidak boleh kosong");
      return false;
    } else if (!isValidEmail(sendMail)) {
      setErrEmail("Email tidak valid");
      return false;
    } else {
      return true;
    }
  };

  const submitReset = async () => {
    const isValid = validateEmail();
    if (isValid) {
      try {
        await resetPassword(sendMail, setErrEmail);
        setShow(true);
      } catch (error) {
        console.log("Gagal mengirim link", error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      contentContainerStyle={styles.contentContainer}
      bounces={false}
    >
      <NavBtn type="back" onPress={() => navigation.goBack()} />
      <Wp />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Lupa</Text>
        <Text style={styles.title}>Password?</Text>
      </View>
      <Text style={styles.subTitle}>
        Masukkan alamat email yang terkait dengan akun Anda dan kami akan
        mengirimkan tautan untuk mengatur ulang kata sandi Anda.
      </Text>
      <InputAcc
        placeholder="Masukkan email"
        type="email"
        value={sendMail}
        onChange={setSendMail}
        keyboard="email-address"
        error={errEmail}
      />
      <View style={styles.btnWrapper}>
        <MainButton type="primary" title="Kirim" onPress={submitReset} />
      </View>
      <AlertModal
        title="Email reset telah dikirim!"
        subtitle="Silakan ikuti petunjuk di email untuk mengatur ulang kata sandi Anda."
        btnTitle="Kembali ke login"
        toggle={() => navigation.navigate("Login")}
        isShow={isShow}
        success={true}
      />
      <StatusBar style="auto" />
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 50,
    backgroundColor: "#fff",
  },
  wrapper: {
    marginTop: 10,
  },
  title: {
    fontSize: fonts.size.font24,
    fontFamily: fonts.fontFamily.bold,
  },
  subTitle: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    marginVertical: 10,
  },
  btnWrapper: {
    flexDirection: "row",
    marginTop: 20,
  },
});
