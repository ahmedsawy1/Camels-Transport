import {ActionType} from '../store/types/types';

export interface TouchableProps {
  dark?: boolean;
  onPress?: () => void;
}

export interface IReduser {
  key?: any;
  type: ActionType;
  payload?: any;
}
export interface IDispatch extends IReduser {}

export interface NavigationProps {
  goBack?: () => void;
  openDrawer?: () => void;
  navigate?: any;
  replace?: any;
  reset?: any;
  params?: any;
  name?: string;
}

export interface ScreenProps {
  navigation?: NavigationProps;
  route?: NavigationProps;
}
