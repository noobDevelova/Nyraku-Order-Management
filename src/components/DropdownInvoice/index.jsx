import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Bca from "../../assets/icon/bca-icon.svg";
import Close from "../../assets/icon/dropdown-down.svg";
import Open from "../../assets/icon/dropdown-up.svg";
import fonts from "../../utilities/fonts";
import withDropdown from "../../utilities/withDropdown";

const Dropdown = ({
  toggle,
  show,
  type,
  total,
  listData,
  nama,
  noTelp,
  alamat,
  catatan,
  alasan,
  status,
}) => {
  return (
    <View style={styles.container}>
      {type === "total" && (
        <View
          style={[
            styles.dropdownHeaderTotal,
            status === "Dibatalkan" ? styles.error : styles.success,
          ]}
        >
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.headerTitleTotal}>Total Harga</Text>
            </View>
            <View style={styles.btnWrapper}>
              <Text style={styles.value}>Rp{total}</Text>
              <TouchableOpacity onPress={toggle}>
                {show ? (
                  <Open width={15} height={15} />
                ) : (
                  <Close width={15} height={15} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {type === "detail" && (
        <View style={styles.dropdownHeader}>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.headerTitle}>Detail Pemesan</Text>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity onPress={toggle}>
                {show ? (
                  <Open width={15} height={15} />
                ) : (
                  <Close width={15} height={15} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {type === "note" && (
        <View style={styles.dropdownHeader}>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.headerTitle}>Catatan Tambahan</Text>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity onPress={toggle}>
                {show ? (
                  <Open width={15} height={15} />
                ) : (
                  <Close width={15} height={15} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {type === "Dibatalkan" && (
        <View style={styles.dropdownHeader}>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.headerTitle}>Alasan Dibatalkan</Text>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity onPress={toggle}>
                {show ? (
                  <Open width={15} height={15} />
                ) : (
                  <Close width={15} height={15} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {type === "rekening" && (
        <View style={styles.dropdownHeader}>
          <View style={styles.wrapper}>
            <View>
              <Text style={styles.headerTitle}>Transfer Bank</Text>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity onPress={toggle}>
                {!show ? (
                  <Open width={15} height={15} />
                ) : (
                  <Close width={15} height={15} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {type === "total" && show && (
        <View>
          {listData.map((item, index) => (
            <View key={index}>
              <View style={styles.listWrapper}>
                <View style={styles.listItem}>
                  <Text style={styles.label}>Pesanan {index + 1}</Text>
                  <Text style={styles.itemValue}>{item.item}</Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.label}>Kuantitas</Text>
                  <Text style={styles.itemValue}>{item.kuantitas} Pcs</Text>
                </View>
                <View style={styles.listItem}>
                  <Text style={styles.label}>Harga Satuan</Text>
                  <Text style={styles.itemValue}>Rp. {item.harga_satuan}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
      {type === "detail" && show && (
        <View style={styles.listWrapper}>
          <View style={styles.listItem}>
            <Text style={styles.label}>Nama</Text>
            <Text style={styles.itemValue}>{nama}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>No Telp</Text>
            <Text style={styles.itemValue}>{noTelp}</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.label}>Alamat</Text>
            <Text style={styles.itemValue}>{alamat}</Text>
          </View>
        </View>
      )}
      {type === "note" && show && (
        <View style={styles.listWrapper}>
          <View style={styles.listItem}>
            <Text style={styles.label}>{catatan}</Text>
          </View>
        </View>
      )}
      {type === "Dibatalkan" && show && (
        <View style={styles.listWrapper}>
          <View style={styles.listItem}>
            <Text style={styles.label}>{alasan}</Text>
          </View>
        </View>
      )}
      {type === "rekening" && !show && (
        <View style={styles.rekWrapper}>
          <Bca />
          <Text style={styles.valueItem}>77832667 An. Randi Risdiansyah</Text>
        </View>
      )}
    </View>
  );
};

export default withDropdown(Dropdown);

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginVertical: 5,
  },
  dropdownHeaderTotal: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  success: {
    backgroundColor: "#D1FADF",
  },
  error: {
    backgroundColor: "#F97066",
  },
  dropdownHeader: {
    paddingVertical: 5,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  headerTitleTotal: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 20,
  },
  headerTitle: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.medium,
    lineHeight: 20,
  },
  value: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.semiBold,
  },
  listWrapper: {
    gap: 2,
    paddingHorizontal: 5,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#667085",
  },
  valueItem: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
    color: "#1D2939",
  },
  rekWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
