import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const ListData = ({ data1, data2, data3, label1, label2, label3, border }) => {
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.list}>
          <Text style={styles.label}>{label1}</Text>
          <Text style={styles.value}>{data1}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.label}>{label2}</Text>
          <Text style={styles.value}>{data2}</Text>
        </View>
        {data3 && label3 && (
          <View style={styles.list}>
            <Text style={styles.label}>{label3}</Text>
            <Text style={styles.value}>{data3}</Text>
          </View>
        )}
        {border && <View style={styles.border} />}
      </View>
    </View>
  );
};

export default ListData;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
  },
  border: {
    borderWidth: 1,
    borderColor: "#98A2B3",
  },
  wrapper: {
    gap: 2,
    marginBottom: 5,
  },
  label: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#101828",
  },
  value: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    color: "#101828",
  },
});
