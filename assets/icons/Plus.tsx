import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { IconProps } from ".";

const Plus = (props: IconProps) => (
  <Svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
    {...props}
  >
    <Path
      d="M12 4V20M20 12H4"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    ></Path>
  </Svg>
);

export default Plus;
