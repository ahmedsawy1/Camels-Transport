import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

interface Props {
  onPress: () => void;
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const IconButton: FC<Props> = ({onPress, children, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.cont, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  cont: {
    height: PixelPerfect(48),
    width: PixelPerfect(48),
    borderRadius: PixelPerfect(24),
    ...SharedStyles.centred,
    backgroundColor: Colors.white,
  },
});
