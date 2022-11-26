import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';

const Separator: FC<{style: StyleProp<ViewStyle>}> = ({style}) => {
  return <View style={[styles.separator, style]} />;
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: Colors.lightGray,
    marginVertical: PixelPerfect(15),
  },
});
