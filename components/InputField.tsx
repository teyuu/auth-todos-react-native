import React from "react";
import { View, Text, TextInput } from "react-native";

const InputField = (({ label, placeholder, value, onChangeText, ...textInputProps }: any) => {
  return (
    <View className="gap-3">
      <Text className="text-white uppercase text-lg font-semibold">
        {label}
      </Text>
      <TextInput

        placeholder={placeholder}
        placeholderTextColor="#ccc"
        className={`p-5 rounded-lg border bg-gray-700 border-gray-600 text-white`}
        value={value}
        onChangeText={onChangeText}
        {...textInputProps}
      />
    </View>
  );
});

export default InputField;

