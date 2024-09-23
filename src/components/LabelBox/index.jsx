import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const LabelBox = ({ state, name, status }) => {
  return (
    <View style={styles.container}>
      {!state && (
        <>
          <Text style={styles.custName}>Buat pesanan A.n {name}</Text>
          <View style={styles.wrapper}>
            <View style={styles.box}>
              <Text style={styles.text}>Pesanan {status}</Text>
            </View>
          </View>
        </>
      )}
      {state && (
        <>
          <Text style={styles.custName}>Pesanan A.n {name}</Text>
          <View style={styles.wrapper}>
            <View style={styles.box}>
              <Text style={styles.text}>Pesanan {status}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default LabelBox;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginVertical: 13,
  },
  box: {
    backgroundColor: "#D0D5DD",
    padding: 8,
    borderRadius: 2,
  },
  text: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    color: "#667085",
  },
  custName: {
    color: "#101828",
    fontFamily: fonts.fontFamily.medium,
    fontSize: fonts.size.font16,
    lineHeight: 20,
  },
  wrapper: {
    flexDirection: "row",
  },
});
