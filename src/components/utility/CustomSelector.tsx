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
import {ArrowDownIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';

interface Props {
  selected: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const CustomSelector: FC<Props> = ({selected, onPress, style}) => {
  return (
    <Pressable style={[styles.con, style]} onPress={onPress}>
      <Text style={styles.selectedText}>{selected}</Text>
      <View style={styles.arrowCon}>
        <ArrowDownIcon fill={'#9093A3'} />
      </View>
    </Pressable>
  );
};

export default CustomSelector;

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
  arrowCon: {
    height: '100%',
    width: PixelPerfect(50),
    ...SharedStyles.centred,
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
