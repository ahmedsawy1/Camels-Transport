import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';

import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface ICheckBox {
  checked: boolean;
  onPress: () => void;
  onDiffrentTitlePress?: () => void;
  style?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  title: string;
  diffrentTitle?: any;
  isSquare?: boolean;
}

const CheckBox: FC<ICheckBox> = ({
  checked,
  onPress,
  style,
  title,
  diffrentTitle,
  onDiffrentTitlePress,
  isSquare = false,
  styleTitle,
}) => {
  return (
    <Pressable style={[styles.con, style]} onPress={onPress}>
      <View style={{alignItems: 'flex-start'}}>
        {isSquare && (
          <View
            style={[
              styles.square,
              checked && {backgroundColor: Colors.mainColor, borderWidth: 0},
            ]}>
            {checked && (
              <Ionicons
                name="checkmark"
                size={PixelPerfect(15)}
                color={Colors.white}
              />
            )}
          </View>
        )}

        {!isSquare && (
          <View style={styles.circle}>
            {checked && (
              <View
                style={{
                  height: PixelPerfect(10),
                  width: PixelPerfect(10),
                  borderRadius: PixelPerfect(5),
                  backgroundColor: Colors.mainColor,
                }}
              />
            )}
          </View>
        )}
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.titleText, styleTitle]}>{title} </Text>
        {diffrentTitle && (
          <Text onPress={onDiffrentTitlePress} style={styles.diffrentTitle}>
            {diffrentTitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  con: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Regular,
    color: '#9B9B9B',
    marginLeft: 5,
  },
  diffrentTitle: {
    fontSize: PixelPerfect(10),
    fontFamily: Fonts.Regular,
  },
  circle: {
    height: PixelPerfect(18),
    width: PixelPerfect(18),
    borderWidth: 1,
    borderRadius: PixelPerfect(9),
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: PixelPerfect(16),
    width: PixelPerfect(16),
    borderWidth: 1,
    borderRadius: PixelPerfect(3),
    borderColor: '#DADADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
