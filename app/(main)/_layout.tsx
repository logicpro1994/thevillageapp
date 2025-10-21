import React from "react";
import { Stack, usePathname } from "expo-router";
import TabBar from "../../components/TabBar";
import { SafeAreaView, StyleSheet } from "react-native";

export default function MainLayout() {
  const pathname = usePathname();

  // Show alert count on all pages except when on Alerts page
  const showAlertCount = pathname !== "/(main)/Alerts";

  return (
    <SafeAreaView style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" />
        <Stack.Screen name="Community" />
        <Stack.Screen name="Posts" />
        <Stack.Screen name="Experts" />
        <Stack.Screen name="Alerts" />
      </Stack>
      <TabBar alertCount={showAlertCount ? 5 : 0} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
