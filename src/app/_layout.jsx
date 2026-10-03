import { Stack } from "expo-router";
import UserProvider from "../providers/UserProvider";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: "Welcome" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Registration" }} />
        <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
        <Stack.Screen name="otp" options={{ title: "Otp Verification" }} />
      </Stack>
    </UserProvider>
  );
}
