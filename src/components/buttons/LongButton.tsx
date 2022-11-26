import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
// import {ArrowLeftIcon} from '../../assets/svg/icons';

const LongButton = ({title, style}) => {
  return (
    <TouchableOpacity style={[styles.con, style]}>
      <Text style={styles.title}>{title}</Text>
      {/* <ArrowLeftIcon /> */}
    </TouchableOpacity>
  );
};

export default LongButton;

const styles = StyleSheet.create({
  con: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: PixelPerfect(12),
    fontFamily: Fonts.Medium,
    color: Colors.black,
    flex: 1,
    textAlign: 'left',
  },
});
