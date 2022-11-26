import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import {useTranslation} from 'react-i18next';
import {PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {fontStyle} from '../../styles/fonts';
import MainInput from '../../components/inputs/MainInput';
import MainButton from '../../components/buttons/MainButton';
import {NavigationProps} from '../../constants/interfaces';
import {useNavigation} from '@react-navigation/native';
import MainHeader from '../../components/headers/MainHeader';

const EditPhone = () => {
  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();
  return (
    <SafeView style={styles.cont}>
      <MainHeader />

      <Text style={styles.textTitle}>{t('changePhoneNumber')}</Text>
      <Text style={styles.textsubTitle}>{t('enterPhone')}</Text>

      <MainInput
        options={{placeholder: t('entrUrPhone')}}
        style={{marginBottom: PixelPerfect(18)}}
      />
      <MainButton
        title={t('edit')}
        onPress={() => navigation.navigate('OTPScreen')}
      />
    </SafeView>
  );
};

export default EditPhone;

const styles = StyleSheet.create({
  cont: {
    ...SharedStyles.paddingHorizontal,
  },
  textTitle: {
    ...fontStyle.Bold32,
    marginBottom: PixelPerfect(20),
    paddingTop: PixelPerfect(70),
  },
  textsubTitle: {
    ...fontStyle.Medium16,
    marginBottom: PixelPerfect(18),
  },
});
