import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Alert from "../../assets/icon/alert-yellow.svg";
import fonts from "../../utilities/fonts";
import MainButton from "../MainButton";
import TextBox from "../TextBox";

const ModalHeader = ({ title, subTitle, nama }) => {
  return (
    <View style={styles.modalHeader}>
      <View style={styles.iconWrapper}>
        <Alert width={30} height={30} />
      </View>
      <View>
        <Text style={styles.title}>
          {title}
          {nama}?
        </Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

const ModalCancel = ({
  isShow,
  onPress,
  nama,
  value,
  setValue,
  submitCancel,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isShow}>
        <View style={styles.modalBox}>
          <View style={{ marginBottom: 18 }}>
            <ModalHeader
              title="Anda yakin ingin membatalkan pesanan atas nama "
              nama={nama}
              subTitle="Sebelum membatalkan pesanan, bisakah Anda memberikan alasan mengapa Anda ingin membatalkannya?"
            />
          </View>
          <TextBox
            data={value}
            onChange={setValue}
            label="Alasan Pembatalan"
            placeholder="Isi alasan pembatalan pesanan"
          />
          <View style={styles.btnWrapper}>
            <MainButton type="secondary" title="Kembali" onPress={onPress} />
            <MainButton
              type="primary"
              title="Batalkan"
              onPress={submitCancel}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalCancel;

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
  },
  errorModal: {
    borderWidth: 1,
    borderColor: "#F04438",
  },
  modalHeader: {
    alignItems: "center",
    gap: 10,
  },
  dataHeader: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 20,
  },
  inputWrapper: {
    gap: 10,
  },
  inputContainer: {
    gap: 20,
  },
  title: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.medium,
    color: "#101828",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    color: "#667085",
    width: 290,
  },
  iconWrapper: {
    backgroundColor: "#F4EBFF",
    borderWidth: 8,
    borderColor: "#F9F5FF",
    borderRadius: 30,
    padding: 7,
  },
  btnWrapper: {
    flexDirection: "row",
    marginTop: 22,
    gap: 12,
  },
});
