import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/authService";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-black w-full h-full">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-2xl">Welcome, {user?.email}!</Text>
        <TouchableOpacity onPress={handleLogout} className="mt-5">
          <Text className="text-white text-lg bg-red-500 py-2 px-4 rounded-md">
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
