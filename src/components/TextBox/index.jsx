import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import fonts from "../../utilities/fonts";

const TextBox = ({ label, placeholder, data, onChange }) => {
  const handleBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.inputOuter,
            data.length > 0 ? styles.borderFill : styles.borderEmpty,
          ]}
        >
          <TextInput
            placeholder={placeholder}
            value={data}
            onChangeText={(val) => onChange(val)}
            style={styles.textBox}
            multiline={true}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  label: {
    color: "#101828",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
  },
  inputOuter: {
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 8,
  },
  borderEmpty: {
    borderColor: "#667085",
  },
  borderFill: {
    borderColor: "#5D5FEF",
  },
  textBox: {
    height: 100,
  },
});
