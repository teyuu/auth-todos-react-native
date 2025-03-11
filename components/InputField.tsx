import { View, Text, TextInput } from 'react-native'
const InputField = ({ label, placeholder, value, onChangeText }: any) => {
  return (
    <View className="gap-3">
        <Text className="text-white uppercase text-lg font-semibold">{label}</Text>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#ccc"
          className="border border-gray-400 bg-transparent text-white px-4 py-4 rounded-md focus:border-emerald-400"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
  )
}
export default InputField