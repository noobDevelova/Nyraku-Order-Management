import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
const withOrderChecker = (OriginalComponent) => {
  return (props) => {
    return <OriginalComponent {...props} />;
  };
};

export default withOrderChecker;
