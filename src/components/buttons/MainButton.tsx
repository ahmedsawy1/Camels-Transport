import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

interface IMainButton {
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  onPress?: () => void;
  title: string;
  buttonIcon?: JSX.Element | boolean;
  otherButtonIcon?: JSX.Element | boolean;
}

const MainButton: FC<IMainButton> = ({
  style,
  styleTitle,
  onPress,
  title,
  buttonIcon,
  otherButtonIcon,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.con, style]}>
      <View style={styles.iconCont}>{buttonIcon}</View>
      <Text style={[styles.title, styleTitle]}>{title}</Text>
      <View style={styles.iconCont}>{otherButtonIcon}</View>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  con: {
    paddingHorizontal: 20,
    backgroundColor: Colors.black,
    ...SharedStyles.centred,
    ...SharedStyles.borderRadius,
    height: PixelPerfect(50),
    flexDirection: 'row',
  },
  title: {
    fontSize: PixelPerfect(16),
    fontFamily: Fonts.Bold,
    color: Colors.white,
  },
  iconCont: {
    flex: 1,
    height: '100%',
    ...SharedStyles.centred,
  },
});
