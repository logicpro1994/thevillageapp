import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {

      if (session?.user) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace("/(main)/Home");
      } else {
        setAuth(null);
        router.replace("/Welcome");
      }
    });
  }, []);

  const updateUserData = async (user: any) => {
    let res = await getUserData(user.id);
    setUserData(res);
  };

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default _layout;
