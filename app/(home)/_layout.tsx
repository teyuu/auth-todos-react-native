import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeLayout() {
  const {loading, user} = useAuth()

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  
  if (!user) {
    return <Redirect href="/auth" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
    </Stack>
  );
}
