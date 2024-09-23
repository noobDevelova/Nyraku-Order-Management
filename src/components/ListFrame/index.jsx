import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const ListFrame = ({ data }) => {
  return (
    <View>
      {data.map((pesanan, index) => (
        <View key={index}>
          <View style={styles.wrapper}>
            <View style={styles.list}>
              <Text style={styles.label}>Pesanan</Text>
              <Text style={styles.value}>{index + 1}</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.label}>Item</Text>
              <Text style={styles.value}>{pesanan.item}</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.label}>Kuantitas</Text>
              <Text style={styles.value}>{pesanan.kuantitas}</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.label}>Harga satuan</Text>
              <Text style={styles.value}>{pesanan.harga_satuan}</Text>
            </View>
            <View style={styles.border} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default ListFrame;

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
    color: "#101828",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
  },
});
