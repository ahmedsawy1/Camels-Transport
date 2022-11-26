import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontStyle} from '../../styles/fonts';
import {ArrowLeftIcon} from '../../assets/svg/icons';
import {PixelPerfect} from '../../styles/stylesConstants';

const ProfileSection = ({icon, title, style, onPress}) => {
  return (
    <Pressable style={[styles.cont, style]} onPress={onPress}>
      <View style={styles.sharedView}>{icon}</View>

      <Text style={styles.textTitle}>{title}</Text>
      <View style={[styles.sharedView, {alignItems: 'flex-end'}]}>
        <ArrowLeftIcon />
      </View>
    </Pressable>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    ...fontStyle.Regular17,
    flex: 9,
  },
  sharedView: {
    flex: 1,
    justifyContent: 'center',
  },
});
