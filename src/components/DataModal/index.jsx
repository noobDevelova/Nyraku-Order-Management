import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import Danger from "../../assets/icon/alert-circle.svg";
import DocumentIcon from "../../assets/icon/documenttext.svg";
import fonts from "../../utilities/fonts";
import DataInputModal from "../DataInputModal";
import MainButton from "../MainButton";

const ModalHeader = ({ title, subTitle, icon }) => {
  return (
    <View style={styles.modalHeader}>
      <DocumentIcon />
      <View>
        <Text style={{ fontSize: 18, fontWeight: "500", color: "#101828" }}>
          {title}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "400", color: "#667085" }}>
          {subTitle}
        </Text>
      </View>
    </View>
  );
};

const ErrorMsg = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 10,
      }}
    >
      <Image source={danger} />
      <Text style={{ fontSize: 14, color: "#F04438", fontWeight: "500" }}>
        Mohon isi data pesanan dengan lengkap!
      </Text>
    </View>
  );
};

const OrderInput = ({
  onSubmit,
  counter,
  toggle,
  savedOrders,
  setSavedOrders,
}) => {
  const [orders, setOrders] = useState([]);
  const [inputErrors, setInputErrors] = useState([]);

  useEffect(() => {
    setOrders(savedOrders);
    setInputErrors(Array(counter).fill(false));
  }, [savedOrders, counter]);

  const formatPrice = (number) => {
    const formattedNumber = number.toLocaleString("id-ID");
    return formattedNumber.replace(/,/g, ".");
  };

  const handleItemChange = (index, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index] = { ...updatedOrders[index], item: value };
    setOrders(updatedOrders);
  };

  const handleQuantityChange = (index, value) => {
    const makeNum = parseFloat(value);

    if (!isNaN(makeNum) || value === "") {
      const updatedOrders = [...orders];
      updatedOrders[index] = { ...updatedOrders[index], kuantitas: value };
      setOrders(updatedOrders);
    }
  };

  const handlePriceChange = (index, value) => {
    const cleanedValue = value.replace(/[.,]/g, ""); // Menghapus karakter pemisah ribuan

    // Memeriksa apakah angka valid atau NaN
    let updatedPrice = "";

    if (cleanedValue !== "") {
      const price = parseFloat(cleanedValue);
      if (!isNaN(price)) {
        updatedPrice = formatPrice(price);
      }
    }

    const updatedOrders = [...orders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      harga_satuan: updatedPrice,
    };
    setOrders(updatedOrders);
  };

  const validateInput = () => {
    let isValid = true;
    const newInputErrors = Array(counter).fill(false);

    for (let i = 0; i < counter; i++) {
      if (
        !orders[i] ||
        !orders[i]?.item ||
        !orders[i]?.kuantitas ||
        !orders[i]?.harga_satuan
      ) {
        newInputErrors[i] = true;
        isValid = false;
      }
    }

    setInputErrors(newInputErrors); // Update state inputErrors
    return isValid;
  };
  const resetForm = () => {
    setOrders([]); // Reset state orders
    setInputErrors([]); // Reset state inputErrors
  };

  const handleSubmit = () => {
    const isValid = validateInput();
    if (isValid) {
      onSubmit(orders);
      setSavedOrders(orders);
      console.log("Tersimpan: ", orders);
      resetForm();
      toggle();
    }
  };

  const toggleModal = () => {
    setOrders(savedOrders);
    toggle();
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < counter; i++) {
      inputs.push(
        <View key={i} style={styles.inputWrapper}>
          <Text style={styles.dataHeader}>Pesanan {i + 1}</Text>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={{ flex: 3 }}>
              <DataInputModal
                label="Item"
                placeholder="Item"
                data={orders[i]?.item}
                onChange={(value) => handleItemChange(i, value)}
              />
            </View>
            <View style={{ flex: 2 }}>
              <DataInputModal
                label="Kuantitas"
                placeholder="20"
                data={orders[i]?.kuantitas}
                onChange={(value) => handleQuantityChange(i, value)}
                type="numeric"
              />
            </View>
          </View>
          <DataInputModal
            label="Harga Satuan"
            placeholder="20"
            data={orders[i]?.harga_satuan}
            onChange={(value) => handlePriceChange(i, value)}
            mode="rp"
            type="numeric"
          />
          {inputErrors[i] && (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Danger />
              <Text style={{ fontSize: 15, color: "#F04438" }}>
                Mohon lengkapi data pesanan ini!
              </Text>
            </View>
          )}
        </View>
      );
    }
    return inputs;
  };

  return (
    <View>
      <View style={styles.inputContainer}>{renderInputs()}</View>
      {/* {error && <ErrorMsg />} */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginTop: 18,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <MainButton type="secondary" title="Kembali" onPress={toggleModal} />
        <MainButton type="primary" title="Simpan" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const DataModal = ({ toggle, isShow, jumlah, handleData, currentData }) => {
  const [initialOrders, setInitialOrders] = useState(currentData);

  useEffect(() => {
    setInitialOrders(currentData);
  }, [currentData]);

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isShow}>
        <View style={styles.modalBox}>
          <View style={{ marginBottom: 18 }}>
            <ModalHeader
              title="Input data pesanan"
              subTitle="Isi data pesanan untuk pemesan"
            />
          </View>
          <ScrollView style={{ maxHeight: "90%" }}>
            <KeyboardAwareScrollView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              contentContainerStyle={styles.contentContainer}
            >
              <OrderInput
                onSubmit={handleData}
                counter={jumlah}
                toggle={toggle}
                savedOrders={initialOrders}
                setSavedOrders={setInitialOrders}
              />
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DataModal;

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
    flexDirection: "row",
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
});
