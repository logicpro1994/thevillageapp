import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  ImageStyle,
} from "react-native";
import React, { useState, useEffect } from "react";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";
import { Image } from "expo-image";
import { getUserImageSrc } from "../services/ImageService";

interface AvatarProps {
  uri: string;
  size?: number;
  rounded?: number;
  style?: StyleProp<ImageStyle>;
}

const Avatar = (props: AvatarProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Check if it's a local URI (starts with file://) or a Supabase storage path
        if (props.uri && props.uri.startsWith("file://")) {
          // It's a local URI from image picker, use it directly
          setImageSrc(props.uri);
        } else if (props.uri) {
          // It's a Supabase storage path, get the public URL
          const src = await getUserImageSrc(props.uri);
          setImageSrc(src);
        } else {
          // No image provided, use default
          setImageSrc(require("../assets/images/defaultUser.png"));
        }
      } catch (error) {
        console.log("Error loading image:", error);
        setImageSrc(require("../assets/images/defaultUser.png"));
      }
    };
    loadImage();
  }, [props.uri]);

  if (!imageSrc) {
    return (
      <View
        style={[
          styles.avatar,
          {
            height: props.size,
            width: props.size,
            borderRadius: props.rounded || theme.radius.md,
          },
        ]}
      />
    );
  }

  return (
    <Image
      source={imageSrc}
      transition={100}
      style={[
        styles.avatar,
        {
          height: props.size,
          width: props.size,
          borderRadius: props.rounded || theme.radius.md,
        },
        props.style as ImageStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
    borderRadius: theme.radius.md,
  },
});

export default Avatar;
