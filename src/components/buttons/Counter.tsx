import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {MinusIcon, PlusIcon} from '../../assets/svg/icons';

interface IInput {
  style?: StyleProp<ViewStyle>;
  nubmerProps?: number;
  title: string;
}

const Counter: FC<IInput> = ({style, nubmerProps = 0, title}) => {
  const [number, setNumber] = useState(nubmerProps);

  const decreaseNumber = () => {
    if (number > 0) {
      setNumber(n => n - 1);
    }
  };

  return (
    <View style={[styles.con, style]}>
      <Text style={styles.textTitle}>{title}</Text>

      <TouchableOpacity
        onPress={() => setNumber(n => n + 1)}
        style={[styles.sharedCircle, {backgroundColor: Colors.mainColor}]}>
        <PlusIcon />
      </TouchableOpacity>
      <Text style={styles.number}>{number}</Text>
      <TouchableOpacity style={styles.sharedCircle} onPress={decreaseNumber}>
        <MinusIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  con: {
    paddingVertical: 8,
    width: '100%',
    flexDirection: 'row',
    ...SharedStyles.centred,
  },
  number: {
    ...SharedStyles.textBold16,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    marginHorizontal: 10,
  },
  sharedCircle: {
    height: PixelPerfect(24),
    width: PixelPerfect(24),
    borderRadius: PixelPerfect(15),
    ...SharedStyles.centred,
    backgroundColor: '#F1F1F1',
  },
  textTitle: {
    flex: 1,
    ...SharedStyles.textMedium16,
  },
});
