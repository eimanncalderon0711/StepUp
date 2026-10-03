import React from "react";
import UserContext from "../contexts/UserContext";

export default function UserProvider({ children }) {
  return (
    <UserContext.Provider value={{ name: "John Doe" }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
