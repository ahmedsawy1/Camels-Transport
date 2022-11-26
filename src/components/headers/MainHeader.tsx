import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {ArrowRightIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';
import {useNavigation} from '@react-navigation/native';
import {fontStyle} from '../../styles/fonts';
import {useTranslation} from 'react-i18next';

interface Props {
  title?: string | boolean | any;
  sideTitle?: string;
  pressableWord?: string;
  onWordPress?: () => void;
  onResetPress?: () => void;
  style?: StyleProp<ViewStyle>;
  refreshButton?: boolean;
}

const MainHeader: FC<Props> = ({
  title,
  sideTitle,
  pressableWord,
  onWordPress,
  style,
  refreshButton,
  onResetPress,
}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={[styles.cont, style]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.arrowCont}>
        <ArrowRightIcon />
      </TouchableOpacity>

      {title && <Text style={styles.textTitle}>{title}</Text>}
      {sideTitle && (
        <Text style={styles.sideTitleText}>
          {sideTitle}{' '}
          <Text onPress={onWordPress} style={{color: Colors.mainColor}}>
            {pressableWord}
          </Text>
        </Text>
      )}

      {title && (
        <View style={{height: PixelPerfect(40), width: PixelPerfect(40)}} />
      )}

      {refreshButton && (
        <TouchableOpacity
          onPress={onResetPress}
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          {/* <RefreshIcon height={PixelPerfect(15)} width={PixelPerfect(15)} /> */}
          <Text style={styles.textRefresh}>{t('recovery')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    marginTop: PixelPerfect(25),
    alignItems: 'center',
    width: '100%',
  },
  arrowCont: {},
  sideTitleText: {
    flex: 1,
    textAlign: 'right',
    fontFamily: Fonts.Medium,
    fontSize: PixelPerfect(14),
    color: Colors.black,
  },
  textTitle: {
    ...SharedStyles.textMedium16,
    textAlign: 'center',
    flex: 1,
  },
  textRefresh: {
    ...fontStyle.Regular14,
    color: Colors.grayMain,
    marginLeft: 5,
  },
});
