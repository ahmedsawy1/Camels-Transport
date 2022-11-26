import {Alert, Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {PixelPerfect} from '../../styles/stylesConstants';
import {paddingHorizontal} from '../../styles/sharedStyles';
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
import {useDispatch, useSelector} from 'react-redux';
import {useAppSelector} from '../../../store/hook';
import LoaderView from '../../components/views/LoaderView';
import {MAP_KEY} from '../../keys/Keys';
import {showService} from '../../../store/actions/servicesActions';
import DriverTrackContent from './DriverTrackContent';
import SafeView from '../../components/views/SafeView';

const RequestProccess = () => {
  const [step, setStep] = useState('searching');
  const [loaderVisiable, setLoaderVisiable] = useState(false);

  const {t} = useTranslation();
  const navigation: NavigationProps = useNavigation();

  const {
    singleServiceData: {
      pick_up_lat,
      pick_up_lng,
      drop_off_lat,
      drop_off_lng,
      pick_up_location,
      drop_off_location,
      provider,
    },
  } = useAppSelector(s => s.servicesReducers);

  const getDriver = (stop = false) => {
    dispatch(
      showService({
        id: params?.orderId,
        cb: (res, data) => {
          console.log('-----------data.provider---------');
          console.log('----------------------');
          console.log(data.provider);
          console.log('----------------------');
          console.log('-----------data.provider---------');

          if (data.provider) {
            setStep('driverFound');
          }

          if (stop) {
            setStep('noDrivers');
          }
        },
      }),
    );
  };

  useEffect(() => {
    setTimeout(() => {
      getDriver();
    }, 4000);
    setTimeout(() => {
      getDriver();
    }, 15000);
    setTimeout(() => {
      getDriver();
    }, 30000);
    setTimeout(() => {
      getDriver();
    }, 45000);
    setTimeout(() => {
      getDriver();
    }, 60000);
    setTimeout(() => {
      getDriver(true);
    }, 70000);
  }, []);

  const {params} = useRoute();

  const GOOGLE_MAPS_APIKEY = MAP_KEY;
  const dispatch = useDispatch();

  const initialRegion = {
    latitude: drop_off_lat ?? 24.52737728124411,
    longitude: drop_off_lng ?? 39.56078081610334,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <SafeView>
      <View style={{flex: 1}}>
        <LoaderView visible={loaderVisiable} />

        <IconButton
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackArrowIcon />
        </IconButton>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={initialRegion}
          region={initialRegion}>
          <Marker
            coordinate={{
              latitude: pick_up_lat ?? 24.52737728124411,
              longitude: pick_up_lng ?? 39.56078081610334,
            }}
          />

          <Marker
            coordinate={{
              latitude: drop_off_lat ?? 24.52737728124411,
              longitude: drop_off_lng ?? 39.56078081610334,
            }}
          />

          {drop_off_lat != 0 && drop_off_lng != 0 && (
            <MapViewDirections
              timePrecision="now"
              origin={{
                latitude: pick_up_lat ?? 24.52737728124411,
                longitude: pick_up_lng ?? 39.56078081610334,
              }}
              destination={{
                latitude: drop_off_lat ?? 24.52737728124411,
                longitude: drop_off_lng ?? 39.56078081610334,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeColor="#2664C0"
              strokeWidth={4}
              onError={e => {
                Alert.alert(t('weCantMove'));
              }}
            />
          )}
        </MapView>

        {step == 'searching' && (
          <>
            {/* Top Card */}
            <SetLocationCard
              currentLocation={pick_up_location}
              dropOffLocation={drop_off_location}
              onChangePress={() => setStep('setUrLocation')}
            />

            {/* Bottom Card */}
            <SearchingCard />
          </>
        )}

        {step == 'driverFound' && (
          <DriverFound
            onPress={() => setStep('DriverTrack')}
            driverName={provider?.provider_name}
          />
        )}

        {step == 'noDrivers' && (
          <SearchingCard
            title={'تنبيه'}
            subTitle="جاري البحث عن سائق وعند قبول طلبك سوف نرسل اليك اشعار"
            hasLoader={false}
          />
        )}
        {step == 'DriverTrack' && <DriverTrackContent />}
      </View>
    </SafeView>
  );
};

export default RequestProccess;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: match(46, 55),
    left: paddingHorizontal,
    zIndex: 1,
    borderRadius: PixelPerfect(6),
  },
});
