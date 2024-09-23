import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Back from "../../assets/icon/left-arrow.svg";
import Next from "../../assets/icon/right-arrow.svg";

const NavBtn = ({ onPress, type }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {type === "back" ? (
        <Back width={30} height={30} />
      ) : (
        <Next width={30} height={30} />
      )}
    </TouchableOpacity>
  );
};

export default NavBtn;
