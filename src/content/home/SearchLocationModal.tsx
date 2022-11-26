import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import ModalHeader from '../../components/headers/ModalHeader';
import SafeView from '../../components/views/SafeView';
import Border from '../../components/other/Border';
import MainInput from '../../components/inputs/MainInput';
import {SharedStyles} from '../../styles/sharedStyles';
import {SearchIcon2, SmallMarker} from '../../assets/svg/icons';
import {PixelPerfect} from '../../styles/stylesConstants';
import ViewButton from '../../components/buttons/ViewButton';

import {fontStyle} from '../../styles/fonts';
import {NavigationProps} from '../../constants/interfaces';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../../store/hook';
import {useTranslation} from 'react-i18next';
import Geocoder from 'react-native-geocoding';
import {MAP_KEY} from '../../keys/Keys';
import {showMessage} from 'react-native-flash-message';

const SearchLocationModal: FC<{
  visible: boolean;
  onClosePress: () => void;
}> = ({visible, onClosePress}) => {
  const navigation: NavigationProps = useNavigation();
  const {suggestLocation} = useAppSelector(s => s.requestReducer);
  const {t} = useTranslation();

  interface IItem {
    item: {name: string};
    index: number;
  }

  Geocoder.init(MAP_KEY);
  const [address, setAddress] = useState('');
  const onSearchByLocation = () => {
    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        navigation.navigate('NewRequest', {
          lat: location.lat,
          lng: location.lng,
        });
      })
      .catch(error => {
        showMessage({
          type: 'danger',
          message: 'رجاء قم بادخال عنوان صحيح',
        });
        Alert.alert('رجاء قم بادخال عنوان صحيح');
        console.warn(error);
      });
  };
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClosePress}>
      <SafeView>
        <ModalHeader
          title={t('locateArriveLocation')}
          onClosePress={onClosePress}
        />
        <Border style={{marginVertical: 6}} />

        <View style={{...SharedStyles.paddingHorizontal}}>
          <MainInput
            onPress={onSearchByLocation}
            options={{
              placeholder: t('searchLocation'),
              onChangeText: txt => setAddress(txt),
              onSubmitEditing: onSearchByLocation,
            }}
            style={{
              backgroundColor: '#F9FAFB',
              marginBottom: 6,
              borderWidth: 0,
            }}
            leftContent={<SearchIcon2 />}
          />
        </View>

        <ViewButton onPress={() => navigation.navigate('NewRequest')} />

        <FlatList
          data={suggestLocation}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}: IItem) => {
            return (
              <Pressable
                style={{...SharedStyles.paddingHorizontal}}
                onPress={() => navigation.navigate('NewRequest', item)}>
                <View style={styles.textsCont}>
                  <SmallMarker />
                  <Text style={styles.textNearToYou}>{item?.name}</Text>
                </View>

                {index != suggestLocation.length - 1 && <Border />}
              </Pressable>
            );
          }}
        />
      </SafeView>
    </Modal>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  textsCont: {
    marginTop: PixelPerfect(20),
    marginBottom: PixelPerfect(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNearToYou: {
    ...fontStyle.Regular14,
    marginHorizontal: PixelPerfect(8),
  },
});
