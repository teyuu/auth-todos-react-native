//hooks/useAuth.ts
import { useContext } from "react";
import  AuthContext  from "@/context/AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// import { useState } from "react";
// import { Alert } from "react-native";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   Auth,
// } from "firebase/auth";
// import { FIREBASE_AUTH } from "@/config/firebaseConfig";
// import { FirebaseError } from "@/types/auth";

// export const useAuth = () => {
//   const [loading, setLoading] = useState(false);
//   const auth = FIREBASE_AUTH;

//   const signUp = async (email: string, password: string) => {
//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       Alert.alert("Éxito", "Se ha registrado correctamente");
//       return userCredential;
//     } catch (error) {
//       const firebaseError = error as FirebaseError;
//       Alert.alert("Error", `Registro fallido: ${firebaseError.message}`);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signIn = async (email: string, password: string) => {
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       Alert.alert("Éxito", "Ha ingresado correctamente");
//       return userCredential;
//     } catch (error) {
//       const firebaseError = error as FirebaseError;
//       Alert.alert("Error", `Inicio de sesión fallido: ${firebaseError.message}`);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { signUp, signIn, loading };
// };