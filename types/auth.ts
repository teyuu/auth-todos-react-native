import { User } from "firebase/auth";


export interface FirebaseError extends Error {
  code: string;
  message: string;
}

export interface FormData {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}