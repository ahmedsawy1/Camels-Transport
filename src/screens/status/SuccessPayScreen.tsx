import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {TickMarkIcon} from '../../assets/svg/icons';
import {useNavigation} from '@react-navigation/native';
import MainButton from '../../components/buttons/MainButton';

const SuccessPayScreen = ({}) => {
  const navigation: any = useNavigation();
  return (
    <SafeView>
      <View style={styles.centerView}>
        <View style={styles.cyrcle}>
          <TickMarkIcon />
        </View>
        <Text style={styles.successText}>تم الدفع بنجاح</Text>
        <Text style={styles.youCanText}></Text>
        <MainButton
          title={'عرض تفاصيل الطلب'}
          onPress={() => navigation.navigate('RequestProccess')}
        />
      </View>
    </SafeView>
  );
};

export default SuccessPayScreen;

const styles = StyleSheet.create({
  centerView: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  cyrcle: {
    height: 111,
    width: 111,
    backgroundColor: Colors.medGreen,
    borderRadius: 100,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: PixelPerfect(40),
    fontFamily: Fonts.Bold,
    color: Colors.black,
    marginTop: 30,
  },
  youCanText: {
    fontSize: PixelPerfect(33),
    fontFamily: Fonts.Regular,
    color: Colors.black,
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 30,
  },
});
