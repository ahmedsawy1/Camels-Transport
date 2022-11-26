import {I18nManager, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import SplashScreen from 'react-native-splash-screen';

import RNRestart from 'react-native-restart';
// import {RootState} from './store/store';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import Navigation from './navigation/navigation';
// import messaging from '@react-native-firebase/messaging';
// import {AsyncKeys, saveItem} from '../constants/helpers';
// import {initAction} from '../store/actions/initActions';
import './localization/i18n.config.ts';
import {Colors} from './styles/stylesConstants';
import {AsyncKeys, getItem} from './constants/helpers';
import {switchSignIn} from '../store/reducers/authReducer';
import {useAppDispatch, useAppSelector} from '../store/hook';
import {useDispatch} from 'react-redux';
export const navigationRef = createNavigationContainerRef();

const AppInitializer = () => {
  const [routeName, setRouteName] = useState('');
  const dispatch = useAppDispatch();

  const initApp = async () => {
    const token = await getItem(AsyncKeys.AUTH_TOKEN);
    if (token) {
      dispatch(switchSignIn(true));
    }
  };

  useEffect(() => {
    initApp().finally(() => {
      SplashScreen.hide();
    });
  }, []);

  const forceRTLFN = () => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  };

  useEffect(() => {
    forceRTLFN();
  }, []);

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     // console.log('Authorization status:', authStatus);
  //   }
  //   const knowPre = await messaging().requestPermission({
  //     sound: false,
  //     announcement: true,
  //     // ... other permission settings
  //   });
  // }

  // const getToken = async () => {
  //   try {
  //     const token = await messaging().getToken();

  //     console.log('============= success token =============');
  //     console.log(token);
  //     console.log('============= token =============');

  //     await saveItem(AsyncKeys.DEVICE_TOKEN, {device_token: token});
  //   } catch (error) {
  //     console.log('======== error post token ==========');
  //     console.log(error);
  //     console.log('======== error post token ==========');
  //   }
  // };

  // const notficationListener = async () => {
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });
  // };

  // useEffect(() => {
  //   requestUserPermission();
  //   getToken();
  //   notficationListener();
  // }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setRouteName(navigationRef.getCurrentRoute().name);
      }}
      onStateChange={async () => {
        const previousRouteName = routeName;
        const currentRouteName = navigationRef.getCurrentRoute().name;
        console.log('route', currentRouteName);
        setRouteName(currentRouteName);
      }}>
      {routeName == 'SearchScreen' && (
        <StatusBar backgroundColor={Colors.mainColor} />
      )}
      <Navigation routeName={routeName} />
    </NavigationContainer>
  );
};

export default AppInitializer;

const styles = StyleSheet.create({});
