import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AlertIcon from "../../assets/icon/alert-circle.svg";
import Calendar from "../../assets/icon/calendar-icon.svg";
import Clock from "../../assets/icon/clock.svg";
import fonts from "../../utilities/fonts";

const DatePick = ({
  placeholder,
  label,
  date,
  onChange,
  showPicker,
  toggle,
  data,
  setData,
  platform,
  onIos,
  icon,
  errorState,
  name,
  mode,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable onPress={toggle}>
        <View>
          <View
            style={[
              styles.inputWrapper,
              errorState ? styles.inputWrapperError : null,
            ]}
          >
            <View>{mode === "time" ? <Clock /> : <Calendar />}</View>
            <TextInput
              style={styles.datePicker}
              placeholder={placeholder}
              value={data}
              editable={false}
              onChangeText={setData}
              onPressIn={toggle}
            />
          </View>
          {errorState && (
            <View style={styles.msgWrapper}>
              <AlertIcon />
              <Text style={styles.msgText}>{name} harus diisi!</Text>
            </View>
          )}
        </View>

        {showPicker && (
          <DateTimePicker
            mode={mode}
            display="spinner"
            value={date}
            onChange={onChange}
            style={styles.dateTimePicker}
            minimumDate={new Date(Date.now())}
          />
        )}

        {showPicker && platform.OS === "ios" && (
          <View style={styles.btnDateTime}>
            <TouchableOpacity
              style={[styles.buttonCancel, styles.pickerButton]}
              onPress={toggle}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonOk, styles.pickerButton]}
              onPress={onIos}
            >
              <Text style={[styles.buttonText, { color: "#101828" }]}>Ok</Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default DatePick;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#667085",
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  datePicker: {
    color: "#101828",
  },
  label: {
    marginBottom: 6,
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
  },
  dateTimePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.medium,
    textAlign: "center",
  },
  buttonCancel: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#614FE0",
    paddingVertical: 10,
    backgroundColor: "#614FE0",
    width: "45%",
  },
  buttonOk: {
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#614FE0",
    width: "45%",
  },
  btnDateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  msgWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 3,
  },
  inputWrapperError: {
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#F04438",
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  msgText: {
    color: "#F04438",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
  },
});
