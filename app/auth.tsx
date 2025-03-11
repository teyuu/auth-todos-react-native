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
    } catch (error: any) {
      console.error("Authentication error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loading && user) {
    return <Redirect href="/(home)" />;
  }

  return (
    <SafeAreaView className="bg-black w-full h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="w-full"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          {/* Header */}
          <View className="w-[80%] mb-5">
            <Text className="text-white text-center uppercase text-4xl font-bold">
              {isLogin ? "Sign In" : "Create a New Account"}
            </Text>
            <Text className="text-white text-lg text-center mt-6">
              {isLogin
                ? "Sign in to continue"
                : "Sign up to continue"}
            </Text>
          </View>

          {/* Form */}
          <View className="w-[80%] gap-6 mt-5">
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
                value={formData.confirmPassword}
                onChangeText={(text: string) =>
                  setFormData((prev) => ({ ...prev, confirmPassword: text }))
                }
                secureTextEntry
              />
            )}

            <TouchableOpacity
              onPress={handleAuth}
              disabled={isSubmitting}
              className={`bg-white py-3 rounded-md mt-3 ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              <Text className="text-black text-lg text-center font-medium">
                {isSubmitting ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text className="text-white text-center mt-4">
                {isLogin
                  ? "Don't have an account? Sign up here"
                  : "Already have an account? Sign in here"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Auth;
