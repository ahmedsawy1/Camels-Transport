import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

interface IInput {
  options?: TextInputProps & {ref?: (ref: any) => void};
  style?: StyleProp<ViewStyle>;
  styleTextInput?: StyleProp<TextStyle>;
  hasCode?: boolean;
  isPassword?: boolean;
  rightContent?: any;
  leftContent?: any;
  onPress?: () => void;
}

const MainInput: FC<IInput> = ({
  style,
  hasCode,
  rightContent,
  leftContent,
  styleTextInput,
  options,
  isPassword,
  onPress,
}) => {
  const [showPass, setShowPass] = useState(true);

  return (
    <View style={[styles.con, style]}>
      {rightContent && <View style={styles.rightCont}>{rightContent}</View>}
      <TextInput
        style={[styles.textInput, styleTextInput]}
        placeholderTextColor={Colors.medGray}
        secureTextEntry={isPassword ? showPass : false}
        {...options}
      />
      {hasCode && <Text style={styles.phoneText}>+966</Text>}
      {leftContent && (
        <Pressable
          onPress={() => {
            if (isPassword) {
              setShowPass(cb => !cb);
            }
            onPress && onPress();
          }}
          style={styles.leftCont}>
          {leftContent}
        </Pressable>
      )}
    </View>
  );
};

export default MainInput;

const styles = StyleSheet.create({
  con: {
    height: PixelPerfect(50),
    width: '100%',
    paddingHorizontal: PixelPerfect(16),
    flexDirection: 'row',
    ...SharedStyles.centred,
    ...SharedStyles.borderRadius,
    borderColor: '#E4E4E4',
    borderWidth: 1,
  },
  textInput: {
    flex: 7,
    padding: 0,
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    textAlign: 'right',
    marginHorizontal: 3,
    color: Colors.black,
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
    ...SharedStyles.centred,
  },
  leftCont: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
