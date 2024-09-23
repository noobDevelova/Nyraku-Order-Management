import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Error from "../../assets/icon/alert-circle.svg";
import Close from "../../assets/icon/eye-close.svg";
import Show from "../../assets/icon/eye-open.svg";
import fonts from "../../utilities/fonts";
import withShowPassword from "../../utilities/withShowPassword";

const InputAcc = ({
  type,
  placeholder,
  onChange,
  value,
  toggle,
  isShow,
  keyboard,
  error,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View
        style={[styles.wrapper, error !== "" ? styles.error : styles.success]}
      >
        {type === "text" && (
          <View>
            <TextInput
              placeholder={placeholder}
              style={styles.input}
              value={value}
              onChangeText={(val) => onChange(val)}
              keyboardType={keyboard}
            />
          </View>
        )}
        {type === "email" && (
          <View>
            <TextInput
              placeholder={placeholder}
              style={styles.input}
              value={value}
              onChangeText={(val) => onChange(val)}
              keyboardType={keyboard}
            />
          </View>
        )}
        {type === "password" && (
          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={!isShow}
              value={value}
              onChangeText={(val) => onChange(val)}
            />
            <TouchableOpacity onPress={toggle}>
              {isShow ? (
                <Close style={styles.eye} />
              ) : (
                <Show style={styles.eye} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
      {error !== "" && (
        <View style={styles.errorWrapper}>
          <Error width={20} height={20} />
          <Text style={styles.textError}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default withShowPassword(InputAcc);

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  success: {
    borderColor: "#D0D5DD",
  },
  error: {
    borderColor: "#F04438",
  },
  input: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
    color: "#101828",
    height: 24,
    width: "90%",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textError: {
    color: "#F04438",
    fontFamily: fonts.fontFamily.regular,
  },
  errorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 5,
    marginTop: 3,
  },
});
