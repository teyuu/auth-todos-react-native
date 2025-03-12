// app/(home)/index.tsx
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import {
  createTodo,
  getTodos,
  toggleTodo,
  deleteTodo,
} from "@/services/todoService";
import { Todo } from "@/types/todo";
import InputField from "@/components/InputField";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      const userTodos = await getTodos(user!.uid);
      setTodos(userTodos);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch todos");
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return Alert.alert("This field can't be empty :)");
    try {
      const todoId = await createTodo(newTodo, user!.uid);
      setTodos([
        ...todos,
        {
          id: todoId,
          title: newTodo,
          completed: false,
          userId: user!.uid,
          createdAt: new Date(),
        },
      ]);
      setNewTodo("");
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert("Error", "Failed to add todo");
    }
  };

  const handleToggleTodo = async (todoId: string) => {
    try {
      await toggleTodo(todoId);
      setTodos(
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Failed to delete todo from database");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView className="bg-gray-900 w-full h-full">
      <View className="flex-1 p-5">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-white text-3xl font-bold tracking-tight">
            Hello, {user?.email?.split("@")[0]}!
          </Text>
          <Text className="text-gray-400 text-lg mt-1">Your Todos Today</Text>
        </View>

        {/* Add Todo Section */}
        <View className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
          <InputField
            label="New Todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={handleAddTodo}
          />
          <TouchableOpacity
            className="bg-indigo-600 py-3 rounded-lg mt-3 shadow-md active:bg-indigo-700"
            onPress={handleAddTodo}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Add Task
            </Text>
          </TouchableOpacity>
        </View>

        {/* Todo List */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between bg-gray-800 rounded-lg p-4 mb-3 shadow-md">
              <TouchableOpacity
                onPress={() => handleToggleTodo(item.id)}
                className="flex-1 mr-3"
              >
                <Text
                  className={`text-white text-lg ${
                    item.completed
                      ? "line-through text-gray-500 "
                      : "text-white"
                  }`}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item.id)}
                className="bg-red-600 py-1 px-3 rounded-md"
              >
                <Text className="text-white text-sm font-medium">Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View className="items-center mt-10">
              <Text className="text-gray-400 text-lg italic">
                No tasks yet—add one to get started!
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-600 py-3 rounded-lg mt-6 shadow-md active:bg-red-700"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
