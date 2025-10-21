import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { IconProps } from ".";

const ThreeDotsCircle = (props: IconProps) => (
  <Svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
    {...props}
  >
    <Path
      d="M11.9959 12H12.0049"
      stroke="#141B34"
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.9842 16H11.9932"
      stroke="#141B34"
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.9998 8H12.0088"
      stroke="#141B34"
      strokeWidth={props.strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      stroke="#141B34"
      strokeWidth="1.5"
    />
  </Svg>
);

export default ThreeDotsCircle;
