import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useMemo, useState } from "react";
import UserContext from "../contexts/UserContext";

const ACCOUNT_KEY = "accounts";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(username, password) {
    try {
      const storedData = await AsyncStorage.getItem(ACCOUNT_KEY);

      if (!storedData) {
        return {
          success: false,
          message: "No accounts found",
        };
      }

      const users = JSON.parse(storedData);

      const userData = users.find(
        (user) => user.username === username && user.password === password,
      );

      if (!userData) {
        console.error("Invalid User");
        return {
          success: false,
          message: "Invalid User",
        };
      }

      setUser({ ...userData });

      return {
        success: true,
        message: "Login Successful",
      };
    } catch (error) {
      console.error(error);
    }
  }

  async function register(data) {
    try {
      const storedUsers = await AsyncStorage.getItem(ACCOUNT_KEY);

      const users = storedUsers ? JSON.parse(storedUsers) : [];

      users.push({ ...data, firstName: "", lastName: "" });

      await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(users));
    } catch (error) {
      console.log(error);
    }
  }

  const data = useMemo(() => ({ user, login, register }), [user]);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
