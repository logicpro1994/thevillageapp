import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import Loading from "./Loading";

const Button = ({
  buttonStyle = {},
  textStyle = {},
  title = "",
  onPress = () => {},
  loading = false,
  hasShadow = true,
}) => {
  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View style={{ backgroundColor: "White" }}>
        <Loading size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    paddingHorizontal: wp(20),
  },
  text: {
    color: "white",
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold as any,
  },
});
