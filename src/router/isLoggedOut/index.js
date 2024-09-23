import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ForgotPassword, Loader, Login } from "../../pages";

const Stack = createNativeStackNavigator();

const LoggedOut = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Choose"
        component={Loader}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LoggedOut;
