import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  DatePick,
  FinalTracker,
  InputData,
  MainButton,
  NavBtn,
  PageHeader,
} from "../../components";

const DataPemesan = ({ navigation }) => {
  const [nama_pemesan, setNamaPemesan] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tanggal_pesanan, setTanggalPesanan] = useState("");
  const [waktu_pesanan, setWaktuPesanan] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [data_pemesan, setDataPemesan] = useState({
    nama_pemesan: "",
    no_telp: "",
    alamat: "",
    tanggal_pesanan: "",
    waktu_pesanan: "",
  });
  const [errors, setErrors] = useState({
    nama_pemesan: false,
    no_telp: false,
    alamat: false,
    tanggal_pesanan: false,
    waktu_pesanan: false,
  });

  useEffect(() => {
    console.log(data_pemesan);
  }, [data_pemesan]);

  const formatDate = (rawDate) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(rawDate);
    return date.toLocaleDateString("id-ID", options);
  };
  function formatLocalTime(rawTime) {
    const date = new Date(rawTime);
    const hour = date.getHours();

    let period;
    if (hour >= 0 && hour < 6) {
      period = "Pagi";
    } else if (hour >= 6 && hour < 12) {
      period = "Siang";
    } else if (hour >= 12 && hour < 18) {
      period = "Sore";
    } else {
      period = "Malam";
    }

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    return `${formattedTime}, ${period}`;
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleTimePicker = () => {
    setTimePicker(!timePicker);
  };

  const onChangePicker = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        if (showPicker) {
          toggleDatePicker();
          setTanggalPesanan(formatDate(currentDate));
        }
        if (timePicker) {
          toggleTimePicker();
          setWaktuPesanan(formatLocalTime(currentDate));
        }
      }
    } else {
      setShowPicker(false);
      setTimePicker(false);
    }
  };

  const confirmIOSDate = () => {
    setTanggalPesanan(formatDate(date));
    toggleDatePicker();
  };
  const confirmIOSTime = () => {
    setWaktuPesanan(formatLocalTime(date));
    toggleTimePicker();
  };

  const validateInput = () => {
    const newErrors = {};

    Object.keys(errors).forEach((key) => {
      if (key === "nama_pemesan" && nama_pemesan === "") {
        newErrors.nama_pemesan = true;
      }
      if (key === "no_telp" && no_telp === "") {
        newErrors.no_telp = true;
      }
      if (key === "alamat" && alamat === "") {
        newErrors.alamat = true;
      }
      if (key === "tanggal_pesanan" && tanggal_pesanan === "") {
        newErrors.tanggal_pesanan = true;
      }
      if (key === "waktu_pesanan" && waktu_pesanan === "") {
        newErrors.waktu_pesanan = true;
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitData = () => {
    const isValid = validateInput();
    if (isValid) {
      const rawData = {
        nama_pemesan,
        alamat,
        no_telp,
        tanggal_pesanan,
        waktu_pesanan,
      };
      setDataPemesan(rawData);
      navigation.navigate("Data Pesanan", { data_pemesan: rawData });
    }
  };

  return (
    <ScrollView bounces={false} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.btnBack}>
          <NavBtn type="back" onPress={() => navigation.navigate("Home")} />
        </View>
        <PageHeader
          headerTitle="Buat Pesanan"
          subHeader="Masukkan data pemesan"
        />
      </View>
      <FinalTracker currentPage="dataPemesan" />
      <View style={styles.inputWrapper}>
        <InputData
          label="Pemesan"
          placeholder="Nama Pemesan"
          value={nama_pemesan}
          setData={setNamaPemesan}
          errorState={errors.nama_pemesan}
          name="Nama Pemesan"
        />
        <InputData
          label="No Telp"
          placeholder="+08......"
          value={no_telp}
          setData={setNoTelp}
          errorState={errors.no_telp}
          name="No Telp"
        />
        <InputData
          label="Alamat Pemesan"
          placeholder="Alamat"
          value={alamat}
          setData={setAlamat}
          errorState={errors.alamat}
          name="Alamat pemesan"
        />
        <DatePick
          label="Tentukan Tanggal Pesanan"
          placeholder="Kamis, 2 April 2023"
          date={date}
          onChange={onChangePicker}
          showPicker={showPicker}
          toggle={toggleDatePicker}
          setData={setTanggalPesanan}
          data={tanggal_pesanan}
          platform={Platform}
          onIos={confirmIOSDate}
          errorState={errors.tanggal_pesanan}
          name="Tanggal pesanan"
          mode="date"
        />
        <DatePick
          label="Tentukan Waktu Pesanan"
          placeholder="10:20 Pagi"
          date={date}
          onChange={onChangePicker}
          showPicker={timePicker}
          toggle={toggleTimePicker}
          setData={setWaktuPesanan}
          data={waktu_pesanan}
          platform={Platform}
          onIos={confirmIOSTime}
          errorState={errors.waktu_pesanan}
          name="Waktu pesanan"
          mode="time"
        />
      </View>
      <View style={styles.btnWrapper}>
        <MainButton title="Selanjutnya" type="primary" onPress={submitData} />
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

export default DataPemesan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 75,
    backgroundColor: "#ffffff",
  },
  inputWrapper: {
    marginTop: 23,
    gap: 8,
  },
  btnWrapper: {
    marginVertical: 20,
    paddingBottom: 100,
    flexDirection: "row",
  },
  btnBack: {
    position: "absolute",
    top: -40,
    left: 10,
  },
});
