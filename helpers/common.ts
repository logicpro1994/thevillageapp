import { Dimensions } from "react-native";

const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window');    

const hp = (percentage: number) => {
    return (percentage / 100) * deviceHeight;
};

const wp = (percentage: number) => {
    return (percentage / 100) * deviceWidth;
};

const titleCase = (str: string) => {
    return str?.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export { hp, wp, titleCase };
