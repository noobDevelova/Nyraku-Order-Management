import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  AlertModal,
  FinalTracker,
  ListBox,
  ListData,
  ListFrame,
  ListItem,
  ListTitle,
  MainButton,
  NavBtn,
  PageHeader,
} from "../../components";

import { generateUniqueOrderKey } from "../../config/generateOrderKey";
import { userUploadOrderManager } from "../../config/useOrderManager";

const CekDataPesanan = ({ navigation, route, userData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [finalData, setFinalData] = useState({});
  const [orderId, setOrderId] = useState(null);
  const { data_order } = route.params;
  const { data_pemesan, list_pesanan, catatan } = data_order;
  const { uploadData } = userUploadOrderManager();

  const generateOrderId = async () => {
    try {
      const key = await generateUniqueOrderKey();
      const generatedKey = key;
      setOrderId(generatedKey);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateOrderId();
  }, []);

  useEffect(() => {
    const formatedData = {
      ...data_pemesan,
      list_pesanan,
      catatan,
    };

    const dataFrame = [
      ["order_id", orderId],
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
      ["status", "diproses"],
      ["by_admin", userData.username],
    ];

    const orderedData = Object.fromEntries(dataFrame);
    setFinalData(orderedData);
  }, [
    data_pemesan,
    list_pesanan,
    catatan,
    orderId,
    total_harga,
    currentDate,
    userData.username,
  ]);
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
  const total_harga = data_order.list_pesanan.reduce((total, pesanan) => {
    const hargaSatuan = parseInt(pesanan.harga_satuan.replace(".", ""));
    const kuantitas = parseInt(pesanan.kuantitas);
    const totalHarga = hargaSatuan * kuantitas;

    return total + totalHarga;
  }, 0);
  const formatPrice = (number) => {
    const formattedNumber = number.toLocaleString("id-ID");
    return formattedNumber.replace(/,/g, ".");
  };

  const toggleModal = () => {
    setShowAlert(!showAlert);
  };

  const lihatInvoice = () => {
    navigation.navigate("Invoice", { data_ordered: finalData });
    toggleModal();
  };

  const submitOrder = async () => {
    if (orderId) {
      try {
        await uploadData(finalData);
      } catch (error) {
        console.log(error);
      } finally {
        toggleModal();
      }
    }
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
            headerTitle="Buat Pesanan"
            subHeader="Cek data pesanan yang sudah dibuat"
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
            title="Daftarkan Pesanan"
            onPress={submitOrder}
          />
        </View>
        <AlertModal
          title="Pesanan didaftarkan"
          subtitle="pesanan berhasil didaftarkan"
          btnTitle="Lihat Nota"
          toggle={lihatInvoice}
          isShow={showAlert}
          success={true}
        />
      </View>
    </ScrollView>
  );
};

export default CekDataPesanan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 75,
    position: "relative",
    backgroundColor: "#fff",
  },

  listWrapper: {
    marginVertical: 10,
  },
  btnWrapper: {
    position: "absolute",
    top: -40,
    left: 10,
  },
  btnSubmitWrapper: {
    marginVertical: 20,
    flexDirection: "row",
  },
});
