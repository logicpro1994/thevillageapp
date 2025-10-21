import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
import { IconProps } from ".";

const User = (props: IconProps) => (
  <Svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
    {...props}
  >
    <Path
      d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    ></Path>
    <Path
      d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5"
      stroke="currentColor"
      strokeWidth={props.strokeWidth || 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    ></Path>
  </Svg>
);

export default User;
