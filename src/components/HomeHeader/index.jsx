import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Day from "../../assets/icon/day.svg";
import Morning from "../../assets/icon/morning.svg";
import Night from "../../assets/icon/night.svg";
import fonts from "../../utilities/fonts";

const HomeHeader = ({ nama, time }) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.time}>{time},</Text>
        <Text style={styles.name}>{nama}</Text>
      </View>
      <View style={styles.timeIcon}>
        {time === "Pagi" && <Morning width={40} height={40} />}
        {time === "Siang" && <Day width={40} height={40} />}
        {time === "Malam" && <Night width={40} height={40} />}
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: fonts.size.font32,
    color: "#094067",
    fontFamily: fonts.fontFamily.bold,
  },
  timeIcon: {
    backgroundColor: "#FCFCFD",
    marginRight: 4,
    marginTop: 4,
    padding: 10,
    borderRadius: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  name: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
    color: "#094067",
  },
});
