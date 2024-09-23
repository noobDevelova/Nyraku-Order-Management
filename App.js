import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Loading } from "./src/components";
import { FIREBASE_AUTH } from "./src/config/FIREBASE";
import { handleUserLastLogin } from "./src/config/updateUserLastLogin";
import { useGetAllUserData } from "./src/config/useGetAllUserData";
import { useGetUserData } from "./src/config/userDataManager";
import { useGetDataOrder } from "./src/config/userGetDataOrder";
import { useGetHistoryOrder } from "./src/config/userGetHistoryOrder";
import { LoggedOut } from "./src/router/index.";
import LoggedIn from "./src/router/isLoggedIn";

export default function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [orderList, setOrderList] = useState(null);
  const [historyList, setHistoryList] = useState(null);
  const [users, setUsers] = useState(null);
  const [getDataLoad, setDataLoad] = useState(false);
  const [isFontLoaded, setFontLoaded] = useState(false);

  const updateOrderList = (data) => {
    setOrderList(data);
  };

  const updateHistoryList = (data) => {
    setHistoryList(data);
  };

  const updateUsersList = (data) => {
    setUsers(data);
  };
  const { getUserData } = useGetUserData();
  const { fetchData, subscribeToData } = useGetDataOrder(updateOrderList);
  const { fetchHistory, subscribeToHistory } =
    useGetHistoryOrder(updateHistoryList);
  const { fetchUsers, subscribeToUsers } = useGetAllUserData(updateUsersList);
  const { updateUserLastLogin } = handleUserLastLogin();
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Mulish-Regular": require("./src/assets/fonts/Mulish-Regular.ttf"),
        "Mulish-Medium": require("./src/assets/fonts/Mulish-Medium.ttf"),
        "Mulish-SemiBold": require("./src/assets/fonts/Mulish-SemiBold.ttf"),
        "Mulish-Bold": require("./src/assets/fonts/Mulish-Bold.ttf"),
        "Mulish-ExtraBold": require("./src/assets/fonts/Mulish-ExtraBold.ttf"),
      });
      setFontLoaded(true);
    };

    loadFonts();

    const fetchDataAndSubscribe = async () => {
      try {
        setDataLoad(true);
        const list = await fetchData();
        setOrderList(list);
        subscribeToData();
      } catch (error) {
        console.log("Gagal saat mengambil data pesanan", error);
        setDataLoad(false);
      }
    };

    const fetchDataHistory = async () => {
      try {
        setDataLoad(true);
        const history = await fetchHistory();
        setHistoryList(history);
        subscribeToHistory();
      } catch (error) {
        console.log("Gagal saat mengambil data history", error);
        setDataLoad(false);
      }
    };

    const fetchAllUsersData = async () => {
      try {
        setDataLoad(true);
        const users = await fetchUsers();
        setUsers(users);
        subscribeToUsers();
      } catch (error) {
        console.log("Gagal mengambil data users", error);
        setDataLoad(false);
      }
    };

    const handleAuthChange = async (user) => {
      setUser(user);
      if (user) {
        setDataLoad(true);
        try {
          const dataUser = await getUserData(user.uid);
          setUserData(dataUser);
          fetchDataAndSubscribe();
          fetchDataHistory();
          fetchAllUsersData();
          updateUserLastLogin(user.uid);
        } catch (error) {
          console.log("Error saat login", error);
        } finally {
          setDataLoad(false);
        }
      } else {
        setUserData(null);
      }
    };

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, handleAuthChange);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <NavigationContainer>
      {getDataLoad ? (
        <Loading />
      ) : user ? (
        <LoggedIn
          userData={userData}
          orderList={orderList}
          historyList={historyList}
          usersList={users}
        />
      ) : !isFontLoaded ? (
        <Loading />
      ) : (
        <LoggedOut />
      )}
    </NavigationContainer>
  );
}
