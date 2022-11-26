import {I18nManager, Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, PixelPerfect} from './stylesConstants';

export const SharedStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1.5,
  },

  centred: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textAlign: {
    textAlign: I18nManager.isRTL ? 'left' : 'left',
  },
  paddingHorizontal: {
    paddingHorizontal: PixelPerfect(20),
  },
  marginHorizontal: {
    marginHorizontal: PixelPerfect(20),
  },
  borderRadius: {
    borderRadius: PixelPerfect(4),
  },

  textSpaceIOS: {
    marginBottom: Platform.OS == 'ios' ? PixelPerfect(8) : 0,
  },
});

export const paddingHorizontal = PixelPerfect(20);
