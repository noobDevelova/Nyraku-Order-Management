import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import {
  FinalTracker,
  ListBox,
  ListData,
  ListFrame,
  ListItem,
  ListTitle,
  MainButton,
  NavBtn,
  PageHeader,
} from "../../../components";
import { useUpdateOrderManager } from "../../../config/useUpdateOrderManager";
const CekUbahPesanan = ({ navigation, route, userData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const { data_order, data_id } = route.params;
  const { data_pemesan, list_pesanan, catatan } = data_order;

  const getTimeNow = () => {
    const date = new Date();

    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("id-ID", options);

    const timeOptions = { hour: "numeric", minute: "numeric" };
    const formattedTime = date.toLocaleTimeString("id-ID", timeOptions);

    const formattedDateTime = `${formattedDate} - ${formattedTime}`;

    return formattedDateTime;
  };

  const { updateData } = useUpdateOrderManager();
  const currentDate = getTimeNow();
  const total_harga = data_order.list_pesanan.reduce((total, pesanan) => {
    const hargaSatuan = parseInt(pesanan.harga_satuan.replace(".", ""));
    const kuantitas = parseInt(pesanan.kuantitas);
    const totalHarga = hargaSatuan * kuantitas;

    return total + totalHarga;
  }, 0);

  const formatedData = {
    ...data_pemesan,
    list_pesanan,
    catatan,
  };
  const formatPrice = (number) => {
    const formattedNumber = number.toLocaleString("id-ID");
    return formattedNumber.replace(/,/g, ".");
  };
  const updatedFinal = [
    ["order_id", data_id],
    ["nama_pemesan", formatedData.nama_pemesan],
    ["alamat", formatedData.alamat],
    ["no_telp", formatedData.no_telp],
    ["tanggal_pesanan", formatedData.tanggal_pesanan],
    ["waktu_pesanan", formatedData.waktu_pesanan],
    ["list_pesanan", formatedData.list_pesanan],
    ["total_harga", formatPrice(total_harga)],
    ["catatan", formatedData.catatan],
    ["isSelesai", false],
    ["pesanan_dibuat", currentDate],
    ["status", "diubah"],
    ["by_admin", userData.username],
  ];

  const finalUpdated = Object.fromEntries(updatedFinal);

  useEffect(() => {
    console.log(finalUpdated);
    console.log(data_id);
  }, [finalUpdated, data_id]);

  const submitOrder = async () => {
    if (finalUpdated) {
      return updateData(data_id, finalUpdated)
        .then(() => {
          navigation.navigate("List Pesanan");
        })
        .catch((error) => {
          console.log("Kesalahan saat update data", error.message);
        });
    }
  };
  const toggleModal = () => {
    setShowAlert(!showAlert);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          {data_order && (
            <View style={styles.btnWrapper}>
              <NavBtn type="back" onPress={() => navigation.goBack()} />
            </View>
          )}
          <PageHeader
            headerTitle="Ubah Pesanan"
            subHeader="Cek data pesanan yang sudah diubah"
          />
        </View>
        <FinalTracker currentPage="cekDataPesanan" />
        <View style={styles.listWrapper}>
          <ListTitle title="Detail Pesanan" />
          <ListFrame data={data_order.list_pesanan} />
          <ListItem
            label="Total"
            data={formatPrice(total_harga)}
            type="money"
          />
          <ListTitle title="Catatan Pesanan" />
          <ListBox data={data_order.catatan} />
          <ListTitle title="Data Pemesan" />
          <ListData
            data1={data_order.data_pemesan.nama_pemesan}
            data2={data_order.data_pemesan.no_telp}
            data3={data_order.data_pemesan.alamat}
            label1="Nama"
            label2="No Telp"
            label3="Alamat"
            border={true}
          />
          <ListTitle title="Jadwal Pesanan" />
          <ListData
            data1={data_order.data_pemesan.tanggal_pesanan}
            data2={data_order.data_pemesan.waktu_pesanan}
            label1="Tanggal Pesanan"
            label2="Waktu Pesanan"
            border={false}
          />
        </View>
        <View style={styles.btnSubmitWrapper}>
          <MainButton
            type="primary"
            title="Simpan Perubahan"
            onPress={submitOrder}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CekUbahPesanan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 75,
    position: "relative",
  },
  btnSubmitWrapper: {
    marginVertical: 20,
    flexDirection: "row",
  },
  listWrapper: {
    marginVertical: 10,
  },
  btnWrapper: {
    position: "absolute",
    top: -40,
    left: 10,
  },
});
