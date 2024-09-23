import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import matrics from "../../utilities/screenDimensions";

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        style={styles.isLoading}
        source={require("../../assets/animation/loading.json")}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#fff",
    width: matrics.screenWidth,
    height: matrics.screenHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  isLoading: {
    width: 250,
    height: 250,
  },
});
