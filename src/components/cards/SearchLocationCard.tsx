import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {fontStyle} from '../../styles/fonts';
import {useTranslation} from 'react-i18next';
import {SearchIcon, SmallMarker} from '../../assets/svg/icons';
import MainButton from '../buttons/MainButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../constants/interfaces';

const SearchLocationCard = ({onSearchPress}) => {
  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();
  return (
    <View style={styles.cont}>
      <Text style={styles.textWhere}>{t('whereDoUWantToMove')}</Text>
      <View style={styles.searchCont}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={onSearchPress}>
          <SearchIcon />
          <Text style={styles.textSearchLocation}>
            {t('searchViaLocation')}
          </Text>
        </TouchableOpacity>
        <MainButton
          onPress={() => navigation.navigate('NewRequest')}
          title={t('selectFromMap')}
          style={styles.button}
          styleTitle={styles.buttonTitle}
          buttonIcon={<SmallMarker fill={Colors.white} />}
        />
      </View>
    </View>
  );
};

export default SearchLocationCard;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: Colors.white,
    padding: PixelPerfect(15),
    borderRadius: PixelPerfect(5),
  },
  textWhere: {
    ...fontStyle.Bold21,
    marginBottom: PixelPerfect(25),
  },
  searchCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSearchLocation: {
    ...fontStyle.Regular17,
    marginHorizontal: 5,
    color: Colors.medGray,
  },
  button: {
    height: PixelPerfect(35),
    width: '50%',
    backgroundColor: Colors.blue,
    borderRadius: PixelPerfect(50),
  },
  buttonTitle: {
    fontSize: PixelPerfect(15),
    marginLeft: 10,
    fontFamily: Fonts.Regular,
  },
});
