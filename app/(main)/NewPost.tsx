import {
    Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import Header from "../../components/Header";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../components/Avatar";
import RichTextEditor from "../../components/RichTextEditor";
import { useRouter } from "expo-router";
import Icon from "../../assets/icons";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { getSupabaseFileUrl } from "../../services/ImageService";
import { Video } from "expo-av";

const newPost = () => {
  const { user } = useAuth();
  const bodyRef = useRef<any>(null);
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);

  const onChange = (text: string) => {
    // Handle text change
    bodyRef.current = text;
  };

  const onPickImage = async () => {
    let mediaConfig = {
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    };
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig as any);
    if (!result.canceled) {
      setFile(result.assets[0].uri);
    }
  };

  const getFileType = (file: any) => {
    if (!file) return null;

    // For local files (picked images)
    if (typeof file === "string") {
      const extension = file.split(".").pop()?.toLowerCase();
      if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension as string)) {
        return "image";
      }
      return "video";
    }

    // For remote files
    if (file.includes("postImage")) return "image";
    return "video";
  };

  const isLocalFile = (file: string) => {
    if (!file) return null;
    if (typeof file === "object") return true;
    return false;
  };

  const getFileUri = (file: any) => {
    if (!file) return null;

    // For local files (picked images), file is already the URI string
    if (typeof file === "string") return file;

    // For remote files
    return getSupabaseFileUrl(file)?.uri;
  };

  const onSubmit = async () => {
    console.log("file", file);
    console.log("bodyRef", bodyRef.current);

    if (!bodyRef.current && !file) {
      return Alert.alert("Post", "Please choose an image or add post body");
    }

    let data = {
        file,
        body: bodyRef.current,
        userId: user?.id,
    }
    
  };

  return (
    <ScreenWrapper bg="White">
      <View style={styles.container}>
        <Header title="Create Post" />
        <ScrollView style={{ gap: 20 }}>
          {/* avatar */}
          <View style={styles.header}>
            <Avatar
              uri={user?.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
            />
            <View style={{ gap: 2 }}>
              <Text style={styles.username}>{user && user.name}</Text>
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>
          <View style={styles.textEditor}>
            <RichTextEditor
              editorRef={editorRef}
              bodyRef={bodyRef}
              onChange={onChange}
            />
            {file && (
              <View style={styles.file}>
                {getFileType(file) === "image" && !!getFileUri(file) && (
                  <Image
                    source={{ uri: getFileUri(file) as string }}
                    contentFit="cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: theme.radius.xl,
                    }}
                  />
                )}

                <Pressable
                  style={styles.closeIcon}
                  onPress={() => setFile(null)}
                >
                  <Icon
                    name="delete"
                    props={{ width: 32, height: 32, color: "white" }}
                  />
                </Pressable>
              </View>
            )}
          </View>
          <View style={styles.media}>
            <Text style={styles.addImageText}>Add to your post</Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity style={styles.mediaIcons} onPress={onPickImage}>
                <Icon name="image" props={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Button
          buttonStyle={{ height: hp(6.2) }}
          title="Post"
          loading={loading}
          hasShadow={false}
          onPress={onSubmit}
        />
      </View>
    </ScreenWrapper>
  );
};

export default newPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.semibold as any,
    color: theme.colors.text,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold as any,
    color: theme.colors.text,
  },
  avatar: {
    height: hp(6.5),
    width: wp(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },

  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium as any,
    color: theme.colors.textLight,
  },
  textEditor: {
    marginBottom: 15,
  },
  media: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
  },
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: theme.fonts.semibold as any,
    color: theme.colors.text,
  },
  mediaIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  imageIcon: {
    borderRadius: theme.radius.md,
  },

  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: "continuous",
    backgroundColor: theme.colors.gray,
  },
  video: {},
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "rgba(255, 0, 0, 0.6)",
  },
});
