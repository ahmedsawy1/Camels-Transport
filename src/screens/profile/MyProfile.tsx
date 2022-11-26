import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SafeView from '../../components/views/SafeView';
import ProfileSection from '../../components/buttons/ProfileSection';
import {fontStyle} from '../../styles/fonts';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {
  HelpIcon,
  LogoutIcon,
  MessageIcon,
  PenIcon,
  PhoneIcon,
  ReportIcon,
  ShieldIcon,
} from '../../assets/svg/icons';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../constants/interfaces';
import {AsyncKeys, getItem, match, removeItem} from '../../constants/helpers';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store/hook';
import {switchSignIn} from '../../../store/reducers/authReducer';
import PopUp from '../../components/views/PopUp';
import MainInput from '../../components/inputs/MainInput';
import MainButton from '../../components/buttons/MainButton';
import {showMessage} from 'react-native-flash-message';
import {setUserName} from '../../../store/actions/authActions';

const MyProfile = () => {
  const navigation: NavigationProps = useNavigation();
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  // To do with redux persist
  // const {userName} = useAppSelector(s => s.authSlice);

  const [userData, setUserData] = useState('');
  const getUserData = async () => {
    const userData = await getItem(AsyncKeys.USER_DATA);
    setUserData(userData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [state, setState] = useState({
    userName: '',
  });
  const [namePopUp, setNamePopUp] = useState(false);

  return (
    <SafeView style={styles.cont}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: match(15, 20),
          justifyContent: 'space-between',
        }}>
        <Text style={styles.textUserName}>{userData.name}</Text>
        <Pressable onPress={() => setNamePopUp(true)}>
          <PenIcon fill={Colors.black} />
        </Pressable>
      </View>

      <Text style={styles.textTitle}>{t('settings')}</Text>
      <ProfileSection
        style={{marginBottom: match(20, 25)}}
        title={t('changePhoneNumber')}
        icon={<PhoneIcon />}
        onPress={() => navigation.navigate('EditPhone')}
      />
      <Text style={styles.textTitle}>{t('technicalSupport')}</Text>
      <ProfileSection
        title={t('commonQuestions')}
        icon={<HelpIcon />}
        style={{marginBottom: match(8, 12)}}
        onPress={() => navigation.navigate('FAQs')}
      />
      <ProfileSection
        title={t('support')}
        icon={<MessageIcon />}
        style={{marginBottom: match(20, 25)}}
        onPress={() => navigation.navigate('Support')}
      />
      <Text style={styles.textTitle}>{t('otherLinks')}</Text>
      <ProfileSection
        title={t('termsAndConditions')}
        icon={<ReportIcon />}
        style={{marginBottom: match(8, 12)}}
        onPress={() => navigation.navigate('Terms')}
      />
      <ProfileSection
        title={t('privacyPolicy')}
        icon={<ShieldIcon />}
        style={{marginBottom: match(8, 12)}}
        onPress={() => navigation.navigate('Privacy')}
      />
      <ProfileSection
        onPress={async () => {
          dispatch(switchSignIn(false));
          await removeItem(AsyncKeys.AUTH_TOKEN);
          await removeItem(AsyncKeys.USER_DATA);
          setTimeout(() => {
            navigation.navigate('LoginScreen');
          }, 500);
        }}
        title={t('signOut')}
        icon={<LogoutIcon />}
      />

      <PopUp
        onRequestClose={() => setNamePopUp(false)}
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
          title="حفظ"
          style={styles.button}
          onPress={() => {
            if (state.userName.length < 3) {
              showMessage({
                type: 'danger',
                message: 'اسم المستخدم يجب ان يكون ثلاث احرف علي الاقل',
              });
            } else {
              setNamePopUp(false);
              dispatch(
                setUserName({
                  body: {
                    name: state.userName,
                  },
                  cb: () => {
                    navigation.navigate('HomeScreen');
                    showMessage({
                      type: 'success',
                      message: 'تم تحديث الاسم بنجاح',
                    });
                  },
                }),
              );
            }
          }}
        />
      </PopUp>
    </SafeView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  cont: {
    ...SharedStyles.paddingHorizontal,
    paddingTop: match(50, 80),
  },
  textUserName: {
    ...fontStyle.Bold32,
  },
  textTitle: {
    ...fontStyle.Bold17,
    marginBottom: PixelPerfect(10),
  },
});
