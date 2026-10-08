import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import UserContext from "../contexts/UserContext";

const ACCOUNT_KEY = "accounts";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function clearAccounts() {
      await AsyncStorage.removeItem(ACCOUNT_KEY);
    }

    clearAccounts();
  }, []);

  async function getMe() {
    try {
      const storedData = await AsyncStorage.getItem(ACCOUNT_KEY);

      if (!storedData) {
        console.log("No accounts found");
        return;
      }

      const users = JSON.parse(storedData);

      console.log("All accounts:", users);
    } catch (error) {
      console.error("getMe error:", error);
    }
  }

  async function login(username, password) {
    try {
      const storedData = await AsyncStorage.getItem(ACCOUNT_KEY);

      if (!storedData) {
        return;
      }

      const users = JSON.parse(storedData);

      const userData = users.find(
        (user) => user.username === username && user.password === password,
      );

      if (!userData) {
        return console.error("Invalid User");
      }
      setUser({ ...userData });
    } catch (error) {
      console.error(error);
    }
  }

  async function register(data) {
    try {
      const storedUsers = await AsyncStorage.getItem(ACCOUNT_KEY);

      const users = storedUsers ? JSON.parse(storedUsers) : [];

      users.push(data);

      await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(users));

      console.log("All accounts:", users);
    } catch (error) {
      console.log(error);
    }
  }

  const data = useMemo(() => ({ user, login, register, getMe }), [user]);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
