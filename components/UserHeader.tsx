import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Router } from "expo-router";
import Header from "./Header";
import { hp, titleCase, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";
import Avatar from "./Avatar";

const UserHeader = ({
  user,
  router,
  handleLogout,
}: {
  user: any;
  router: Router;
  handleLogout: () => Promise<void>;
}) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "white", paddingHorizontal: wp(4) }}
    >
      <View>
        <Header title="Profile" />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon
            name="logout"
            props={{
              color: theme.colors.rose,
              width: 32,
              height: 32,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
            <Avatar
              uri={user?.image}
              size={hp(12)}
              rounded={theme.radius.xxl * 1.4}
            />
            <Pressable
              style={styles.editIcon}
              
              onPress={() => router.push("/(main)/EditProfile")}
            >
              <Icon
                name="edit"
                props={{
                  strokeWidth: 2.5,
                  width: 20,
                  height: 20,
                  color: theme.colors.primary,
                }}
              />
            </Pressable>
          </View>

          {/* User Info */}
          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={styles.userName}>{user && titleCase(user?.name)}</Text>
            <Text style={styles.infoText}>{user?.address}</Text>
          </View>

          <View style={{ gap: 10 }}>
            <View style={styles.info}>
              <Icon
                name="mail"
                props={{
                  color: theme.colors.textLight,
                  width: 20,
                  height: 20,
                }}
              />
              <Text style={styles.infoText}>{user && user?.email}</Text>
            </View>

            {user && user?.phoneNumber && (
              <View style={styles.info}>
                <Icon
                  name="call"
                  props={{
                    color: theme.colors.textLight,
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={styles.infoText}>{user && user?.phoneNumber}</Text>
              </View>
            )}

            {user && user?.bio && (
              <View style={styles.info}>
                <Text style={styles.infoText}>{user && user?.bio}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: wp(4),
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    marginRight: wp(4),
    borderRadius: theme.radius.sm,
    backgroundColor: "#fee2e2",
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
    position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
    borderWidth: 2,
    borderColor: theme.colors.darkLight,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: hp(3),
    fontWeight: 500,
    color: theme.colors.textDark,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: 500,
    color: theme.colors.textLight,
  },
});
