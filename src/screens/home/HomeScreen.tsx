import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors, phoneWidth, PixelPerfect} from '../../styles/stylesConstants';
import MainButton from '../../components/buttons/MainButton';
import {t} from 'i18next';
import {PlayVideoIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';
import {match} from '../../constants/helpers';
import SearchLocationCard from '../../components/cards/SearchLocationCard';
import SearchLocationModal from '../../content/home/SearchLocationModal';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../../store/hook';
import {getServices} from '../../../store/actions/servicesActions';
import {getLocations, getVans} from '../../../store/actions/requestAction';
import GeoCoding from '../../components/location/GeoCoding';
import VideoModalContent from '../../content/home/VideoModalContent';
import {axiosAPI} from '../../api/config';
import Geolocation from '@react-native-community/geolocation';
import {MAP_KEY} from '../../keys/Keys';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    searchModalVisiable: false,
    videoModal: false,
  });

  const switchVideoModal = (status: boolean) =>
    setState(s => ({...s, videoModal: status}));

  const openSearchModal = () =>
    setState(s => ({...s, searchModalVisiable: true}));

  const closeSearchModal = () =>
    setState(s => ({...s, searchModalVisiable: false}));

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () =>
        setState(s => ({...s, searchModalVisiable: false}));
      return () => unsubscribe();
    }, []),
  );

  const [videoLink, setVideoLink] = useState('');
  const getVideoLink = () =>
    axiosAPI
      .get('helper/video')
      .then(res => {
        console.log(res.data.link);
        setVideoLink(res.data.link);
      })
      .catch(err => {
        console.log(err);
      });

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getVans());
    getVideoLink();
  }, []);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 24.520063210857145,
    longitude: 39.56746410075944,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const saveCurrentLocation = async () => {
    Geolocation.getCurrentPosition(info => {
      console.log('=============info=======================');
      setInitialRegion(s => ({
        ...s,
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }));
      console.log(info);
    });

    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        initialRegion.latitude +
        ',' +
        initialRegion.longitude +
        '&key=' +
        MAP_KEY,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('Street');
        console.log(responseJson.results[0]);
      });
  };

  useEffect(() => {
    saveCurrentLocation();
  }, []);

  return (
    <View>
      {/* <GeoCoding /> */}

      <View style={styles.topButtonCont}>
        <MainButton
          title={t('knowHowToMove')}
          styleTitle={styles.topButtonTitle}
          style={{backgroundColor: Colors.white, paddingHorizontal: 0}}
          buttonIcon={<PlayVideoIcon />}
          onPress={() => switchVideoModal(true)}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{height: '100%', width: phoneWidth}}
        initialRegion={initialRegion}
        region={initialRegion}
      />

      <View style={styles.buttomCardCont}>
        <SearchLocationCard onSearchPress={openSearchModal} />
      </View>

      <VideoModalContent
        videoURI={videoLink}
        visible={state.videoModal}
        onClosePress={() => switchVideoModal(false)}
      />

      <SearchLocationModal
        visible={state.searchModalVisiable}
        onClosePress={closeSearchModal}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  topButtonCont: {
    position: 'absolute',
    top: match(40, 80),
    zIndex: 1,
    width: '100%',
    ...SharedStyles.paddingHorizontal,
  },
  topButtonTitle: {
    color: Colors.secondColor,
    textAlign: 'center',
    fontSize: PixelPerfect(14),
  },
  buttomCardCont: {
    position: 'absolute',
    bottom: match(30, 20),
    zIndex: 1,
    width: '100%',
    ...SharedStyles.paddingHorizontal,
  },
});
