import {StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/views/SafeView';
import {useTranslation} from 'react-i18next';
import {PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {fontStyle} from '../../styles/fonts';
import MainInput from '../../components/inputs/MainInput';
import MainButton from '../../components/buttons/MainButton';
import {NavigationProps} from '../../constants/interfaces';
import {useNavigation} from '@react-navigation/native';
import {loginAction} from '../../../store/actions/authActions';
import {useAppDispatch, useAppSelector} from '../../../store/hook';
import {showMessage} from 'react-native-flash-message';
import {regexSudiNumber} from '../../constants/regex';

const LoginScreen = () => {
  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();
  const {isSignIn} = useAppSelector(state => state.authSlice);
  const dispatch = useAppDispatch();

  const [mobileNumber, setMobileNumber] = useState(__DEV__ ? '0563533002' : '');
  // const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('11223344');

  return (
    <SafeView style={styles.cont}>
      <Text style={styles.textTitle}>{t('hello')}</Text>
      <Text style={styles.textsubTitle}>{t('enterPhone')}</Text>

      <MainInput
        options={{
          value: mobileNumber,
          onChangeText: txt => setMobileNumber(txt),
          placeholder: t('entrUrPhone'),
          keyboardType: 'numeric',
        }}
        style={{marginBottom: PixelPerfect(18)}}
      />

      <MainButton
        title={t('Login')}
        onPress={() => {
          if (mobileNumber.match(regexSudiNumber)) {
            dispatch(
              loginAction({
                body: {
                  mobile: mobileNumber,
                  password: password,
                },
                cb: () =>
                  navigation.navigate('OTPScreen', {mobileNumber, password}),
              }),
            );
            // navigation.navigate('OTPScreen', {mobileNumber, password});
          } else {
            showMessage({type: 'danger', message: t('invalidSudiNumber')});
          }
        }}
      />
    </SafeView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  cont: {
    paddingTop: PixelPerfect(150),
    ...SharedStyles.paddingHorizontal,
  },
  textTitle: {
    ...fontStyle.Bold32,
    marginBottom: PixelPerfect(20),
  },
  textsubTitle: {
    ...fontStyle.Medium16,
    marginBottom: PixelPerfect(18),
  },
});
