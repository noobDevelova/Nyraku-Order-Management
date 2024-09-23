import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Danger from "../../assets/icon/alert-circle.svg";
import fonts from "../../utilities/fonts";

const DataInputModal = ({
  label,
  placeholder,
  data,
  onChange,
  mode,
  type,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      {mode === "rp" ? (
        <View style={styles.wrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {error && (
              <View>
                <Danger />
              </View>
            )}
            <Text style={styles.mataUang}>Rp.</Text>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={"#667085"}
              value={data}
              onChangeText={onChange}
              style={styles.input}
              keyboardType={type}
            />
          </View>
        </View>
      ) : (
        <View style={styles.wrapper}>
          {error && (
            <View>
              <Image source={danger} />
            </View>
          )}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={"#667085"}
            value={data}
            onChangeText={onChange}
            style={styles.input}
            keyboardType={type}
          />
        </View>
      )}
    </View>
  );
};

export default DataInputModal;

const styles = StyleSheet.create({
  inputContainer: {
    gap: 6,
  },
  wrapper: {
    flexDirection: "row",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    gap: 5,
  },
  error: {
    borderColor: "#F04438",
  },
  success: {
    borderColor: "#D0D5DD",
  },
  input: {
    fontSize: fonts.size.font16,
  },
  label: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
    color: "#344054",
  },
  mataUang: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
    marginRight: 5,
  },
});
