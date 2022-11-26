import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import {fontStyle} from '../../styles/fonts';
import {SharedStyles} from '../../styles/sharedStyles';
import {PixelPerfect} from '../../styles/stylesConstants';
import {match} from '../../constants/helpers';
import {MapIcon} from '../../assets/svg/icons';

const ViewButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.cont} onPress={onPress}>
      <MapIcon />
      <Text style={styles.title}>{t('locateFromMap')}</Text>
    </TouchableOpacity>
  );
};

export default ViewButton;

const styles = StyleSheet.create({
  title: {
    ...fontStyle.Regular14,
    marginHorizontal: PixelPerfect(8),
  },
  cont: {
    paddingVertical: match(12, 15),
    ...SharedStyles.centred,
    backgroundColor: '#FAF3E6',
    flexDirection: 'row',
  },
});
