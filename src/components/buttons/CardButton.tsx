import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, phoneWidth, PixelPerfect} from '../../styles/stylesConstants';
import {paddingHorizontal, SharedStyles} from '../../styles/sharedStyles';
import {TickIconInCyrcle} from '../../assets/svg/icons';
import {fontStyle} from '../../styles/fonts';

const CardButton = ({
  title,
  subTitle,
  description,
  style,
  isSelected,
  styleTitle,
  onPress,
}) => {
  const styles = useStyles(isSelected);

  return (
    <TouchableOpacity style={[styles.cont, style]} onPress={onPress}>
      <View style={{flex: 5, justifyContent: 'center'}}>
        <Text style={[styles.textTitle, styleTitle]}>{title}</Text>

        {subTitle && (
          <Text style={[styles.textSubTitle, {marginTop: PixelPerfect(8)}]}>
            {subTitle}
          </Text>
        )}

        {description && <Text style={styles.textSubTitle}>{description}</Text>}
      </View>
      <View style={{flex: 1, ...SharedStyles.centred}}>
        {isSelected && <TickIconInCyrcle />}
      </View>
    </TouchableOpacity>
  );
};

export default CardButton;

const useStyles = (isSelected: boolean) =>
  StyleSheet.create({
    cont: {
      flexDirection: 'row',
      width: (phoneWidth - paddingHorizontal * 3) / 2,
      marginRight: paddingHorizontal,
      borderWidth: 1,
      borderRadius: PixelPerfect(8),
      paddingVertical: PixelPerfect(8),
      paddingHorizontal: PixelPerfect(12),
      borderColor: isSelected ? Colors.green : '#DEDEDE',
    },
    textTitle: {
      ...fontStyle.Bold17,
      //   marginBottom: PixelPerfect(8),
    },
    textSubTitle: {
      ...fontStyle.Regular17,
      color: Colors.secondGray,
      marginBottom: PixelPerfect(8),
    },
  });
