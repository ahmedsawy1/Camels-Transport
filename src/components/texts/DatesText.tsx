import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontStyle} from '../../styles/fonts';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '../../store/hook';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DatesText = () => {
  console.log('Render DatesText');

  const {t} = useTranslation();
  const {oneDay, dayFrom, dayTo, onlyOneDay, oneTime} = useAppSelector(
    state => state.dateSlice,
  );

  const firstDate =
    dayFrom == 0 ? 0 : dayFrom?.toISOString()?.slice(0, 10)?.replace(/-/g, '/');

  const secondDate =
    dayTo == 0 ? 0 : dayTo?.toISOString()?.slice(0, 10)?.replace(/-/g, '/');

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {onlyOneDay && (
        <View style={styles.oneDateCont}>
          <Text style={styles.textTitle}>{t('bookingDate')}</Text>
          {oneDay != 0 && (
            <Text style={styles.textDate}>
              {oneDay?.toISOString()?.slice(0, 10)?.replace(/-/g, '/')}
            </Text>
          )}
          {oneTime != 0 && <Text style={styles.textDate}>{oneTime}</Text>}
        </View>
      )}

      {!onlyOneDay && (
        <View style={styles.twoDatesCont}>
          <View style={styles.sharedSingleDateCont}>
            <Text style={styles.textTitle}>{t('bookingStartDate')}</Text>
            {dayFrom != 0 && <Text style={styles.textDate}>{firstDate}</Text>}
            {dayFrom != 0 && oneTime != 0 && (
              <Text style={styles.textDate}>{oneTime}</Text>
            )}
          </View>

          <AntDesign
            name="arrowleft"
            color={'#C6C6C6'}
            size={PixelPerfect(20)}
          />

          <View style={styles.sharedSingleDateCont}>
            <Text style={styles.textTitle}>{t('bookingEndDate')}</Text>
            {dayTo != 0 && <Text style={styles.textDate}>{secondDate}</Text>}
            {dayTo != 0 && oneTime != 0 && (
              <Text style={styles.textDate}>{oneTime}</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
``;

export default DatesText;

const styles = StyleSheet.create({
  oneDateCont: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  twoDatesCont: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sharedSingleDateCont: {
    alignItems: 'flex-start',
  },
  textDate: {
    ...fontStyle.Bold16,
    color: Colors.mainColor,
    marginBottom: Platform.OS == 'ios' ? 4 : 2,
  },
  textTitle: {
    ...fontStyle.Medium14,
    marginBottom: Platform.OS == 'ios' ? PixelPerfect(20) : 8,
  },
});
