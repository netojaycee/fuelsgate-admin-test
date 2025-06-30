"use client";
import Cookies from "js-cookie";
import { createContext, useState } from "react";

type UserState = {
  isLoggedIn: boolean;
  token: string;
  data: any | null;
};

type ProviderValueType = {
  user?: UserState | null;
  storeUser?: (payload: UserState) => void;
  resetUser?: () => void;
};

const AuthContext = createContext<ProviderValueType>({});
const { Provider } = AuthContext;

const initState: UserState = {
  isLoggedIn: false,
  data: null,
  token: "",
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserState | null>(() => {
    const storedUserData = Cookies.get("user");
    return storedUserData ? JSON.parse(storedUserData) : initState;
  });

  const storeUser = (payload: UserState) => {
    setUser(payload);
    Cookies.set("user", JSON.stringify(payload));
    if (payload.token) {
      Cookies.set("token", payload.token);
    }
  };

  const resetUser = () => {
    setUser({ ...initState });
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return <Provider value={{ user, storeUser, resetUser }}>{children}</Provider>;
};

export { AuthContext, AuthProvider };
