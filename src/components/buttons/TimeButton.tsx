import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';

const TimeButton = ({timeText, style, styleText, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.cont, style]}>
      <Text style={[styles.textTime, styleText]}>{timeText}</Text>
    </TouchableOpacity>
  );
};

export default TimeButton;

const styles = StyleSheet.create({
  cont: {
    paddingVertical: PixelPerfect(15),
    marginBottom: 10,
    borderRadius: PixelPerfect(10),
    paddingHorizontal: PixelPerfect(30),
    borderWidth: 1,
    borderColor: '#DEE1E6',
  },
  textTime: {
    ...SharedStyles.textRegular16,
  },
});
