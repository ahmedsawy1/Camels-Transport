import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, Share} from 'react-native';
import {PixelPerfect} from '../styles/stylesConstants';

export enum AsyncKeys {
  COOKIE = 'COOKIE',
  IS_LOGIN = 'IS_LOGIN',
  USER_DATA = 'USER_DATA',
  LANGUAGE = 'LANGUAGE',
  CURRENCY = 'CURRENCY',
  AUTH_TOKEN = 'AUTH_TOKEN',
}
export class PersistConfig {
  key: string;
  storage: import('@react-native-async-storage/async-storage').AsyncStorageStatic;
  whitelist?: any;
  constructor(key: string, ...whitelist: any) {
    this.key = key;
    this.storage = AsyncStorage;
    this.whitelist = [...whitelist];
  }
}

export const regex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
export const regexSaudiNumber = new RegExp(
  /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
);

export const saveItem = async (key: string, data: object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error: any) {
    console.log(error.message);
  }
  return false;
};

export const getItem = async (key: string) => {
  try {
    const retrievedItem: any = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error: any) {
    console.log(error.message);
  }
  return null;
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error: any) {
    console.log(error.message);
  }
  return false;
};

export const clear = async () => {
  await AsyncStorage.clear();
};

export function RemoveHTMLFromString(encodedString: string) {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate: any = {
    nbsp: ' ',
    amp: '&',
    quot: '"',
    lt: '<',
    gt: '>',
  };
  return encodedString
    ?.replace(translate_re, function (match, entity) {
      return translate[entity];
    })
    ?.replace(/&#(\d+);/gi, function (match, numStr) {
      var num = parseInt(numStr, 10);
      return String.fromCharCode(num);
    });
}

export function getDaysInMonthUTC(month: number, year: number) {
  let date = new Date(Date.UTC(year, month, 1));
  let days: Date[] = [];
  while (date.getUTCMonth() === month) {
    days.push(new Date(date));
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return days;
}

export const arrOfMonthes = [
  {en: 'Jun', ar: 'يناير'},
  {en: 'Feb', ar: 'فبراير'},
  {en: 'Mar', ar: 'مارس'},
  {en: 'Apr', ar: 'أبريل'},
  {en: 'May', ar: 'مايو'},
  {en: 'Jun', ar: 'يونيو'},
  {en: 'Jul', ar: 'يوليو'},
  {en: 'Aug', ar: 'أغسطس'},
  {en: 'Sep', ar: 'سبتمبر'},
  {en: 'Oct', ar: 'أكتوبر'},
  {en: 'Nov', ar: 'نوفمبر'},
  {en: 'Dec', ar: 'ديسمبر'},
];

export const numberToMonth = () => {
  let arrOfMonthes = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
};

// Docs
// const month6 = getDaysInMonthUTC(6 - 1, 2022);
// const month7 = getDaysInMonthUTC(7 - 1, 2022);
// const month8 = getDaysInMonthUTC(8 - 1, 2022);

export const onShareHandler = async () => {
  try {
    const result = await Share.share({
      message: 'AnYacht App \n شارك التطبيق مع أصدقائك',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

export const match = (android: number, ios: number) =>
  Platform.OS == 'android' ? PixelPerfect(android) : PixelPerfect(ios);
