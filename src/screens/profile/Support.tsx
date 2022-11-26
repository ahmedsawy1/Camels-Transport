import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {fontStyle} from '../../styles/fonts';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {SupportIcon} from '../../assets/svg/icons';
import MainButton from '../../components/buttons/MainButton';
import MainInput from '../../components/inputs/MainInput';

const Support = () => {
  return (
    <ScrollView>
      <SafeView hasPaddingHorizontal>
        <MainHeader />
        <Text style={styles.textHeader}>{t('technicalSupport')}</Text>
        <View
          style={{flex: 1, alignItems: 'center', paddingTop: PixelPerfect(20)}}>
          <SupportIcon />

          <Text style={styles.textTitle}>{t('youHaveQuestion')}</Text>
          <Text style={styles.textDesc}>{t('weHereToHelp')}</Text>

          <MainInput
            style={styles.input}
            options={{placeholder: t('fullName')}}
          />
          <MainInput
            style={styles.input}
            options={{placeholder: t('typePhone')}}
          />
          <MainInput style={styles.input} options={{placeholder: t('email')}} />

          <MainInput
            style={[styles.input, styles.largeInput]}
            options={{placeholder: t('messageContent'), multiline: true}}
          />

          <MainButton title={t('send')} style={styles.button} />
        </View>
      </SafeView>
    </ScrollView>
  );
};

export default Support;

const styles = StyleSheet.create({
  textHeader: {
    ...fontStyle.Bold20,
    fontSize: PixelPerfect(27),
    marginTop: PixelPerfect(15),
    marginBottom: PixelPerfect(20),
  },
  textTitle: {
    marginTop: PixelPerfect(20),
    ...fontStyle.Bold21,
  },
  textDesc: {
    ...fontStyle.Regular17,
    marginTop: PixelPerfect(10),
    color: '#757575',
    marginBottom: PixelPerfect(22),
  },
  button: {
    backgroundColor: Colors.secondColor,
    marginTop: PixelPerfect(20),
  },
  input: {
    marginBottom: PixelPerfect(8),
  },
  largeInput: {
    height: PixelPerfect(100),
    alignItems: 'flex-start',
    paddingTop: PixelPerfect(8),
  },
});
