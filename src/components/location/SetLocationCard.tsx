import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {match} from '../../constants/helpers';
import {paddingHorizontal, SharedStyles} from '../../styles/sharedStyles';
import {ArrowDownIcon, LocationIcon, SmallMarker} from '../../assets/svg/icons';
import {t} from 'i18next';
import {fontStyle} from '../../styles/fonts';

const SetLocationCard = ({currentLocation, dropOffLocation, onChangePress}) => {
  return (
    <View style={styles.cont}>
      <View
        style={{borderRadius: PixelPerfect(6), flex: 1, overflow: 'hidden'}}>
        <View
          style={[styles.sharedLocationCont, {paddingTop: PixelPerfect(10)}]}>
          <View style={{flex: 0.1}}>
            <LocationIcon />
          </View>
          <View style={styles.locationTextCont}>
            <Text style={styles.textTitle}>{t('startLocation')}</Text>
            <Text style={styles.textSubTitle}>{currentLocation}</Text>
          </View>
          <Text style={styles.textChange} onPress={onChangePress}>
            {t('change')}
          </Text>
        </View>

        <View style={styles.arrowCont}>
          <ArrowDownIcon />
        </View>
        <View
          style={[
            styles.sharedLocationCont,
            {paddingBottom: PixelPerfect(10)},
          ]}>
          <View style={{flex: 0.1}}>
            <SmallMarker
              fill={Colors.blue}
              height={PixelPerfect(20)}
              width={PixelPerfect(17)}
            />
          </View>
          <View style={styles.locationTextCont}>
            <Text style={styles.textTitle}>{t('endLocation')}</Text>
            <Text style={styles.textSubTitle}>{dropOffLocation}</Text>
          </View>
          <Text style={styles.textChange} onPress={onChangePress}>
            {t('change')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SetLocationCard;

const styles = StyleSheet.create({
  cont: {
    position: 'absolute',
    top: match(130, 135),
    padding: PixelPerfect(8),
    ...SharedStyles.paddingHorizontal,
    width: '100%',
  },
  sharedLocationCont: {
    backgroundColor: Colors.white,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PixelPerfect(10),
    paddingBottom: 4,
  },
  arrowCont: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: PixelPerfect(10),
  },
  locationTextCont: {
    flex: 1,
    alignItems: 'flex-start',
  },
  textChange: {
    marginRight: PixelPerfect(8),
    ...fontStyle.Medium12,
    color: Colors.secondColor,
  },
  textTitle: {
    ...fontStyle.Medium13,
    color: Colors.medGray,
  },
  textSubTitle: {
    ...fontStyle.Regular17,
    marginTop: match(2, 4),
  },
});
