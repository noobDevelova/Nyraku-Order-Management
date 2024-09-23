import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const PageHeader = ({ headerTitle, subHeader, data }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{headerTitle}</Text>
      {data ? (
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text style={styles.subHeader}>{subHeader}</Text>
          <Text style={styles.subHeader}>{data}</Text>
        </View>
      ) : (
        <Text style={styles.subHeader}>{subHeader}</Text>
      )}
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  headerContainer: {
    gap: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
  },
  subHeader: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
    color: "#667085",
  },
});
