import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";

const Loading = ({
  size,
  color,
}: {
  size: "small" | "large" | number | undefined;
  color: string;
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator
        size={size as "small" | "large" | number | undefined}
        color={color}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
