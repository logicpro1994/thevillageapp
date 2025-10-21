import React from "react";
import Home from "./Home";
import ArrowLeft from "./ArrowLeft";
import Call from "./Call";
import Camera from "./Camera";
import Comment from "./Comment";
import Delete from "./Delete";
import Edit from "./Edit";
import Heart from "./Heart";
import Image from "./Image";
import Location from "./Location";
import Lock from "./Lock";
import Logout from "./Logout";
import Mail from "./Mail";
import Plus from "./Plus";
import Search from "./Search";
import Send from "./Send";
import Share from "./Share";
import ThreeDotsCircle from "./ThreeDotsCircle";
import ThreeDotsHorizontal from "./ThreeDotsHorizontal";
import User from "./User";
import Video from "./Video";
import BackButton from "./BackButton";

export interface IconProps {
  strokeWidth?: number;
  color?: string;
  height?: number;
  width?: number;
  fill?: string;
}

const icons: Record<string, React.ComponentType<IconProps>> = {
  home: Home,
  arrowLeft: ArrowLeft,
  call: Call,
  camera: Camera,
  comment: Comment,
  delete: Delete,
  edit: Edit,
  heart: Heart,
  image: Image,
  location: Location,
  lock: Lock,
  logout: Logout,
  mail: Mail,
  plus: Plus,
  search: Search,
  send: Send,
  share: Share,
  threedotscircle: ThreeDotsCircle,
  threedotshorizontal: ThreeDotsHorizontal,
  user: User,
  video: Video,
  backButton: BackButton,
};

const Icon = ({
  name,
  props,
}: {
  name: keyof typeof icons;
  props?: IconProps;
}) => {
  const IconComponent = icons[name];

  return (
    <IconComponent
      height={props?.height || 24}
      width={props?.width || 24}
      color={props?.color || "#000000"}
      fill={props?.fill || "none"}
      strokeWidth={props?.strokeWidth || 1.5}
      {...props}
    />
  );
};

export default Icon;
