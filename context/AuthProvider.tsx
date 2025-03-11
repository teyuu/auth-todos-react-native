import React, { createContext, useState, useEffect, ReactNode } from "react";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { signIn, signUp, logout } from "@/services/authService";
import { User, onAuthStateChanged } from "firebase/auth";
import { AuthContextType } from "@/types/auth";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  
  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
