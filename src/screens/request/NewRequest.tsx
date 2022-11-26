import {Alert, Button, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {paddingHorizontal, SharedStyles} from '../../styles/sharedStyles';
import {fontStyle} from '../../styles/fonts';
import {useTranslation} from 'react-i18next';

import IconButton from '../../components/buttons/IconButton';
import {BackArrowIcon} from '../../assets/svg/icons';
import {match} from '../../constants/helpers';
import {NavigationProps} from '../../constants/interfaces';
import {useNavigation, useRoute} from '@react-navigation/native';
import SetLocationCard from '../../components/location/SetLocationCard';
import SearchingCard from '../../components/location/SearchingCard';
import DriverFound from '../../components/location/DriverFound';
import MapViewDirections from 'react-native-maps-directions';
import {useDispatch} from 'react-redux';
import {
  setDropOffLocation,
  setPickUpLocation,
} from '../../../store/reducers/requestReducer';
import {useAppSelector} from '../../../store/hook';
import {
  confirmOrder,
  paymentAction,
} from '../../../store/actions/requestAction';
import WebView from 'react-native-webview';
import {showMessage} from 'react-native-flash-message';
import LoaderView from '../../components/views/LoaderView';
import axios from 'axios';
import {axiosAPI} from '../../api/config';
import {MAP_KEY} from '../../keys/Keys';
import Geolocation from '@react-native-community/geolocation';
import SetUrLocationContent from '../../content/request/SetUrLocationContent';
import SetDropDownLocationContent from '../../content/request/SetDropDownLocationContent';
import ConfirmOrderContent from '../../content/request/ConfirmOrderContent.tsx';
import {showService} from '../../../store/actions/servicesActions';

const NewRequest = () => {
  const [step, setStep] = useState('setUrLocation');
  const [webViewVisiable, setWebViewVisiable] = useState(false);
  const [loaderVisiable, setLoaderVisiable] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('');
  // const [webViewLink, setWebViewLink] = useState('');

  // setUrLocation
  // setMettingLocation
  // confirmOrder  == select van
  // searching
  // driver found

  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();
  const {pickUpLat, pickUpLong, dropOffLat, dropOffLong, vans} = useAppSelector(
    s => s.requestReducer,
  );

  const [select, setSelect] = useState({
    van: '',
    payment: '',
  });

  const [uID, setUID] = useState('');

  const handleLocations = () => {
    if (step == 'setUrLocation') {
      if (pickUpLat == 0) {
        showMessage({type: 'danger', message: t('selectPickUp')});
      } else {
        setStep('setMettingLocation');
      }
    }

    if (step == 'setMettingLocation') {
      if (dropOffLat == 0) {
        showMessage({type: 'danger', message: t('selectDropOff')});
      } else {
        setStep('confirmOrder');
      }
    }

    if (step == 'confirmOrder') {
      if (select.van == '' || select.payment == '') {
        showMessage({
          type: 'danger',
          message: 'يرجي اختيار السائق و وسيلة الدفع',
        });
      } else {
        setStep('searching');
      }
    }
  };

  const URL = 'v1/services/payment-callback?checkout_uuid=' + uID;

  // useEffect(() => {
  //   if (step == 'searching') {
  //     setTimeout(() => {
  //       setStep('driverFound');
  //     }, 15000);
  //   }
  // }, [step == 'searching']);

  const {params}: any = useRoute();

  const [fromMarkerLat, setFromMarkerLat] = useState(params?.lat ?? 0);
  const [fromMarkerLong, setFromMarkerLong] = useState(params?.lng ?? 0);

  useEffect(() => {
    if (params?.lat) {
      dispatch(
        setPickUpLocation({
          lat: params?.lat,
          long: params?.lng,
        }),
      );
    }
  }, []);

  const [toMarkerLat, setToMarkerLat] = useState(0);
  const [toMarkerLong, setToMarkerLong] = useState(0);

  const GOOGLE_MAPS_APIKEY = MAP_KEY;
  const dispatch = useDispatch();

  const onMapPress = (e: any) => {
    if (step == 'setUrLocation') {
      setFromMarkerLat(e.nativeEvent.coordinate.latitude);
      setFromMarkerLong(e.nativeEvent.coordinate.longitude);

      dispatch(
        setPickUpLocation({
          lat: e.nativeEvent.coordinate.latitude,
          long: e.nativeEvent.coordinate.longitude,
        }),
      );
      getAddressName(
        e.nativeEvent.coordinate.latitude,
        e.nativeEvent.coordinate.longitude,
      );
    } else if (step == 'setMettingLocation') {
      setToMarkerLat(e.nativeEvent.coordinate.latitude);
      setToMarkerLong(e.nativeEvent.coordinate.longitude);
      dispatch(
        setDropOffLocation({
          lat: e.nativeEvent.coordinate.latitude,
          long: e.nativeEvent.coordinate.longitude,
        }),
      );
      getAddressName(
        e.nativeEvent.coordinate.latitude,
        e.nativeEvent.coordinate.longitude,
      );
    }
  };

  const [initialRegion, setInitialRegion] = useState({
    latitude: params?.lat ?? 24.52737728124411,
    longitude: params?.lng ?? 39.56078081610334,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [addressName, setAddressName] = useState({
    pickUpAddress: '',
    dropOffAddress: '',
  });

  const getAddressName = (lat: any, lng: any) =>
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        lat +
        ',' +
        lng +
        '&key=' +
        MAP_KEY,
    )
      .then(response => response.json())
      .then(responseJson => {
        if (step == 'setUrLocation') {
          setAddressName(s => ({
            ...s,
            pickUpAddress:
              responseJson?.results[0]?.address_components[1]?.long_name +
              ' ' +
              responseJson?.results[0]?.address_components[2]?.long_name +
              ' ' +
              responseJson?.results[0]?.address_components[3]?.long_name,
          }));
        }

        if (step == 'setMettingLocation') {
          setAddressName(s => ({
            ...s,
            dropOffAddress:
              responseJson?.results[0]?.address_components[1]?.long_name +
              ' ' +
              responseJson?.results[0]?.address_components[2]?.long_name +
              ' ' +
              responseJson?.results[0]?.address_components[3]?.long_name,
          }));
        }
      });

  const saveCurrentLocation = async () => {
    Geolocation.getCurrentPosition(info => {
      setInitialRegion(s => ({
        ...s,
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }));
      console.log(info);
      getAddressName(info.coords.latitude, info.coords.longitude);
    });
  };

  useEffect(() => {
    saveCurrentLocation();
  }, []);

  const confirmOrderFN = () => {
    if (select.van == '' || select.payment == '') {
      showMessage({
        type: 'danger',
        message: 'يرجي اختيار السائق و وسيلة الدفع',
      });
    } else {
      setLoaderVisiable(true);
      dispatch(
        confirmOrder({
          body: {
            pick_up_lat: pickUpLat,
            pick_up_lng: pickUpLong,
            drop_off_lat: dropOffLat,
            drop_off_lng: dropOffLong,
            payment_method: 'online_payment',
            number_of_riders: 2,
            // notes: '',
          },
          cb: res => {
            dispatch(
              paymentAction({
                id: res.order_id,
                cb(data) {
                  setLoaderVisiable(false);
                  console.log('===============data=====================');
                  console.log(data);
                  setWebViewUrl(data.checkout_url);
                  setWebViewVisiable(true);
                  setUID(data.checkout_uuid);
                },
              }),
            );
          },
        }),
      );
      // todo
      //
    }
  };

  return (
    <View style={{flex: 1}}>
      <LoaderView visible={loaderVisiable} />

      <Modal
        visible={webViewVisiable}
        onRequestClose={() => setWebViewVisiable(false)}>
        <WebView
          source={{uri: webViewUrl}}
          onNavigationStateChange={state => {
            console.log('================state====================');
            console.log(state);
            console.log('====================================');

            const stateUrl =
              'http://camel.faisal49m.com/api/v1/services/payment-callback?checkout_uuid=';

            if (
              (state.url == `${stateUrl}${uID}&status=pending` ||
                state.url == `${stateUrl}${uID}&status=paid`) &&
              state.loading == false
            ) {
              axiosAPI
                .get(URL)
                .then(res => {
                  console.log('==============res======================');
                  console.log('RES');
                  console.log(res.data);
                  console.log('====================================');
                  if (res.data.payment_status == true) {
                    navigation.navigate('SuccessPayScreen');
                    setWebViewVisiable(false);
                  } else if (res.data.payment_status == false) {
                    navigation.navigate('FaildPayScreen');
                    setWebViewVisiable(false);
                  } else {
                    Alert.alert(
                      'عذرا حدثت مشكلة عند الدفع يرجي اعادة المحاولة',
                    );
                    setWebViewVisiable(false);
                  }
                })
                .catch(err => {
                  console.log('================err .. ====================');
                  console.log(err);
                });
            }
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoad={() => setWebViewVisiable(true)}
          onLoadStart={() => setWebViewVisiable(true)}
        />
      </Modal>
      <IconButton style={styles.backButton} onPress={() => navigation.goBack()}>
        <BackArrowIcon />
      </IconButton>

      <MapView
        onPress={e => onMapPress(e)}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        initialRegion={initialRegion}
        region={initialRegion}>
        <Marker coordinate={{longitude: toMarkerLong, latitude: toMarkerLat}} />

        <Marker
          coordinate={{longitude: fromMarkerLong, latitude: fromMarkerLat}}
        />

        {toMarkerLat != 0 && toMarkerLong != 0 && (
          <MapViewDirections
            timePrecision="now"
            origin={{latitude: fromMarkerLat, longitude: fromMarkerLong}}
            destination={{latitude: toMarkerLat, longitude: toMarkerLong}}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="#2664C0"
            strokeWidth={4}
            onError={e => {
              Alert.alert(t('weCantMove'));
            }}
          />
        )}
      </MapView>
      {step == 'setUrLocation' && (
        <SetUrLocationContent
          onPress={handleLocations}
          addressName={addressName.pickUpAddress}
        />
      )}

      {step == 'setMettingLocation' && (
        <SetDropDownLocationContent
          addressName={addressName.dropOffAddress}
          onPress={handleLocations}
        />
      )}

      {step == 'confirmOrder' && (
        <ConfirmOrderContent
          onPress={confirmOrderFN}
          selectedVan={select.van}
          selectedPayment={select.payment}
          onSelectVan={item => setSelect(s => ({...s, van: item.type2}))}
          onSelectPayment={item => setSelect(s => ({...s, payment: item.type}))}
        />
      )}

      {step == 'searching' && (
        <>
          {/* Top Card */}
          <SetLocationCard
            currentLocation={addressName.pickUpAddress}
            dropOffLocation={addressName.dropOffAddress}
            onChangePress={() => setStep('setUrLocation')}
          />

          {/* Bottom Card */}
          <SearchingCard />
        </>
      )}

      {step == 'driverFound' && <DriverFound />}
    </View>
  );
};

export default NewRequest;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: match(46, 55),
    left: paddingHorizontal,
    zIndex: 1,
    borderRadius: PixelPerfect(6),
  },
});
