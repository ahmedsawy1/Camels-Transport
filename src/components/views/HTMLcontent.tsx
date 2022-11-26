import React from 'react';
import HTML from 'react-native-render-html';
import {Dimensions} from 'react-native';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';

const {width} = Dimensions.get('window');
const HtmlContent = ({content}: any) => {
  return (
    <HTML
      tagsStyles={{
        div: {
          paddingHorizontal: 20,
        },
        img: {
          marginHorizontal: 16,
        },
        h1: {fontFamily: Fonts.Medium, marginBottom: 20, color: Colors.black},
        h2: {fontFamily: Fonts.Medium, marginBottom: 20, color: Colors.black},
        h3: {fontFamily: Fonts.Medium, marginBottom: 20, color: Colors.black},
        strong: {fontFamily: Fonts.Medium, marginBottom: 20, fontSize: 17},
        span: {
          fontFamily: Fonts.Regular,
          marginBottom: 5,
          fontSize: PixelPerfect(32),
          textAlign: 'center',
          color: Colors.black,
        },
        p: {
          fontFamily: Fonts.Regular,
          marginBottom: 10,
          fontSize: PixelPerfect(32),
          textAlign: 'center',
          color: Colors.black,
        },
      }}
      source={{html: content}}
      contentWidth={width}
    />
  );
};

export default HtmlContent;
