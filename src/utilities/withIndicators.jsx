import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
const withIndicators = (OriginalComponent) => {
  return (props) => {
    const [availableOrder, setAvailableOrder] = useState(false);
    const navigation = useNavigation();

    const checkIsOrderAvailable = () => {
      props.isAvailable
        ? setAvailableOrder(props.isAvailable)
        : setAvailableOrder(false);
    };
    const goto = () => {
      props.isAvailable
        ? navigation.navigate("List Checkout")
        : navigation.navigate("Data Pemesan");
    };
    return (
      <OriginalComponent
        isAvailable={availableOrder}
        state={checkIsOrderAvailable}
        onPress={goto}
        {...props}
      />
    );
  };
};

export default withIndicators;
