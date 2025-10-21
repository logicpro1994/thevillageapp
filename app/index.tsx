import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";
import Loading from "../components/Loading";
import { theme } from "../constants/theme";

const index = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loading size="large" color={theme.colors.primary} />
    </View>
  );
};

export default index;
