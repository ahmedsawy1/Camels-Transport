import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import {useTranslation} from 'react-i18next';
import {fontStyle} from '../../styles/fonts';
import {PixelPerfect} from '../../styles/stylesConstants';
import {orderData} from '../../temp/orders';
import OrderCard from '../../components/cards/OrderCard';
import {useAppDispatch, useAppSelector} from '../../../store/hook';
import {getServices} from '../../../store/actions/servicesActions';
import {useNavigation} from '@react-navigation/native';

const PreviousOrders = () => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();

  const {services} = useAppSelector(s => s.servicesReducers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <SafeView hasPaddingHorizontal>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.textTitle}>{t('PreviousOrders')}</Text>
        <Text style={styles.textTitle}>{services?.length}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 2, paddingBottom: 50}}>
        {services?.map((item: any, index) => (
          <OrderCard
            key={index}
            from={item.pick_up_location}
            to={item.drop_off_location}
            total_amount={item.total_amount}
            updated_at={item.updated_at}
            driver="محمد عمار السويفي"
            van="شاحنه متوسطة"
            rate={'3'}
            id={item.id}
            // onPress={() => {
            //   console.log('====================================');
            //   console.log('DSADASD');
            //   console.log('====================================');
            //   navigate('RequestProccess');
            // }}
          />
        ))}
      </ScrollView>
    </SafeView>
  );
};

export default PreviousOrders;

const styles = StyleSheet.create({
  textTitle: {
    ...fontStyle.Bold32,
    marginTop: PixelPerfect(12),
  },
});
