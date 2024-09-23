import { StatusBar } from "expo-status-bar";
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
} from "../../components";
import fonts from "../../utilities/fonts";

const DataPesanan = ({ navigation, route }) => {
  const [jumlah, setJumlah] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAlertModal, setAlertModal] = useState(false);
  const [inputErrors, setInputErrors] = useState([]);
  const [catatan, setCatatan] = useState("");
  const [list_pesanan, setListPesanan] = useState([]);
  const [savedOrders, setSavedOrders] = useState([]);
  const [dataPesanan, setDataPesanan] = useState({
    data_pemesan: "",
    list_pesanan: "",
    catatan: "",
  });

  const { data_pemesan } = route.params;

  useEffect(() => {
    console.log(dataPesanan);
  }, [dataPesanan]);

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
    console.log(totalPrice);
  };

  const tambah = () => {
    setJumlah(jumlah + 1);
  };

  const kurang = () => {
    if (jumlah <= 1) {
      setJumlah(1);
    } else {
      setJumlah(jumlah - 1);
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
      navigation.navigate("Cek Data Pesanan", { data_order: rawData });
      console.log(rawData);
    } else {
      toggleAlertModal();
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
          headerTitle="Buat Pesanan"
          subHeader="Silahkan isi pesanan untuk"
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
        currentData={savedOrders}
      />
      <AlertModal
        title="Data pesanan anda belum lengkap!"
        subtitle="Lengkapi dulu data pesanan"
        btnTitle="Kembali"
        toggle={toggleAlertModal}
        isShow={showAlertModal}
        success={false}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default DataPesanan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 75,
    paddingHorizontal: 26,
    position: "relative",
  },
  label: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#101828",
  },
  btnWrapper: {
    position: "absolute",
    top: -40,
    left: 10,
  },
});
