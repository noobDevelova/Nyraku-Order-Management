import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CardFrame, NavigationBar } from "../../components";
import fonts from "../../utilities/fonts";

const ListPesanan = ({ orderList, userData }) => {
  useEffect(() => {
    console.log(orderList);
  }, [orderList]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>List Pesanan</Text>
        <Text style={styles.subTitle}>
          Daftar pesanan anda yang belum selesai
        </Text>
      </View>
      {orderList.length === 0 && (
        <View style={styles.notif}>
          <Text style={styles.listFalse}>Tidak ada pesanan saat ini</Text>
        </View>
      )}
      {orderList.length > 0 && (
        <ScrollView>
          <View style={styles.cardWrapper}>
            {orderList.map((item, index) => (
              <View key={index}>
                <CardFrame
                  alamat={item.alamat}
                  nama={item.nama_pemesan}
                  tanggal={item.tanggal_pesanan}
                  waktu={item.waktu_pesanan}
                  status={item.status}
                  item={item.list_pesanan}
                  data={item}
                  type="list"
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      <NavigationBar role={userData.role} />
    </View>
  );
};

export default ListPesanan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 11,
  },
  title: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.semiBold,
    color: "#000000",
  },
  subTitle: {
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
    color: "#98A2B3",
  },
  cardWrapper: {
    marginTop: 10,
    gap: 12,
    paddingBottom: 100,
  },
  listFalse: {
    textAlign: "center",
    fontSize: fonts.size.font16,
    fontFamily: fonts.fontFamily.regular,
    color: "#101828",
  },
  notif: {
    marginTop: 100,
    padding: 20,
    backgroundColor: "#F2F4F7",
    borderRadius: 10,
  },
});
