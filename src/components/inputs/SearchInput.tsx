import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {SearchIcon} from '../../assets/svg/icons';
import {useTranslation} from 'react-i18next';

interface Props {
  options?: TextInputProps & {ref?: (ref: any) => void};
  styleTextInput?: StyleProp<TextStyle>;
  onCancelPress: () => void;
  inputRef: any;
  onSearchPress: () => void;
  hasCancel?: boolean;
  iconColor?: boolean | string;
}

const SearchInput: FC<Props> = ({
  options,
  styleTextInput,
  onCancelPress,
  inputRef,
  onSearchPress,
  hasCancel,
  iconColor,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.greatCont}>
      <View style={styles.searchBar}>
        <TouchableOpacity
          style={{marginLeft: PixelPerfect(15)}}
          onPress={onSearchPress}>
          <SearchIcon fill={iconColor ? iconColor : '#C9C9C9'} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={[styles.textInput, styleTextInput]}
          placeholderTextColor="#9B9B9B"
          placeholder={t('searchByDestination')}
          {...options}
        />
      </View>
      {hasCancel && (
        <TouchableOpacity onPress={onCancelPress}>
          <Text style={styles.textCancel}>{t('cancel')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  greatCont: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    padding: Platform.OS == 'ios' ? PixelPerfect(10) : PixelPerfect(5),
    paddingHorizontal: PixelPerfect(10),
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    textAlign: 'right',
    color: '#9B9B9B',
  },
  searchBar: {
    borderRadius: PixelPerfect(50),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCDCDC',
    flex: 8,
  },
  textCancel: {
    marginLeft: 10,
    color: '#8F8F8F',
    fontSize: PixelPerfect(13),
    fontFamily: Fonts.Medium,
  },
});
