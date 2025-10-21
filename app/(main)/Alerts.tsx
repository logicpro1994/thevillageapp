import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";

const Alerts = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Alerts</Text>
        <Text style={styles.subtitle}>Stay updated with notifications</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: hp(1.8),
    color: theme.colors.text,
    opacity: 0.7,
  },
});

export default Alerts;
