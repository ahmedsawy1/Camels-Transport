import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {MapIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';

interface Props {
  selected: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const LocationSelector: FC<Props> = ({selected, onPress, style}) => {
  return (
    <Pressable style={[styles.con, style]} onPress={onPress}>
      <Text style={styles.selectedText}>{selected}</Text>
      <View style={styles.mapIconCont}>
        <MapIcon />
      </View>
    </Pressable>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  con: {
    height: PixelPerfect(48),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: PixelPerfect(50),
    overflow: 'hidden',
    alignItems: 'center',
  },
  mapIconCont: {
    height: PixelPerfect(35),
    width: PixelPerfect(35),
    backgroundColor: '#B1B1B1',
    ...SharedStyles.centred,
    marginRight: PixelPerfect(7),
    borderRadius: PixelPerfect(50),
  },
  selectedText: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
    flex: 1,
    marginHorizontal: PixelPerfect(28),
    textAlign: 'left',
  },
});
