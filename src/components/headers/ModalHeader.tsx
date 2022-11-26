import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {CloseIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';
import {fontStyle} from '../../styles/fonts';

const ModalHeader: FC<{
  onClosePress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}> = ({onClosePress, title, style}) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.cont, style]}>
      <TouchableOpacity onPress={onClosePress} style={{flex: 1}}>
        <CloseIcon />
      </TouchableOpacity>

      <Text style={styles.textTitle}>{title}</Text>

      <View style={{flex: 1}} />
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SharedStyles.paddingHorizontal,
    paddingVertical: 10,
  },
  textTitle: {
    ...fontStyle.Regular20,
  },
});
