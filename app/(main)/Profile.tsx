import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import BackButton from "../../components/BackButton";
import { Router, useRouter } from "expo-router";
import { theme } from "../../constants/theme";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../contexts/AuthContext";
import UserHeader from "../../components/UserHeader";
import { supabase } from "../../lib/supabase";
import { hp, wp } from "../../helpers/common";

const Profile = () => {
  const { user, setAuth } = useAuth();
  const router = useRouter();
  
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
      return;
    }
  };


  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          console.log("modal cancelled");
        },
      },
      {
        text: "Logout",
        onPress: () => onLogout(),
        style: "destructive",
      }
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      <UserHeader
        user={user as any}
        router={router}
        handleLogout={handleLogout}
      />
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20,
  },

  headerShape: {
    width: wp(100),
    height: hp(20),
  },
 
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.textLight,
  },
});
