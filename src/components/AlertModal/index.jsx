import LottieView from "lottie-react-native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Danger from "../../assets/icon/danger-triangle.svg";
import fonts from "../../utilities/fonts";
import MainButton from "../MainButton";

const AlertModal = ({
  isShow,
  toggle,
  success,
  title,
  subtitle,
  btnTitle,
  isCancel,
  submitPressed,
}) => {
  return (
    <View>
      <View style={{ flex: 1 }}>
        <Modal isVisible={isShow}>
          <View style={styles.modalBox}>
            <View style={styles.iconWrapper}>
              <View style={styles.iconInner}>
                {success ? (
                  <LottieView
                    source={require("../../assets/animation/success-order.json")}
                    autoPlay
                    loop={false}
                    style={{ width: 40, height: 40 }}
                  />
                ) : (
                  <Danger style={{ width: 40, height: 40 }} />
                )}
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subTitle}>{subtitle}</Text>
              <View style={{ flexDirection: "row", marginTop: 12, gap: 5 }}>
                <MainButton type="primary" title={btnTitle} onPress={toggle} />
                {isCancel && (
                  <MainButton
                    type="secondary"
                    title="Hapus"
                    onPress={submitPressed}
                  />
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 30,
  },
  iconWrapper: {
    alignItems: "center",
  },
  iconInner: {
    padding: 10,
    backgroundColor: "#F4EBFF",
    borderRadius: 40,
    borderWidth: 8,
    borderColor: "#F9F5FF",
  },
  wrapper: {
    justifyContent: "center",
    marginTop: 20,
    gap: 5,
  },
  title: {
    textAlign: "center",
    fontSize: fonts.size.font16,
    color: "#101828",
    fontFamily: fonts.fontFamily.medium,
  },
  subTitle: {
    textAlign: "center",
    fontSize: fonts.size.font14,
    color: "#667085",
    fontFamily: fonts.fontFamily.regular,
  },
});
