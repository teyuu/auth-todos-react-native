import "./global.css";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthProvider";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" options={{ title: "Auth" }} />
        </Stack>
      </AuthProvider>
    </>
  );

}
