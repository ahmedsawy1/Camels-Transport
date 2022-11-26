import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Geocoder from 'react-native-geocoding';
import {MAP_KEY} from '../../keys/Keys';

Geocoder.init(MAP_KEY); // use a valid API key

const GeoCoding = () => {
  Geocoder.from('الحائط')
    .then(json => {
      var location = json.results[0].geometry.location;
      console.log(location);
    })
    .catch(error => console.warn(error));

  return (
    <View>
      <Text>GeoCoding</Text>
    </View>
  );
};

export default GeoCoding;

const styles = StyleSheet.create({});
