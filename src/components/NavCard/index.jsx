import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Bag from "../../assets/icon/Bag.svg";
import Buy from "../../assets/icon/Buy.svg";
import Doc from "../../assets/icon/Document.svg";
import Paper from "../../assets/icon/Paper-Plus.svg";
import fonts from "../../utilities/fonts";
import matrics from "../../utilities/screenDimensions";
const NavCard = () => {
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Apa yang ingin anda lakukan hari ini?</Text>
      <View style={styles.cardWrapper}>
        <View style={styles.wrapper}>
          {/* Link to tambah pesanan */}
          <TouchableOpacity onPress={() => nav.navigate("Data Pemesan")}>
            <LinearGradient
              style={styles.cardContainer}
              colors={["#7569DE", "#2E1FAF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardContent}>
                <Paper width={30} height={30} />
                <Text style={styles.cardTitle}>Tambah</Text>
                <Text style={styles.cardSubTitle}>Tambahkan pesanan baru</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Link to history */}
          <TouchableOpacity onPress={() => nav.navigate("Histori Pesanan")}>
            <LinearGradient
              style={styles.cardContainer}
              colors={["#7569DE", "#2E1FAF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardContent}>
                <Doc width={30} height={30} />
                <Text style={styles.cardTitle}>Histori</Text>
                <Text style={styles.cardSubTitle}>Lihat histori pesanan</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          {/* Link to checkout*/}
          <TouchableOpacity onPress={() => nav.navigate("List Checkout")}>
            <LinearGradient
              style={styles.cardContainer}
              colors={["#7569DE", "#2E1FAF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardContent}>
                <Bag width={30} height={30} />
                <Text style={styles.cardTitle}>Checkout</Text>
                <Text style={styles.cardSubTitle}>Selesaikan pesanan </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          {/* Link to pesanan */}
          <TouchableOpacity onPress={() => nav.navigate("List Pesanan")}>
            <LinearGradient
              style={styles.cardContainer}
              colors={["#7569DE", "#2E1FAF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardContent}>
                <Buy width={30} height={30} />
                <Text style={styles.cardTitle}>Pesanan</Text>
                <Text style={styles.cardSubTitle}>
                  Lihat pesanan yang sedang di proses
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NavCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  cardWrapper: {
    gap: 10,
    flexDirection: "column",
  },
  container: {
    gap: 13,
  },
  heading: {
    fontFamily: fonts.fontFamily.semiBold,
    fontSize: fonts.size.font18,
  },
  cardContainer: {
    width: matrics.width * 0.4,
    height: matrics.height * 0.2,
    padding: 10,
    borderRadius: 12,
  },
  cardContent: {
    gap: 10,
  },
  cardTitle: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.bold,
    color: "#fff",
  },
  cardSubTitle: {
    color: "#fff",
    fontSize: fonts.size.font14,
    fontFamily: fonts.fontFamily.regular,
  },
});
