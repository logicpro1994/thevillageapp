import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { IconProps } from ".";

const ArrowLeft = (props: IconProps) => (
  <Svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <Path
      d="M5.5 12.002H19"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    ></Path>
    <Path
      d="M10.9999 18.002C10.9999 18.002 4.99998 13.583 4.99997 12.0019C4.99996 10.4208 11 6.00195 11 6.00195"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    ></Path>
  </Svg>
);

export default ArrowLeft;
