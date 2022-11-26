import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckBox from '../utility/CheckBox';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {fontStyle} from '../../styles/fonts';

const CheckBoxButton = ({title, textVal, style, isImage, imageURI}) => {
  return (
    <View style={[styles.cont, style]}>
      <CheckBox styleTitle={{...fontStyle.Medium14}} title={title} />
      <View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        {textVal && <Text style={styles.textVal}>{textVal}</Text>}
        {isImage && (
          <Image
            resizeMode="center"
            source={{uri: imageURI}}
            style={{
              height: PixelPerfect(20),
              width: PixelPerfect(40),
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CheckBoxButton;

const styles = StyleSheet.create({
  cont: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: PixelPerfect(50),
    paddingHorizontal: PixelPerfect(15),
    height: PixelPerfect(48),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textVal: {
    ...fontStyle.Medium14,
    color: Colors.mainColor,
  },
});
