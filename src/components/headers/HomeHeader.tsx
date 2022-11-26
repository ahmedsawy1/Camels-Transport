import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SearchIcon} from '../../assets/svg/icons';
import {useTranslation} from 'react-i18next';
import {SharedStyles} from '../../styles/sharedStyles';

const HomeHeader: FC<{onSearchPress: () => void}> = ({
  onSearchPress,
  style,
}) => {
  const {t} = useTranslation();

  return (
    <View style={[styles.cont, style]}>
      <Image
        style={styles.logoImage}
        source={require('../../assets/images/logo/white-logo.png')}
      />
      <TouchableOpacity style={styles.searchBar} onPress={onSearchPress}>
        <View style={{marginHorizontal: PixelPerfect(15)}}>
          <SearchIcon fill={'#C9C9C9'} />
        </View>
        <Text style={styles.textPlaceholder}>{t('searchByDestination')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  logoImage: {
    height: PixelPerfect(45),
    width: PixelPerfect(85),
    marginBottom: 20,
  },
  cont: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor,
    paddingVertical: PixelPerfect(15),
    borderBottomRightRadius: PixelPerfect(35),
    borderBottomLeftRadius: PixelPerfect(35),
    marginBottom: 20,
  },
  searchBar: {
    borderRadius: PixelPerfect(50),
    backgroundColor: Colors.white,
    width: '87%',
    alignSelf: 'center',
    paddingVertical: PixelPerfect(12),
    position: 'absolute',
    bottom: PixelPerfect(-22),
    flexDirection: 'row',
    alignItems: 'center',
    ...SharedStyles.shadow,
    elevation: 1,
  },
  textPlaceholder: {
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
    fontSize: PixelPerfect(13),
  },
});
