import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PixelPerfect} from '../../styles/stylesConstants';
import {fontStyle} from '../../styles/fonts';

const VanCard = ({vanType}) => {
  return (
    <View style={styles.cont}>
      <Image
        style={{
          height: PixelPerfect(66),
          width: PixelPerfect(66),
          borderRadius: PixelPerfect(4),
          marginRight: PixelPerfect(10),
        }}
        source={{
          uri: 'https://www.isuzujp.com/wp-content/uploads/2022/01/ISUZU-100P-Double-cabin-small-cargo-truck.webp',
        }}
      />

      <View style={{flex: 1}}>
        <Text style={{...fontStyle.Bold17}}>شاحنة ايسوزو</Text>
        <Text style={{...fontStyle.Medium14}}>ابيض</Text>
      </View>

      <View>
        <Text style={{...fontStyle.Medium12}}>لوحة السيارة</Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: PixelPerfect(4),
            padding: PixelPerfect(9),
            marginTop: 2,
          }}>
          <Text style={{...fontStyle.Bold14}}>{vanType}</Text>
        </View>
      </View>
    </View>
  );
};

export default VanCard;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#F5F5F5',
    padding: PixelPerfect(16),
    marginTop: PixelPerfect(16),
    borderRadius: PixelPerfect(4),
    flexDirection: 'row',
  },
});
