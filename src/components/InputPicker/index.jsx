import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Error from "../../assets/icon/alert-circle.svg";
import fonts from "../../utilities/fonts";

const SelectOption = ({ setData, error }) => {
  const gender = [
    {
      key: "Laki Laki",
      value: "Laki Laki",
    },
    {
      key: "Perempuan",
      value: "Perempuan",
    },
  ];
  return (
    <View>
      <SelectList
        setSelected={setData}
        data={gender}
        placeholder="Jenis Kelamin"
        style={styles.select}
        fontFamily={fonts.fontFamily.regular}
        boxStyles={[styles.select, error !== "" ? styles.error : styles.select]}
        search={false}
      />
      {error !== "" && (
        <View style={styles.errorWrapper}>
          <Error width={20} height={20} />
          <Text style={styles.textError}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default SelectOption;

const styles = StyleSheet.create({
  select: {
    borderColor: "#D0D5DD",
  },
  error: {
    borderColor: "#F04438",
  },
  textError: {
    color: "#F04438",
    fontFamily: fonts.fontFamily.regular,
  },
  errorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 5,
    marginTop: 3,
  },
});
