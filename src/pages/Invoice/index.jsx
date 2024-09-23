import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Archive from "../../assets/icon/archive.svg";
import Ig from "../../assets/icon/ig-icon.svg";
import Paper from "../../assets/icon/paper.svg";
import Wa from "../../assets/icon/wa-icon.svg";
import {
  Dropdown,
  InvoiceHeader,
  LabelBox,
  ReceiptBtn,
} from "../../components";
import fonts from "../../utilities/fonts";
import { captureInvoiceHandler } from "../../utilities/invoiceHandler";
import matrics from "../../utilities/screenDimensions";
import { shareInvoiceHandler } from "../../utilities/shareInvoiceHandler";
const Invoice = ({ navigation, route }) => {
  const [snapshotImg, setSnapShotImg] = useState(null);
  const captureComponent = useRef(null);
  const { captureInvoice } = captureInvoiceHandler();
  const { shareInvoice } = shareInvoiceHandler();
  const { data_ordered } = route.params;

  const backToBefore = () => {
    navigation.navigate("Home");
  };

  const capture = async () => {
    try {
      const resultImg = await captureInvoice(captureComponent, setSnapShotImg);
      await shareInvoice(resultImg, data_ordered.nama_pemesan);
      console.log(resultImg);
    } catch (error) {
      console.log("Gagal ss invoice", error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerWrapper,
          data_ordered.status === "Dibatalkan" ? styles.error : styles.success,
        ]}
      >
        <InvoiceHeader onPress={backToBefore} />
      </View>
      <ScrollView bounces={false}>
        <View ref={captureComponent} style={{ paddingBottom: 20 }}>
          <View
            style={[
              styles.topSection,
              data_ordered.status === "Dibatalkan"
                ? styles.error
                : styles.success,
            ]}
          >
            <Text style={styles.invoiceTitle}>
              Pesanan {data_ordered.status}!
            </Text>
            <View style={styles.panel}>
              <View style={styles.paper}>
                <View style={styles.paperHeader}>
                  <Paper
                    style={{ alignSelf: "center" }}
                    width={125}
                    height={125}
                  />
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    {data_ordered.waktu_checkout ? (
                      <Text style={styles.id}>
                        {data_ordered.waktu_checkout}
                      </Text>
                    ) : (
                      <Text style={styles.id}>
                        {data_ordered.pesanan_dibuat}
                      </Text>
                    )}
                    <Text style={styles.id}>ID {data_ordered.order_id}</Text>
                  </View>
                </View>
                <View style={styles.dashed} />
              </View>
            </View>
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.bottomPaper}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
                >
                  <Archive />
                  <Text style={styles.id}>Pesanan {data_ordered.status}!</Text>
                </View>
                <Text>Admin, {data_ordered.by_admin}</Text>
              </View>
              <LabelBox
                state={data_ordered.isSelesai}
                name={data_ordered.nama_pemesan}
                status={data_ordered.status}
              />
              <Dropdown
                type="total"
                total={data_ordered.total_harga}
                listData={data_ordered.list_pesanan}
                status={data_ordered.status}
              />
              <View style={styles.line} />
              <Dropdown
                type="detail"
                nama={data_ordered.nama_pemesan}
                noTelp={data_ordered.no_telp}
                alamat={data_ordered.alamat}
              />
              <Dropdown type="note" catatan={data_ordered.catatan} />
              {data_ordered.alasan_dibatalkan && (
                <Dropdown
                  type={data_ordered.status}
                  alasan={data_ordered.alasan_dibatalkan}
                />
              )}
              <View style={styles.line} />
              {!data_ordered.isSelesai && <Dropdown type="rekening" />}
              <View style={styles.desc}>
                <Text style={styles.descItem}>Nyra Cook & Pastry</Text>
                <Text style={styles.descItem}>Depok, Jawa Barat</Text>
                <Text style={styles.descItem}>Sukmajaya, -16412</Text>
                <Text style={styles.descItem}>
                  Pondok Sukmajaya Permai Blok G5 no. 16
                </Text>
              </View>
              <View style={styles.contactWrapper}>
                <View style={styles.contact}>
                  <Wa width={20} height={20} />
                  <Text>081315077710</Text>
                </View>
                <View style={styles.contact}>
                  <Ig width={20} height={20} />
                  <Text>nyracooknpastry</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 10 }}>
        <ReceiptBtn title="Cetak Nota" onPress={capture} />
      </View>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  invoiceTitle: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.bold,
    textAlign: "center",
    color: "#fff",
  },
  ssImage: {
    width: matrics.screenWidth,
    height: matrics.screenHeight,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  success: {
    backgroundColor: "#32D583",
  },
  error: {
    backgroundColor: "#D92D20",
  },
  panel: {
    paddingTop: 160,
    position: "relative",
    marginTop: 30,
  },
  paper: {
    backgroundColor: "#FCFCFD",
    paddingHorizontal: 15,
    position: "absolute",
    width: "100%",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#D0D5DD",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
  },
  paperHeader: {
    paddingTop: 17,
    paddingBottom: 6,
    gap: 10,
  },
  id: {
    color: "#667085",
    fontFamily: fonts.fontFamily.medium,
  },
  topSection: {
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  bottomSection: {
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  dashed: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#98A2B3",
  },
  bottomPaper: {
    paddingHorizontal: 15,
    backgroundColor: "#FCFCFD",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#D0D5DD",
    borderBottomWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingTop: 6,
    paddingBottom: 17,
  },
  custName: {
    marginTop: 15,
    color: "#101828",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
    lineHeight: 20,
  },
  line: {
    borderWidth: 1,
    borderColor: "#98A2B3",
    marginTop: 5,
  },
  desc: {
    marginTop: 10,
  },
  descItem: {
    color: "#98A2B3",
    fontSize: fonts.size.font12,
    fontFamily: fonts.fontFamily.regular,
  },
  contactWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  contact: {
    flexDirection: "row",
    gap: 5,
  },
});
