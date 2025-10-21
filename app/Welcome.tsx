import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import LPButton from "../components/Button";
import Button from "../components/Button";
import ScreenWrapper from "../components/ScreenWrapper";

const Welcome = () => {
  const router = useRouter();

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          style={styles.welcomeImage}
          source={require("../assets/images/welcome-main.png")}
          resizeMode="contain"
        />

        {/* title */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>Welcome to The Little Years</Text>
          <Text style={styles.punchline}>
            Find calm, clarity, and connection in The Little Years
          </Text>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push("/SignUp")}
          />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Pressable onPress={() => router.push("/Login")}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.primary,
                    fontWeight: theme.fonts.semibold as any,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: wp(4),
  },

  welcomeImage: {
    width: wp(100),
    height: hp(30),
    alignSelf: "center",
  },

  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    fontWeight: theme.fonts.extrabold as any,
    textAlign: "center",
  },

  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
  },

  footer: {
    marginBottom: hp(5),
    gap: 30,
    width: "100%",
    alignItems: "center",
  },

  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});

export default Welcome;
