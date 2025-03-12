// app/auth.tsx
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useRouter } from "expo-router";
import InputField from "@/components/InputField";
import { signUp, signIn } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";
import { FormData } from "@/types/auth";

const Auth = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all required fields");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Invalid email format");
      return false;
    }

    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return false;
    }

    if (!isLogin) {
      if (!formData.name) {
        Alert.alert("Error", "Please enter your name");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleAuth = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        router.replace("/(home)");
      } else {
        await signUp(formData.email, formData.password);
        router.replace("/(home)");
      }
    } catch (error) {
      Alert.alert("Error", "Invalid credentials");
    } finally {
      setIsSubmitting(false);
      Keyboard.dismiss(); 
    }
  };

  if (!loading && user) {
    return <Redirect href="/(home)" />;
  }

  return (
    <SafeAreaView className="bg-gray-900 w-full h-full">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        {/* Header */}
        <View className="w-[85%] mb-8">
          <Text className="text-white text-3xl font-bold tracking-tight text-center">
            {isLogin ? "Welcome Back" : "Join Us"}
          </Text>
          <Text className="text-gray-400 text-lg text-center mt-2">
            {isLogin ? "Sign in to manage your todos" : "Create an account to get started"}
          </Text>
        </View>

        {/* Form */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Adjust offset for Android
          className="w-[85%]"
        >
          <View className="bg-gray-800 rounded-xl p-5 shadow-lg gap-4">
            {!isLogin && (
              <InputField
                label="Name"
                placeholder="Enter your name"
                value={formData.name}
                onChangeText={(text: string) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
              />
            )}
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text: string) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(text: string) =>
                setFormData((prev) => ({ ...prev, password: text }))
              }
              secureTextEntry
            />
            {!isLogin && (
              <InputField
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword!}
                onChangeText={(text: string) =>
                  setFormData((prev) => ({ ...prev, confirmPassword: text }))
                }
                secureTextEntry
              />
            )}

            <TouchableOpacity
              onPress={handleAuth}
              disabled={isSubmitting}
              className={`bg-indigo-600 py-3 rounded-lg shadow-md mt-2 ${
                isSubmitting ? "opacity-50" : "active:bg-indigo-700"
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isSubmitting ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text className="text-gray-400 text-center mt-2">
                {isLogin
                  ? "Need an account? Sign up here"
                  : "Already registered? Sign in here"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;