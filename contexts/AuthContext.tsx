import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any;
  setAuth: (authUser: any) => void;
  setUserData: (userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const setAuth = (authUser: any) => {
    setUser(authUser);
  };

  const setUserData = (userData: any) => {
    setUser({ ...userData });
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
