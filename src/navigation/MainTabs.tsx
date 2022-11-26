import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../styles/stylesConstants';
import {SharedStyles} from '../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../constants/interfaces';
import {useTranslation} from 'react-i18next';
import {
  BlackClock,
  HomeIcon,
  MessageIcon,
  SearchIcon,
  UserIcon,
  UserIcon2,
} from '../assets/svg/icons';

const MainTabs: FC<{active: string; style?: StyleProp<ViewStyle>}> = ({
  active,
  style,
}) => {
  const styles = useStyles(active);
  const navigation: NavigationProps = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={[styles.cont, style]}>
      {/*  */}
      <Pressable
        style={[styles.tabCont]}
        onPress={() => navigation.navigate('HomeScreen')}>
        <View style={styles.tabIconCont}>
          <HomeIcon
            height={PixelPerfect(29)}
            width={PixelPerfect(29)}
            fill={active == 'HomeScreen' ? Colors.black : Colors.secondGray}
          />
        </View>
        <Text
          style={[
            styles.tabTitle,
            active == 'HomeScreen' && {color: Colors.black},
          ]}>
          {t('main')}
        </Text>
      </Pressable>

      {/*  */}
      <Pressable
        style={styles.tabCont}
        onPress={() => navigation.navigate('PreviousOrders')}>
        <View style={styles.tabIconCont}>
          <BlackClock
            fill={active == 'PreviousOrders' ? Colors.black : Colors.secondGray}
          />
        </View>
        <Text
          style={[
            styles.tabTitle,
            active == 'PreviousOrders' && {color: Colors.black},
          ]}>
          {t('PreviousOrders')}
        </Text>
      </Pressable>

      {/*  */}
      <Pressable
        style={styles.tabCont}
        onPress={() => navigation.navigate('MyProfile')}>
        <View style={styles.tabIconCont}>
          <UserIcon2
            fill={active == 'MyProfile' ? Colors.black : Colors.secondGray}
          />
        </View>
        <Text
          style={[
            styles.tabTitle,
            active == 'MyProfile' && {color: Colors.black},
          ]}>
          {t('profile')}
        </Text>
      </Pressable>
    </View>
  );
};

export default MainTabs;

const useStyles = (activeTab: string) =>
  StyleSheet.create({
    cont: {
      height: PixelPerfect(89),
      width: '100%',
      flexDirection: 'row',
      backgroundColor: Colors.white,
      paddingTop: PixelPerfect(9),
      overflow: 'hidden',

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 5,
    },
    tabCont: {
      flex: 1,
      ...SharedStyles.centred,
    },
    tabTitle: {
      fontSize: PixelPerfect(13),
      fontFamily: Fonts.Medium,
      color: Colors.secondGray,
      flex: 1,
    },
    tabIconCont: {
      flex: 1,
      justifyContent: 'center',
    },
  });
