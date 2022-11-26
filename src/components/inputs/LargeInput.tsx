import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

interface IInput {
  options?: TextInputProps & {ref?: (ref: any) => void};
  style?: StyleProp<ViewStyle>;
  styleTextInput?: StyleProp<TextStyle>;
  hasCode?: boolean;
  rightContent?: any;
  leftContent?: any;
}

const LargeInput: FC<IInput> = ({
  style,
  hasCode,
  rightContent,
  leftContent,
  styleTextInput,
  options,
}) => {
  return (
    <View style={[styles.con, style]}>
      {rightContent && <View style={styles.rightCont}>{rightContent}</View>}
      <TextInput
        style={[styles.textInput, styleTextInput]}
        placeholderTextColor="#9B9B9B"
        {...options}
      />
      {hasCode && <Text style={styles.phoneText}>+966</Text>}
      {leftContent && <View style={styles.leftCont}>{leftContent}</View>}
    </View>
  );
};

export default LargeInput;

const styles = StyleSheet.create({
  con: {
    height: PixelPerfect(48),
    borderRadius: PixelPerfect(50),
    width: '100%',
    paddingHorizontal: PixelPerfect(16),
    backgroundColor: Colors.lightGray,
    ...SharedStyles.centred,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    textAlign: 'right',
    marginHorizontal: 3,
    width: '100%',
    color: '#9B9B9B',
    flex: 7,
  },
  phoneText: {
    fontSize: PixelPerfect(16),
    color: Colors.black,
    fontFamily: Fonts.Medium,
    marginHorizontal: PixelPerfect(3),
  },
  rightCont: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    marginTop: PixelPerfect(21),
  },
  leftCont: {
    flex: 1,
    height: '100%',
    ...SharedStyles.centred,
  },
});
