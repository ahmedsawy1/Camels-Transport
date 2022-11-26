import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import MainButton from '../../components/buttons/MainButton';
import {fontStyle} from '../../styles/fonts';

interface Props {
  onPress: () => void;
  addressName: string;
}
const SetUrLocationContent: FC<Props> = ({onPress, addressName}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.popUp}>
      <View style={styles.popUpButton} />
      <View>
        <Text style={{...fontStyle.Bold14}}>{t('setLocation')}</Text>
        <View style={styles.searchCont}>
          <View style={{flex: 1}}>
            <Text style={styles.textLocationName}>{addressName}</Text>
          </View>

          <MainButton
            title={t('search')}
            style={styles.searchButton}
            styleTitle={{...fontStyle.Regular14}}
          />
        </View>
      </View>
      <MainButton
        onPress={onPress}
        title={t('confirmLocation')}
        style={{backgroundColor: Colors.secondColor}}
      />
    </View>
  );
};

export default SetUrLocationContent;

const styles = StyleSheet.create({
  popUp: {
    backgroundColor: Colors.white,
    borderTopRightRadius: PixelPerfect(10),
    borderTopLeftRadius: PixelPerfect(10),
    borderRadius: PixelPerfect(10),
    paddingBottom: PixelPerfect(40),
    ...SharedStyles.paddingHorizontal,
  },
  popUpButton: {
    height: PixelPerfect(4),
    width: PixelPerfect(50),
    backgroundColor: '#BFBFBF',
    borderRadius: PixelPerfect(10),
    alignSelf: 'center',
    marginTop: PixelPerfect(16),
    marginBottom: PixelPerfect(20),
  },
  textLocationName: {
    ...fontStyle.Regular14,
    color: Colors.secondGray,
  },

  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: PixelPerfect(10),
    marginBottom: PixelPerfect(15),
  },
  searchButton: {
    backgroundColor: '#DEDEDE',
    borderRadius: PixelPerfect(30),
    height: PixelPerfect(30),
  },
});
