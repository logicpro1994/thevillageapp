import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import Icon from "../assets/icons";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";

interface TabBarProps {
  alertCount?: number;
}

const TabBar = ({ alertCount = 0 }: TabBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

   const tabs = [
    {
      name: "Home",
      route: "/(main)/Home",
      icon: "home",
      label: "Home",
    },
    {
      name: "Community",
      route: "/(main)/Community",
      icon: "user",
      label: "Community",
    },
    {
      name: "Posts",
      route: "/(main)/Posts",
      icon: "plus",
      label: "Posts",
      isSpecial: true,
    },
    {
      name: "Experts",
      route: "/(main)/Experts",
      icon: "search",
      label: "Experts",
    },
    {
      name: "Alerts",
      route: "/(main)/Alerts",
      icon: "comment",
      label: "Alerts",
      notificationCount: alertCount,
    },
  ];

  const isActive = (route: string) => {
    //console.log("Current pathname:", pathname);
    //console.log("Checking route:", route);
    // Check exact match first
    if (pathname === route) return true;
    // Check if pathname starts with the route
    if (pathname.startsWith(route)) return true;
    // Check if pathname ends with the screen name (fallback)
    const screenName = route.split("/").pop();
    return pathname.endsWith(screenName || "");
  };

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => handleTabPress(tab.route)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            {tab.isSpecial ? (
              <View style={styles.specialIconContainer}>
                <Icon
                  name={tab.icon}
                  props={{
                    width: 24,
                    height: 24,
                    strokeWidth: 2,
                    color: "#fff",
                  }}
                />
              </View>
            ) : (
              <View
                style={[
                  styles.iconWrapper,
                  isActive(tab.route) && styles.activeIconWrapper,
                ]}
              >
                <Icon
                  name={tab.icon}
                  props={{
                    width: 24,
                    height: 24,
                    strokeWidth: 1.5,
                    color: isActive(tab.route)
                      ? theme.colors.primary
                      : theme.colors.text,
                  }}
                />
                {tab.notificationCount && tab.notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>
                      {tab.notificationCount && tab.notificationCount > 99
                        ? "99+"
                        : String(tab.notificationCount)}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          {!tab.isSpecial && (
            <Text
              style={[styles.label, isActive(tab.route) && styles.activeLabel]}
            >
              {tab.label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: hp(1),
    paddingTop: hp(1),
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(0.5),
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    position: "relative",
    padding: 8,
  },
  activeIconWrapper: {
    // No background color, only color change
  },
  specialIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  label: {
    fontSize: hp(1.2),
    color: theme.colors.text,
    marginTop: hp(0.5),
    fontWeight: "500",
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#ff4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    paddingHorizontal: 4,
  },
  notificationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default TabBar;
