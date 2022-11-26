import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import IconButton from './IconButton';
import {Colors} from '../../styles/stylesConstants';
import {CloseIcon, RefreshIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';

const ResetButton = () => {
  const {t} = useTranslation();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <RefreshIcon />
      <Text style={styles.textReset}>{t('Reset')}</Text>
    </View>
  );
};

export default ResetButton;

const styles = StyleSheet.create({
  textReset: {
    ...SharedStyles.textRegular14,
    color: '#9B9B9B',
    marginLeft: 8,
  },
});
