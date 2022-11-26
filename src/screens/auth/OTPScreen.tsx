import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import MainButton from '../../components/buttons/MainButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import SafeView from '../../components/views/SafeView';
import {paddingHorizontal, SharedStyles} from '../../styles/sharedStyles';
import {NavigationProps} from '../../constants/interfaces';
import {useTranslation} from 'react-i18next';
import MainHeader from '../../components/headers/MainHeader';
import {fontStyle} from '../../styles/fonts';
import MainInput from '../../components/inputs/MainInput';
import {match} from '../../constants/helpers';
import {useDispatch} from 'react-redux';
import {confirmOtp, setUserName} from '../../../store/actions/authActions';
import PopUp from '../../components/views/PopUp';
import {showMessage} from 'react-native-flash-message';

const OTPScreen = () => {
  const navigation: NavigationProps = useNavigation();
  const {t} = useTranslation();
  const {params} = useRoute();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    seconds: 0,
    minutes: 0,
    otpCode: __DEV__ ? '1111' : '',
    userName: '',
  });

  // Timer
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (state.seconds > 0) {
        setState(s => ({...s, seconds: state.seconds - 1}));
      }
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          clearInterval(myInterval);
        } else {
          setState(s => ({...s, seconds: 59, minutes: state.minutes - 1}));
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const [namePopUp, setNamePopUp] = useState(false);

  return (
    <SafeView style={styles.cont}>
      <MainHeader />
      <Text style={styles.title}>{t('activationCode')}</Text>
      <Text style={styles.subTitle}>
        {t('enterCodeSent', {phone: params.mobileNumber})}
      </Text>
      <MainInput
        options={{
          placeholder: t('enterCode'),
          onChangeText: txt => setState(s => ({...s, otpCode: txt})),
          keyboardType: 'numeric',
        }}
        style={{marginBottom: PixelPerfect(18)}}
      />

      <MainButton
        title={t('continue')}
        style={styles.button}
        onPress={() => {
          dispatch(
            confirmOtp({
              body: {
                mobile: params.mobileNumber,
                otp: state.otpCode,
                password: params.password,
              },
              cb: data => {
                if (data.name == null) {
                  setNamePopUp(true);
                } else {
                  navigation.navigate('HomeScreen');
                  setUserName({body: {name: data.name}});
                }
              },
            }),
          );
        }}
      />

      {state.seconds == 0 && state.minutes == 0 ? (
        <Text
          style={[styles.textResend]}
          onPress={() => setState(s => ({...s, minutes: 1, seconds: 59}))}>
          {t('resendCode')}
        </Text>
      ) : (
        <Text style={[styles.textResend, {color: Colors.medGray}]}>
          {t('sendAfter')} {state.seconds} : {state.minutes}
        </Text>
      )}

      <PopUp
        styleTouchable={{flex: 2}}
        style={{
          ...SharedStyles.paddingHorizontal,
          alignItems: 'center',
        }}
        visible={namePopUp}>
        <Text
          style={{
            ...fontStyle.Medium15,
            marginBottom: PixelPerfect(30),
            marginTop: PixelPerfect(30),
          }}>
          رجاء قم بادخال اسمك
        </Text>
        <MainInput
          options={{
            placeholder: 'الاسم',
            onChangeText: txt => setState(s => ({...s, userName: txt})),
          }}
          style={{marginBottom: PixelPerfect(18)}}
        />
        <MainButton
          title={t('continue')}
          style={styles.button}
          onPress={() => {
            if (state.userName.length < 3) {
              showMessage({
                type: 'danger',
                message: 'اسم المستخدم يجب ان يكون ثلاث احرف علي الاقل',
              });
            } else {
              setNamePopUp(false);
              navigation.navigate('HomeScreen');
              dispatch(
                setUserName({
                  body: {
                    name: state.userName,
                  },
                  // cb: () => console.log('updated'),
                }),
              );
            }
          }}
        />
      </PopUp>
    </SafeView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  cont: {
    ...SharedStyles.paddingHorizontal,
  },
  title: {
    paddingTop: match(100, 65),
    ...fontStyle.Bold32,
    marginBottom: PixelPerfect(20),
  },
  subTitle: {
    ...fontStyle.Medium16,
    marginBottom: PixelPerfect(18),
  },
  button: {
    marginBottom: PixelPerfect(20),
  },
  textResend: {
    color: Colors.secondColor,
    textAlign: 'center',
    fontFamily: Fonts.Bold,
    fontSize: PixelPerfect(17),
    marginVertical: PixelPerfect(30),
    marginTop: PixelPerfect(100),
  },
});
