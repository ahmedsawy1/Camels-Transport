import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../store/hook';

const OrderOverview = () => {
  const {singleServiceData} = useAppSelector(s => s.servicesReducers);

  return (
    <View>
      <Text>{singleServiceData.request_id}</Text>
    </View>
  );
};

export default OrderOverview;

const styles = StyleSheet.create({});
