import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {fontStyle} from '../../styles/fonts';
import {useTranslation} from 'react-i18next';
import Border from '../other/Border';
import {
  ArrowDownIcon,
  LocationIcon,
  SmallMarker,
  StarIcon,
  UserIcon,
} from '../../assets/svg/icons';
import {arrOfMonthes, match} from '../../constants/helpers';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../constants/interfaces';
import {useAppDispatch} from '../../../store/hook';
import {showService} from '../../../store/actions/servicesActions';

interface Props {
  from: string; // address name
  to: string; // address name
  rate: string; // rete dosn't return
  updated_at: string;

  driver: string; // driver name .. no drivers
  van: string; // van type
  total_amount: number;
  id: number;
  onPress: () => void;
}

const OrderCard: FC<Props> = ({
  from,
  to,
  rate,
  updated_at,
  driver,
  van,
  total_amount,
  id,
  onPress,
}) => {
  const {t} = useTranslation();

  const newDate = new Date(updated_at);
  const date = newDate.getDate() + ' ' + arrOfMonthes[newDate.getMonth()]?.en;
  const naviagtion: NavigationProps = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <Pressable
      style={styles.cont}
      onPress={() => {
        naviagtion.navigate('RequestProccess', {orderId: id});
        dispatch(
          showService({
            id,
            cb: (res, data) => {},
          }),
        );
        // console.log(id);
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{...fontStyle.Bold21}}>
          {total_amount} {t('SAR')}
        </Text>
        <Text style={{...fontStyle.Medium17, color: Colors.medGray}}>
          {date}
        </Text>
      </View>

      <Border
        style={{marginTop: PixelPerfect(16), marginBottom: PixelPerfect(10)}}
      />

      <View
        style={{borderRadius: PixelPerfect(6), flex: 1, overflow: 'hidden'}}>
        <View
          style={[styles.sharedLocationCont, {paddingTop: PixelPerfect(10)}]}>
          <View style={{flex: 0.1, alignItems: 'center'}}>
            <LocationIcon />
          </View>
          <View style={styles.locationTextCont}>
            <Text style={styles.textTitle}>{t('startLocation')}</Text>
            <Text style={styles.textSubTitle}>{from}</Text>
          </View>
        </View>

        <View style={styles.arrowCont}>
          <ArrowDownIcon />
        </View>
        <View
          style={[
            styles.sharedLocationCont,
            {paddingBottom: PixelPerfect(10)},
          ]}>
          <View style={{flex: 0.1, alignItems: 'center'}}>
            <SmallMarker
              fill={Colors.blue}
              height={PixelPerfect(20)}
              width={PixelPerfect(17)}
            />
          </View>
          <View style={styles.locationTextCont}>
            <Text style={styles.textTitle}>{t('endLocation')}</Text>
            <Text style={styles.textSubTitle}>{to}</Text>
          </View>
        </View>
      </View>

      <View style={styles.userCard}>
        <View
          style={{
            justifyContent: 'center',
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
                {rate}
              </Text>
              <StarIcon />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            paddingLeft: PixelPerfect(12),
          }}>
          <Text style={styles.title}>{driver}</Text>
          <Text style={styles.subTitle}>{van}</Text>
        </View>
        {false && (
          <View
            style={{
              justifyContent: 'center',
              flex: 1.5,
            }}>
            <TouchableOpacity style={styles.reteButton}></TouchableOpacity>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  cont: {
    ...SharedStyles.shadow,
    backgroundColor: Colors.white,
    borderRadius: PixelPerfect(9),
    marginTop: PixelPerfect(16),
    padding: PixelPerfect(16),
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
    paddingHorizontal: PixelPerfect(15),
  },
  locationTextCont: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: PixelPerfect(10),
  },

  textTitle: {
    ...fontStyle.Medium13,
    color: Colors.medGray,
  },
  textSubTitle: {
    ...fontStyle.Regular17,
    marginTop: match(0, 2),
  },

  title: {
    ...fontStyle.Bold17,
    marginTop: match(3, 7),
  },
  subTitle: {
    ...fontStyle.Medium14,
    marginTop: match(0, 7),
    color: Colors.medGray,
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
  reteButton: {
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
  userCard: {
    width: '100%',
    flexDirection: 'row',
    marginTop: match(5, 10),
    backgroundColor: '#F5F5F5',
    borderRadius: PixelPerfect(6),
    paddingHorizontal: PixelPerfect(8),
    paddingTop: PixelPerfect(8),
    paddingBottom: PixelPerfect(16),
  },
});
