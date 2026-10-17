import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useState } from "react";
import UserContext from "../contexts/UserContext";

const ACCOUNT_KEY = "accounts";
const SESSION_KEY = "user";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        const storedSession = await AsyncStorage.getItem(SESSION_KEY);

        if (isMounted && storedSession) {
          setUser(JSON.parse(storedSession));
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

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

      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
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

      users.push({
        ...data,
        firstName: data.firstName ?? "",
        lastName: data.lastName ?? "",
        profilePic: "",
      });

      await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(users));
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfile(updates) {
    try {
      // 1. Check if a user is logged in
      if (!user?.username) {
        return {
          success: false,
          message: "No logged-in user found",
        };
      }

      // 2. Get all registered accounts
      const storedAccounts = await AsyncStorage.getItem(ACCOUNT_KEY);
      const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];

      // 3. Find the current user's account
      const index = accounts.findIndex(
        (account) => account.username === user.username,
      );

      if (index === -1) {
        return {
          success: false,
          message: "Account not found",
        };
      }

      // 4. Allow only profile fields to be updated
      const profileUpdates = {
        firstName: updates.firstName,
        lastName: updates.lastName,
        email: updates.email,
        address: updates.address,
        profilePic: updates.profilePic,
      };

      // 5. Convert to entries and remove undefined values
      const filteredEntries = Object.entries(profileUpdates).filter(
        ([, value]) => value !== undefined,
      );

      // 6. Convert the filtered entries back into an object
      const validUpdates = Object.fromEntries(filteredEntries);

      // 7. Merge the existing account with the new updates
      const updatedUser = {
        ...accounts[index],
        ...validUpdates,
      };

      // 8. Save the updated account
      accounts[index] = updatedUser;

      await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts));

      // 9. Update the saved session
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

      // 10. Update React Context state
      setUser(updatedUser);

      return {
        success: true,
        message: "Profile updated successfully",
      };
    } catch (error) {
      console.error("Failed to update profile:", error);

      return {
        success: false,
        message: "Failed to update profile",
      };
    }
  }

  const data = useMemo(
    () => ({ user, login, register, updateProfile }),
    [user],
  );

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
