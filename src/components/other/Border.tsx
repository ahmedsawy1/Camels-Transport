import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../../styles/stylesConstants';

const Border: FC<{style?: StyleProp<ViewStyle>}> = ({style}) => {
  return <View style={[styles.cont, style]} />;
};

export default Border;

const styles = StyleSheet.create({
  cont: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.borderColor,
  },
});
