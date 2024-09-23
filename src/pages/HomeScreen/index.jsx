import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BellBtn,
  CardFrame,
  Hero,
  HomeHeader,
  NavCard,
  NavigationBar,
} from "../../components";
import fonts from "../../utilities/fonts";
import { getCurrentTime } from "../../utilities/getCurrentTime";

const HomeScreen = ({ userData, navigation, orderList }) => {
  const time = getCurrentTime();
  const orderLength = orderList ? orderList.length : 0;

  const latestOrder = orderList ? orderList[0] : null;

  useEffect(() => {
    console.log(orderList);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.headerWrapper}>
          {userData && <HomeHeader nama={userData.username} time={time} />}
          {/* <BellBtn /> */}
        </View>
        <View style={styles.heroWrapper}>
          <Hero dataLength={orderLength} isAvailable={orderLength > 0} />
        </View>
        <View style={styles.cardWrapper}>
          <NavCard />
        </View>
        <View style={styles.latestOrderSection}>
          <Text style={styles.latestTitle}>Pesanan terbaru</Text>
          {latestOrder && (
            <CardFrame
              alamat={latestOrder.alamat}
              nama={latestOrder.nama_pemesan}
              tanggal={latestOrder.tanggal_pesanan}
              waktu={latestOrder.waktu_pesanan}
              status={latestOrder.status}
              item={latestOrder.list_pesanan}
              data={latestOrder}
              type="list"
            />
          )}
        </View>
      </ScrollView>
      {userData && <NavigationBar role={userData.role} />}
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 25,
    backgroundColor: "#fff",
  },
  headerWrapper: {
    marginBottom: 5,
  },
  heroWrapper: {
    marginVertical: 10,
  },
  cardWrapper: {
    marginTop: 10,
  },
  latestOrderSection: {
    marginTop: 10,
    marginBottom: 70,
  },
  latestTitle: {
    fontSize: fonts.size.font18,
    fontFamily: fonts.fontFamily.semiBold,
    marginBottom: 10,
  },
});
