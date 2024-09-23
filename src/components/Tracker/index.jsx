import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../utilities/fonts";

const FirstLine = () => {
  return (
    <View style={styles.currentWrapper}>
      <View style={styles.wrapper}>
        <View style={styles.circleCurrent} />
      </View>
      <View style={styles.line} />
      <View style={styles.wrapper}>
        <View style={styles.circleOff} />
      </View>
      <View style={styles.line} />
      <View style={styles.wrapper}>
        <View style={styles.circleOff} />
      </View>
    </View>
  );
};

const SecondLine = () => {
  return (
    <View style={styles.currentWrapper}>
      <View style={styles.wrapper}>
        <View style={styles.circleFix} />
      </View>
      <View style={styles.lineFix} />
      <View style={styles.wrapper}>
        <View style={styles.circleCurrent} />
      </View>
      <View style={styles.line} />
      <View style={styles.wrapper}>
        <View style={styles.circleOff} />
      </View>
    </View>
  );
};

const LastLine = () => {
  return (
    <View style={styles.currentWrapper}>
      <View style={styles.wrapper}>
        <View style={styles.circleFix} />
      </View>
      <View style={styles.lineFix} />
      <View style={styles.wrapper}>
        <View style={styles.circleFix} />
      </View>
      <View style={styles.lineFix} />
      <View style={styles.wrapper}>
        <View style={styles.circleCurrent} />
      </View>
    </View>
  );
};

const FinalTracker = ({ currentPage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.trackerContainer}>
        {currentPage === "dataPemesan" && <FirstLine />}
        {currentPage === "dataPesanan" && <SecondLine />}
        {currentPage === "cekDataPesanan" && <LastLine />}
      </View>
      {currentPage === "dataPemesan" && (
        <View style={styles.trackerTitlePemesan}>
          <Text style={styles.trackerTitle}>Data Pemesan</Text>
        </View>
      )}
      {currentPage === "dataPesanan" && (
        <View style={styles.trackerTitlePesanan}>
          <Text style={styles.trackerTitle}>Data Pesanan</Text>
        </View>
      )}
      {currentPage === "cekDataPesanan" && (
        <View style={styles.trackerTitleCekData}>
          <Text style={styles.trackerTitle}>Cek Pesanan</Text>
        </View>
      )}
    </View>
  );
};

export default FinalTracker;

const styles = StyleSheet.create({
  container: {
    gap: 7,
  },
  trackerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 26,
  },
  circleCurrent: {
    width: 25,
    height: 25,
    backgroundColor: "#98A2B3",
    borderWidth: 2,
    borderColor: "#5D5FEF",
    borderRadius: 50,
  },
  circleOff: {
    width: 25,
    height: 25,
    backgroundColor: "#98A2B3",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#98A2B3",
  },
  circleFix: {
    width: 25,
    height: 25,
    backgroundColor: "#5D5FEF",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#5D5FEF",
  },
  line: {
    width: "33%",
    height: 3,
    backgroundColor: "#D0D5DD",
  },
  lineFix: {
    width: "33%",
    height: 3,
    backgroundColor: "#A5A6F6",
  },
  wrapper: {
    alignItems: "center",
    gap: 7,
    alignSelf: "center",
  },
  trackerTitle: {
    color: "#475467",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
  },
  currentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  trackerTitlePemesan: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  trackerTitlePesanan: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  trackerTitleCekData: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
  },
});
