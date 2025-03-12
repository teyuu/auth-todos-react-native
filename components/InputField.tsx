import React from "react";
import { View, Text, TextInput } from "react-native";

const InputField = (({ label, placeholder, value, onChangeText, ...textInputProps }: any) => {
  return (
    <View >
      <Text className="mb-4 text-white uppercase text-lg font-semibold">
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        className="p-4 rounded-lg border-1 text-left text-white border-red-500"
        value={value}
        onChangeText={onChangeText}
        {...textInputProps}
        style={{ borderWidth: 1, borderColor: "#6b7280",}}
      />
    </View>
  );
});

export default InputField;

