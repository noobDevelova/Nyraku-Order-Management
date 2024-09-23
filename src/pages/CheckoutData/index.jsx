import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  AlertModal,
  ListBox,
  ListData,
  ListFrame,
  ListItem,
  ListTitle,
  MainButton,
  NavBtn,
  PageHeader,
} from "../../components";
import { userCheckoutOrderManager } from "../../config/userCheckoutOrderManager";
const CheckoutData = ({ navigation, route, userData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const { data_order } = route.params;
  const { checkOutOrder } = userCheckoutOrderManager();

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
    ...data_order,
    isSelesai: true,
    waktu_checkout: currentDate,
    status: "Selesai",
  };
  const lihatInvoice = () => {
    navigation.navigate("Invoice", { data_ordered: rawData });
    toggleModal();
  };

  const submitCheckOut = () => {
    checkOutOrder(rawData, data_order.order_id)
      .then(() => {
        console.log("Checkout Berhasil");
        toggleModal();
      })
      .catch((error) => {
        console.log("Error saat melakukan checkhout: ", error);
      });
  };

  return (
    <ScrollView bounces={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          {data_order && (
            <View style={styles.btnWrapper}>
              <NavBtn type="back" onPress={() => navigation.goBack()} />
            </View>
          )}
          <PageHeader
            headerTitle="Checkout Pesanan"
            subHeader="Silahkan cek pesanan terlebih dahulu"
          />
        </View>
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
            data1={data_order.nama_pemesan}
            data2={data_order.no_telp}
            data3={data_order.alamat}
            label1="Nama"
            label2="No Telp"
            label3="Alamat"
            border={true}
          />
          <ListTitle title="Jadwal Pesanan" />
          <ListData
            data1={data_order.tanggal_pesanan}
            data2={data_order.waktu_pesanan}
            label1="Tanggal Pesanan"
            label2="Waktu Pesanan"
            border={false}
          />
        </View>
        <MainButton
          type="primary"
          title="Checkout Pesanan"
          onPress={submitCheckOut}
        />
        <AlertModal
          title="Pesanan Selesai"
          toggle={lihatInvoice}
          isShow={showAlert}
          success={true}
          subtitle="Pesanan berhasil di checkout"
          btnTitle="Cetak Invoice"
        />
      </View>
    </ScrollView>
  );
};

export default CheckoutData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 75,
    position: "relative",
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
