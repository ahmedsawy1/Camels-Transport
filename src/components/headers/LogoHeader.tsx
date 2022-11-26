import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PixelPerfect} from '../../styles/stylesConstants';

const LogoHeader = () => {
  return (
    <View style={styles.cont}>
      <Image
        style={styles.logoImage}
        source={require('../../assets/images/logo/blue-logo.png')}
      />
    </View>
  );
};

export default LogoHeader;

const styles = StyleSheet.create({
  cont: {
    alignItems: 'center',
  },
  logoImage: {
    height: PixelPerfect(45),
    width: PixelPerfect(85),
    marginTop: PixelPerfect(15),
  },
});
