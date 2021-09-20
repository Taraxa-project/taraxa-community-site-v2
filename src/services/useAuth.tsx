import React, { useState, useEffect, useContext, createContext } from "react";
import { useApi } from "./useApi";

type User = {
  id: number;
  username: string;
  email: string;
  eth_wallet: string;
}

type Context = {
  user: User | null,
  signin?: (username: string, password: string) => any,
  signup?: (username: string, email: string, ethWallet: string, password: string, token: string) => any,
  signout?: () => void,
  sendPasswordResetEmail?: (email: string) => void,
}

const initialState: Context = {
  user: null,
};

const AuthContext = createContext<Context>(initialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const api = useApi();

  const signin = async (username: string, password: string) => {
    const result = await api.post('/auth/local', {
      identifier: username,
      password: password
    });

    if (result.success) {
      if (result.response.jwt) {
        localStorage.setItem("auth", result.response.jwt);
      }

      if (result.response.user) {
        const user = result.response.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      }
    }

    return result.success;
  };
  const signup = async (username: string, email: string, ethWallet: string, password: string, token: string) => {
    console.log("username", username);
    console.log("email", email);
    console.log("ethWallet", ethWallet);
    console.log("password", password);
    console.log("token", token);

    const result = await api.post('/auth/local/register', {
      username: username,
      password: password,
      eth_wallet: ethWallet,
      email: email,
      token: token,
      confirmed: false
    });

    return result.success;
  };
  const signout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setUser(null);
  };
  const sendPasswordResetEmail = (email: string) => {
    console.log("sendPasswordResetEmail", email);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
  };
}
