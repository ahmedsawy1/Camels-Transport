import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {match} from '../../constants/helpers';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {fontStyle} from '../../styles/fonts';
import {t} from 'i18next';
import {CallIcon, StarIcon, UserIcon} from '../../assets/svg/icons';

const DriverFound = ({onPress, driverName}: any) => {
  return (
    <View style={styles.cont}>
      <View style={styles.cardCont}>
        <Text style={styles.title}>{t('driverIsOnWayTU')}</Text>
        <Text style={styles.subTitle}>
          {t('driverFoundAwayFromU', {time: 'ثلاث دقائق'})}
        </Text>

        <Pressable
          onPress={onPress}
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: match(5, 10),
          }}>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <View style={styles.cyrcleUserIconCont}>
              <View style={{marginBottom: PixelPerfect(5)}}>
                <UserIcon />
              </View>
              <View style={styles.ratingCont}>
                <Text
                  style={{
                    ...fontStyle.Regular12,
                    marginHorizontal: 2,
                    marginTop: match(0, 2),
                  }}>
                  4.8
                </Text>
                <StarIcon />
              </View>
            </View>
          </View>
          <View style={{flex: 3}}>
            <Text style={styles.title}>{driverName}</Text>
            <Text style={styles.subTitle}>شاحنه متوسطة</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 1.5,
            }}>
            <TouchableOpacity style={styles.callButton}>
              <CallIcon />
              <Text style={styles.textCall}>{t('call')}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default DriverFound;

const styles = StyleSheet.create({
  cont: {
    height: 100,
    width: '100%',
    ...SharedStyles.paddingHorizontal,
    position: 'absolute',
    bottom: match(70, 80),
  },
  cardCont: {
    padding: PixelPerfect(16),
    backgroundColor: Colors.white,
    borderRadius: PixelPerfect(6),
    alignItems: 'flex-start',
  },
  textSearching: {
    ...fontStyle.Bold21,
  },
  title: {
    ...fontStyle.Bold17,
  },
  subTitle: {
    ...fontStyle.Medium14,
    marginTop: match(0, 7),
    color: Colors.medGray,
    marginBottom: PixelPerfect(10),
  },
  cyrcleUserIconCont: {
    backgroundColor: '#DEDEDE',
    height: PixelPerfect(44),
    width: PixelPerfect(44),
    ...SharedStyles.centred,
    borderRadius: PixelPerfect(22),
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
  },
  callButton: {
    backgroundColor: Colors.blue,
    borderRadius: PixelPerfect(30),
    padding: PixelPerfect(10),
    ...SharedStyles.centred,
    flexDirection: 'row',
  },
  textCall: {
    marginHorizontal: PixelPerfect(10),
    ...fontStyle.Regular14,
    color: Colors.white,
  },
  ratingCont: {
    backgroundColor: '#FAF3E6',
    borderWidth: 1.5,
    borderColor: Colors.white,
    flexDirection: 'row',
    marginBottom: PixelPerfect(-20),
    borderRadius: PixelPerfect(30),
    ...SharedStyles.centred,
    paddingHorizontal: PixelPerfect(4),
    paddingVertical: match(0, 2),
  },
});
