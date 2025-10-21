import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import { Router, useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import { hp, wp } from "../helpers/common";
import Input from "../components/TextInput";
import { useRef, useState } from "react";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      return Alert.alert("Sign Up", "Please fill in all fields");
    }

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) {
        Alert.alert("Sign Up", error.message);
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Sign Up", "An error occurred while signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton size={26} router={router as any as Router} />
        {/* welcome text */}
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
            Please fill in the details below to create an account
          </Text>
          <Input
            icon={
              <Icon
                name="user"
                props={{ width: 26, height: 26, strokeWidth: 1.6 }}
              />
            }
            placeholder="Enter your name"
            onChangeText={(value: string) => (nameRef.current = value)}
          />

          <Input
            icon={
              <Icon
                name="mail"
                props={{ width: 26, height: 26, strokeWidth: 1.6 }}
              />
            }
            placeholder="Enter your email"
            onChangeText={(value: string) => (emailRef.current = value)}
          />
          <Input
            icon={
              <Icon
                name="lock"
                props={{ width: 26, height: 26, strokeWidth: 1.6 }}
              />
            }
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(value: string) => (passwordRef.current = value)}
          />

          {/* button */}
          <Button title="Sign Up" loading={loading} onPress={onSubmit} />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.push("Login")}>
            <Text style={styles.footerSignupText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold as any,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: theme.fonts.semibold as any,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    fontSize: hp(1.6),
    color: theme.colors.text,
  },
  footerSignupText: {
    textAlign: "center",
    fontSize: hp(1.6),
    color: theme.colors.primaryDark,
    fontWeight: theme.fonts.semibold as any,
  },
});
