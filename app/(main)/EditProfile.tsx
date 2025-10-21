import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import Icon from "../../assets/icons";
import Avatar from "../../components/Avatar";
import { router, useRouter } from "expo-router";
import Input from "../../components/TextInput";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { updateUserData } from "../../services/userService";
import * as ImagePicker from "expo-image-picker";
import { uploadFile } from "../../services/ImageService";

const EditProfile = () => {
  const { user: currentUser, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    image: "",
    bio: "",
    address: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.name || ("" as string),
        phoneNumber: currentUser.phoneNumber || ("" as string),
        image: currentUser.image || (null as any),
        bio: currentUser.bio || ("" as string),
        address: currentUser.address || ("" as string),
      });
    }
  }, [currentUser]);

  const onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0].uri });
    } else {
      Alert.alert("Profile", "No image selected");
    }
  };

  const onSubmit = async () => {
    let userData = { ...user };

    let { name, phoneNumber, address, bio } = userData;

    if (!name || !phoneNumber || !address || !bio) {
      return Alert.alert("Profile", "Please fill in all fields");
    }

    setLoading(true);

    // Handle image upload - either selected image or default user image
    if (
      typeof userData.image === "string" &&
      userData.image.startsWith("file://")
    ) {
      // User selected a new image from picker
      let imageResult = await uploadFile("profiles", userData.image);
      if (imageResult.success && imageResult.data) {
        userData.image = imageResult.data as string;
      } else {
        Alert.alert("Profile", "Could not upload image");
        return;
      }
    } else if (!userData.image) {
      // No image selected, upload default user image to Supabase
      try {
        // Create a temporary file URI for the default image
        const defaultImageUri = Image.resolveAssetSource(
          require("../../assets/images/defaultUser.png")
        ).uri;

        let imageResult = await uploadFile("profiles", defaultImageUri);
        if (imageResult.success && imageResult.data) {
          userData.image = imageResult.data as string;
        } else {
          // If upload fails, set to empty string and let Avatar handle default
          userData.image = "";
        }
      } catch (error) {
        console.log("Error uploading default image:", error);
        // If upload fails, set to empty string and let Avatar handle default
        userData.image = "";
      }
    }
    // If userData.image is already a Supabase path, keep it as is

    const res = await updateUserData(currentUser?.id, userData);

    setLoading(false);

    if (res.success) {
      setUserData({ ...currentUser, ...userData });
      router.back();
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <Header title="Edit Profile" />
          {/* form */}
          <View style={styles.form}>
            <View style={{ gap: 15 }}>
              <View style={styles.avatarContainer}>
                <Avatar
                  uri={user?.image}
                  size={hp(12)}
                  rounded={theme.radius.xxl * 1.4}
                />
                <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                  <Icon
                    name="camera"
                    props={{
                      strokeWidth: 2.5,
                      width: 20,
                      height: 20,
                      color: theme.colors.primary,
                    }}
                  />
                </Pressable>
              </View>
              <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                Please fill in your profile details
              </Text>
              <Input
                icon={
                  <Icon
                    name="user"
                    props={{ width: 26, height: 26, strokeWidth: 1.6 }}
                  />
                }
                placeholder="Enter your name"
                value={user.name}
                onChangeText={(value: string) =>
                  setUser({ ...user, name: value })
                }
              />
              <Input
                icon={
                  <Icon
                    name="call"
                    props={{ width: 26, height: 26, strokeWidth: 1.6 }}
                  />
                }
                placeholder="Enter your phone number"
                value={user.phoneNumber}
                onChangeText={(value: string) =>
                  setUser({ ...user, phoneNumber: value })
                }
              />
              <Input
                icon={
                  <Icon
                    name="location"
                    props={{ width: 26, height: 26, strokeWidth: 1.6 }}
                  />
                }
                placeholder="Enter your address"
                value={user.address}
                onChangeText={(value: string) =>
                  setUser({ ...user, address: value })
                }
              />
              <Input
                placeholder="Enter your bio"
                value={user.bio}
                onChangeText={(value: string) =>
                  setUser({ ...user, bio: value })
                }
                multiline={true}
                containerStyle={styles.bio}
              />
              <Button title="Update" onPress={onSubmit} loading={loading} />
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
    position: "relative",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: theme.radius.xxl * 1.4,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: theme.colors.darkLight,
  },
  cameraIcon: {
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
  form: {
    gap: 18,
    marginTop: 20,
  },
  input: {
    flexDirection: "row",
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    padding: 17,
    borderCurve: "continuous",
    paddingHorizontal: 20,
    gap: 15,
  },
  bio: {
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  },
  saveButton: {
    marginTop: hp(2),
  },
});
