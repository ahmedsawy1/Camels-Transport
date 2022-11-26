import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {match} from '../../constants/helpers';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {t} from 'i18next';
import {fontStyle} from '../../styles/fonts';
import LottieView from 'lottie-react-native';

const SearchingCard = ({title, subTitle, hasLoader = true}) => {
  return (
    <View style={styles.cont}>
      <View style={styles.textAnimationCont}>
        <Text style={styles.textSearching}>{title ?? t('searching')}</Text>
        <Text style={styles.textSearchingNow}>
          {subTitle ?? t('searchingNow')}
        </Text>

        {hasLoader ? (
          <LottieView
            source={require('../../assets/animation/proggress-bar.json')}
            autoPlay
            loop
            style={{
              height: PixelPerfect(10),
              width: '100%',
              alignSelf: 'center',
              marginTop: PixelPerfect(5),
              marginBottom: PixelPerfect(10),
              maxWidth: '100%',
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default SearchingCard;

const styles = StyleSheet.create({
  cont: {
    height: 100,
    width: '100%',
    ...SharedStyles.paddingHorizontal,
    position: 'absolute',
    bottom: match(30, 50),
  },
  textAnimationCont: {
    padding: PixelPerfect(16),
    backgroundColor: Colors.white,
    borderRadius: PixelPerfect(6),
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  textSearching: {
    ...fontStyle.Bold21,
  },
  textSearchingNow: {
    ...fontStyle.Regular17,
    color: Colors.medGray,
    marginTop: match(0, 7),
  },
});
