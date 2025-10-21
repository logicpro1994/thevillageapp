import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import Icon from "../../assets/icons";
import { useRouter } from "expo-router";
import Avatar from "../../components/Avatar";
import { getUserImageSrc } from "../../services/ImageService";

const Home = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const { user: currentUser, setUserData } = useAuth();
  
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    
    if (currentUser) {
        setImage(currentUser.image || (null as any));
    }
  }, [currentUser]);
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>The Little Years</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push("/Profile")}>
              <Avatar
                uri={image as string}
                size={hp(4.3)}
                rounded={theme.radius.sm}
                style={{ borderWidth: 2, borderColor: theme.colors.darkLight }}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    fontSize: hp(3.2),
    fontWeight: "bold",
    color: theme.colors.text,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
    height: hp(2.2),
    width: wp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText: {
    color: "white",
    fontSize: hp(1.2),
    fontWeight: theme.fonts.bold as any,
  },
});

export default Home;
