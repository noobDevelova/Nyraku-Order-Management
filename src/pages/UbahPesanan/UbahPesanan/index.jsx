import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AlertModal,
  DataModal,
  FinalTracker,
  InputCounter,
  MainButton,
  NavBtn,
  PageHeader,
  TextBox,
} from "../../../components";

const UbahPesanan = ({ navigation, route }) => {
  const { data_pemesan, data_ordered } = route.params;
  const listLength = data_ordered?.list_pesanan.length;
  const [jumlah, setJumlah] = useState(listLength);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setAlertModal] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);
  const [catatan, setCatatan] = useState(data_ordered.catatan);
  const [list_pesanan, setListPesanan] = useState([]);
  const [savedOrders, setSavedOrders] = useState([]);
  const [dataPesanan, setDataPesanan] = useState({
    data_pemesan: "",
    list_pesanan: "",
    catatan: "",
  });

  useEffect(() => {
    console.log("data lama : ", data_ordered);
    console.log(list_pesanan);
    setSavedOrders(list_pesanan);
  }, [data_ordered, list_pesanan]);

  const formatPrice = (number) => {
    const formattedNumber = number.toLocaleString("id-ID");
    return formattedNumber.replace(/,/g, ".");
  };

  const handleSubmitOrders = (orders) => {
    const totalPrice = orders.map((pesanan, index) => {
      const hargaSatuan = parseInt(pesanan.harga_satuan.replace(".", ""));
      const kuantitas = parseInt(pesanan.kuantitas);
      const totalHarga = hargaSatuan * kuantitas;

      return {
        ...pesanan,
        total_harga: formatPrice(totalHarga),
      };
    });
    setSavedOrders(totalPrice);
    setListPesanan(totalPrice);
  };

  const tambah = () => {
    setJumlah(jumlah + 1);
  };

  const kurang = () => {
    if (jumlah <= 1) {
      setJumlah(1);
    } else if (data_ordered.list_pesanan.length > 1) {
      setJumlah(jumlah - 1);
      data_ordered.list_pesanan.pop();
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleAlertModal = () => {
    setAlertModal(!showAlertModal);
  };

  const resetValidation = () => {
    setInputErrors([]); // Reset state inputErrors
  };

  const validateData = () => {
    let isValid = true;
    const newInputErrors = Array(jumlah).fill(false);

    for (let i = 0; i < jumlah; i++) {
      if (
        !list_pesanan[i] ||
        !list_pesanan[i]?.item ||
        !list_pesanan[i]?.kuantitas ||
        !list_pesanan[i]?.harga_satuan
      ) {
        newInputErrors[i] = true;
        isValid = false;
      }
    }

    setInputErrors(newInputErrors); // Update state inputErrors
    return isValid;
  };
  const showData = () => {
    const isValid = validateData();
    if (isValid) {
      const rawData = {
        data_pemesan,
        list_pesanan,
        catatan,
      };
      resetValidation();
      setDataPesanan(rawData);
      navigation.navigate("Cek Data", {
        data_order: rawData,
        data_id: data_ordered.order_id,
      });
      console.log(rawData);
    } else {
      setAlertModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {data_pemesan && (
          <View style={styles.btnWrapper}>
            <NavBtn type="back" onPress={() => navigation.goBack()} />
          </View>
        )}
        <PageHeader
          headerTitle="Ubah Pesanan"
          subHeader="Silahkan ubah pesanan untuk"
          data={data_pemesan.nama_pemesan}
        />
      </View>
      <FinalTracker currentPage="dataPesanan" />
      <View style={{ gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.label}>Jumlah pesanan</Text>
          <InputCounter
            tambah={tambah}
            kurang={kurang}
            data={jumlah}
            secondary={true}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <MainButton
            title="Isi data pesanan"
            type="secondary"
            onPress={toggleModal}
          />
        </View>
        <TextBox
          label="Catatan pemesan"
          placeholder="Cth. Nasi nya banyakin ya bu..."
          data={catatan}
          onChange={setCatatan}
        />
        <View style={{ flexDirection: "row" }}>
          <MainButton title="Selanjutnya" type="primary" onPress={showData} />
        </View>
      </View>

      <DataModal
        toggle={toggleModal}
        isShow={showModal}
        jumlah={jumlah}
        handleData={handleSubmitOrders}
        currentData={data_ordered.list_pesanan}
      />

      <AlertModal
        title="Data pesanan anda belum lengkap!"
        subtitle="Lengkapi dulu data pesanan atau cek terlebih dahulu"
        btnTitle="Kembali"
        toggle={toggleAlertModal}
        isShow={showAlertModal}
        success={false}
      />
    </View>
  );
};

export default UbahPesanan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 75,
    paddingHorizontal: 26,
    position: "relative",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#101828",
  },
  btnWrapper: {
    position: "absolute",
    top: -40,
    left: 10,
  },
});
