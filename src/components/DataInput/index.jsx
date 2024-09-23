import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import AlertIcon from "../../assets/icon/alert-circle.svg";
import fonts from "../../utilities/fonts";

const InputData = ({
  label,
  placeholder,
  value,
  setData,
  errorState,
  name,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={"#667085"}
          value={value}
          onChangeText={(value) => setData(value)}
        />
        <View
          style={[
            styles.inputUnderline,
            errorState ? styles.inputUnderlineError : null,
          ]}
        />
        {errorState && (
          <View style={styles.msgWrapper}>
            <AlertIcon />
            <Text style={styles.msgText}>{name} harus diisi!</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default InputData;

const styles = StyleSheet.create({
  inputUnderline: {
    width: "100%",
    height: 1,
    backgroundColor: "#667085",
  },
  label: {
    marginBottom: 6,
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
  },
  textInput: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#101828",
  },
  inputUnderlineError: {
    width: "100%",
    height: 1,
    backgroundColor: "#F04438",
  },
  msgWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 3,
  },
  msgText: {
    color: "#F04438",
    fontFamily: fonts.fontFamily.regular,
  },
});
