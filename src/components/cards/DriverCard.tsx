import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {StarIcon, UserIcon} from '../../assets/svg/icons';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {fontStyle} from '../../styles/fonts';
import {match} from '../../constants/helpers';
import {SharedStyles} from '../../styles/sharedStyles';

interface Props {
  rate: string; // rete dosn't return
  driver: string; // driver name .. no drivers
  van: string; // van type
  onPress?: () => void;
}
const DriverCard: FC<Props> = ({rate, driver, van}) => {
  return (
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
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  userCard: {
    width: '100%',
    flexDirection: 'row',
    marginTop: match(5, 10),
    backgroundColor: Colors.white,
    borderRadius: PixelPerfect(6),
    paddingHorizontal: PixelPerfect(8),
    paddingTop: PixelPerfect(8),
    borderWidth: 2,
    borderColor: Colors.borderColor,
    paddingBottom: PixelPerfect(16),
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
  reteButton: {
    backgroundColor: Colors.blue,
    borderRadius: PixelPerfect(30),
    padding: PixelPerfect(10),
    ...SharedStyles.centred,
    flexDirection: 'row',
  },
});
