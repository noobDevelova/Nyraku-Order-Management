import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkout from "../../assets/icon/checkout.svg";
import Delete from "../../assets/icon/delete.svg";
import Edit from "../../assets/icon/edit.svg";
import Icon from "../../assets/icon/list-icon.svg";
import Cancel from "../../assets/icon/paper-fail.svg";
import Detail from "../../assets/icon/see-detail.svg";
import { userCheckoutOrderManager } from "../../config/userCheckoutOrderManager";
import { useDeleteHistory } from "../../config/userDeleteHistory";
import fonts from "../../utilities/fonts";
import Label from "../Label/Index";
import ModalCancel from "../ModalCancel";

const CardFrame = ({
  item,
  nama,
  waktu,
  tanggal,
  status,
  alamat,
  data,
  type,
  label,
  onPress,
}) => {
  const nav = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [alasan, setAlasan] = useState("");

  const { checkOutOrder } = userCheckoutOrderManager();
  const { deleteData } = useDeleteHistory();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const seeDetail = () => {
    nav.navigate("Invoice", { data_ordered: data });
  };

  const changeData = () => {
    nav.navigate("Ubah Pemesan", { data_ordered: data });
  };
  const checkoutData = () => {
    nav.navigate("Checkout Order", { data_order: data });
  };

  const getTimeNow = () => {
    const date = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("id-ID", options);
    const timeOptions = { hour: "numeric", minute: "numeric" };
    const formattedTime = date.toLocaleTimeString("id-ID", timeOptions);
    const formattedDateTime = `${formattedDate} - ${formattedTime}`;

    return formattedDateTime;
  };
  const currentDate = getTimeNow();

  const rawData = {
    ...data,
    isSelesai: true,
    waktu_checkout: currentDate,
    status: "Dibatalkan",
    alasan_dibatalkan: alasan,
  };

  const submitCancel = () => {
    checkOutOrder(rawData, data.order_id)
      .then(() => {
        console.log("Checkout Berhasil");
        toggleModal();
      })
      .catch((error) => {
        console.log("Error saat melakukan checkhout: ", error);
      });
  };

  const handleDelete = () => {
    try {
      const dataId = data.order_id;
      deleteData(dataId);
    } catch (error) {
      console.log("Gagal saat menghapus data", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.listWrapper}>
          <Text style={styles.productTitle}>{item.length} Item</Text>
          <Label status={status} type={type} />
        </View>
        <View style={styles.listWrapper}>
          <Text style={styles.time}>{waktu}</Text>
          <Text style={styles.time}>{tanggal}</Text>
        </View>
      </View>
      <LinearGradient
        colors={["#D8D8D8", "#D8D8D8"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.line}
      />
      <View style={styles.bottomWrapper}>
        <View style={styles.imgWrapper}>
          <Icon />
        </View>
        <View style={styles.orderIdentity}>
          <Text style={styles.name}>{nama}</Text>
          <Text style={styles.alamat}>{alamat}</Text>
        </View>
        <View style={styles.navWrapper}>
          {type === "checkout" && (
            <View style={styles.wrapper}>
              <TouchableOpacity style={styles.btn} onPress={toggleModal}>
                <Cancel />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={checkoutData}>
                <Checkout />
              </TouchableOpacity>
            </View>
          )}
          {type === "list" && (
            <View style={styles.wrapper}>
              <TouchableOpacity style={styles.btn} onPress={changeData}>
                <Edit />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={seeDetail}>
                <Detail />
              </TouchableOpacity>
            </View>
          )}
          {type === "histori" && (
            <View style={styles.wrapper}>
              <TouchableOpacity style={styles.btn} onPress={handleDelete}>
                <Delete />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={seeDetail}>
                <Detail />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <ModalCancel
        isShow={showModal}
        onPress={toggleModal}
        value={alasan}
        setValue={setAlasan}
        nama={nama}
        submitCancel={submitCancel}
      />
      {/* <AlertModal
        title="Pesanan dibatalkan"
        subtitle="Pesanan berhasil dibatalkan"
        btnTitle="kembali"
        isShow={success}
        toggle={toggleSuccess}
        success={true}
      /> */}
    </View>
  );
};

export default CardFrame;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F2F4F7",
    borderRadius: 12,
  },
  listWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topWrapper: {
    gap: 2,
    marginBottom: 12,
  },
  productTitle: {
    color: "#5D5FEF",
    lineHeight: 24,
  },
  time: {
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 24,
  },

  line: {
    height: 1,
    opacity: 0.5,
  },
  imgWrapper: {
    marginRight: 11,
  },
  bottomWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  name: {
    color: "#5D5FEF",
    fontFamily: fonts.fontFamily.medium,
  },
  alamat: {
    color: "#98A2B3",
  },
  navWrapper: {
    flexDirection: "row",
    gap: 5,
    marginLeft: "auto",
  },
  btn: {
    backgroundColor: "#A5A6F6",
    padding: 5,
    borderRadius: 5,
  },
  wrapper: {
    flexDirection: "row",
    gap: 5,
  },
});
