import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AdminPanel,
  CekDataPesanan,
  CekUbahPesanan,
  CheckoutData,
  CreateKaryawan,
  DataPemesan,
  DataPesanan,
  Histori,
  HomeScreen,
  Invoice,
  ListCheckout,
  ListPesanan,
  ManageUsers,
  Profile,
  UbahPemesan,
  UbahPesanan,
  UsersProfile,
} from "../../pages";
import { getDateTimeFromFormattedString } from "../../utilities/sortingTime";

const Stack = createNativeStackNavigator();

const LoggedIn = ({ userData, orderList, historyList, usersList }) => {
  const orderFix = orderList
    ? orderList
        .slice(1)
        .slice()
        .sort((a, b) => {
          const dateA = new Date(
            getDateTimeFromFormattedString(a.pesanan_dibuat)
          );
          const dateB = new Date(
            getDateTimeFromFormattedString(b.pesanan_dibuat)
          );
          return dateB - dateA;
        })
    : null;

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => (
          <HomeScreen {...props} userData={userData} orderList={orderFix} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile" options={{ headerShown: false }}>
        {(props) => <Profile {...props} userData={userData} />}
      </Stack.Screen>
      <Stack.Screen
        name="Data Pemesan"
        component={DataPemesan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Data Pesanan"
        component={DataPesanan}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cek Data Pesanan" options={{ headerShown: false }}>
        {(props) => <CekDataPesanan {...props} userData={userData} />}
      </Stack.Screen>
      <Stack.Screen
        name="Invoice"
        component={Invoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Admin" options={{ headerShown: false }}>
        {(props) => <AdminPanel {...props} userData={userData} />}
      </Stack.Screen>
      <Stack.Screen
        name="Buat Akun Karyawan"
        component={CreateKaryawan}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="List Pesanan" options={{ headerShown: false }}>
        {(props) => (
          <ListPesanan {...props} userData={userData} orderList={orderFix} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Ubah Pemesan"
        component={UbahPemesan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ubah Pesanan"
        component={UbahPesanan}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profil User" options={{ headerShown: false }}>
        {(props) => <UsersProfile {...props} userData={userData} />}
      </Stack.Screen>
      <Stack.Screen name="Cek Data" options={{ headerShown: false }}>
        {(props) => (
          <CekUbahPesanan {...props} userData={userData} orderList={orderFix} />
        )}
      </Stack.Screen>
      <Stack.Screen name="List Checkout" options={{ headerShown: false }}>
        {(props) => (
          <ListCheckout {...props} userData={userData} orderList={orderFix} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Checkout Order" options={{ headerShown: false }}>
        {(props) => (
          <CheckoutData {...props} userData={userData} orderList={orderFix} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Histori Pesanan" options={{ headerShown: false }}>
        {(props) => (
          <Histori {...props} userData={userData} historyList={historyList} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Kelola" options={{ headerShown: false }}>
        {(props) => (
          <ManageUsers {...props} userData={userData} usersList={usersList} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default LoggedIn;
