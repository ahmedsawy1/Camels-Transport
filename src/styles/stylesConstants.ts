import {
  Dimensions,
  NativeModules,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';

export const phoneHeight = Dimensions.get('window').height;
export const phoneWidth = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window');

export enum Colors {
  black = '#000000',
  white = '#FFFFFF',
  lightGray = '#F1F1F1',
  medGray = '#858585',
  grayMain = '#9B9B9B',
  grayText = '#A2A2A2',
  secondGray = '#575757',
  mainColor = '#0277FA',
  secondColor = '#CF8900',
  blue = '#2664C0',
  green = '#449983',
  borderColor = '#F3F4F6',
  medGreen = '#52AC52',
}

export enum Fonts {
  Bold = 'Tajawal-Bold',
  ExtraLight = 'Tajawal-ExtraLight',
  Light = 'Tajawal-Light',
  Medium = 'Tajawal-Medium',
  Regular = 'Tajawal-Regular',
  // SemiBold = 'IBMPlexSansArabic-SemiBold',
  // Thin = 'IBMPlexSansArabic-Thin',
}

// export enum Images {
//   headerLogo = require('../assets/images/headerLogo.png'),
//   vat = require('../assets/images/vat.png'),
//   maroof = require('../assets/images/maroof.png'),
// }

export enum ScreenOptions {
  StatusBarHeight = NativeModules.StatusBarManager.HEIGHT,
  HalfScreen = width / 2 - 15,
  CURRENT_RESOLUTION = Math.sqrt(height * height + width * width),
  DesignResolution = {
    width: 375,
    height: 812,
  } as any,
}

export const createPerfectPixel = (designSize = {width: 375, height: 812}) => {
  if (
    !designSize ||
    !designSize.width ||
    !designSize.height ||
    typeof designSize.width !== 'number' ||
    typeof designSize.height !== 'number'
  ) {
    throw new Error(
      'react-native-pixel-perfect | create function | Invalid design size object! must have width and height fields of type Number.',
    );
  }
  const DESIGN_RESOLUTION = Math.sqrt(
    designSize.height * designSize.height + designSize.width * designSize.width,
  );
  const RESOLUTIONS_PROPORTION =
    ScreenOptions.CURRENT_RESOLUTION / DESIGN_RESOLUTION;
  return (size: number) => RESOLUTIONS_PROPORTION * size;
};

export const PixelPerfect = (pixel: number) => {
  const Perfect = createPerfectPixel(ScreenOptions.DesignResolution as any);
  return Perfect(pixel);
};
export const ColorWithOpacity = (
  hex: Colors | string,
  opacity: number,
): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let color;
  if (result) {
    color = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  } else {
    return hex;
  }
  return `rgba(${color.r},${color.g},${color.b},${opacity})`;
};
export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

export function checkIndexIsEven(n) {
  return n % 2 === 0;
}
