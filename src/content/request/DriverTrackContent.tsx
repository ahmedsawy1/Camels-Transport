import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Colors,
  phoneHeight,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {fontStyle} from '../../styles/fonts';
import DriverCard from '../../components/cards/DriverCard';
import DetailsCard from '../../components/cards/DetailsCard';
import VanCard from '../../components/cards/VanCard';
import Separator from '../../components/views/Separator';
import {Marker2} from '../../assets/svg/icons';
import {useAppSelector} from '../../../store/hook';

const DriverTrackContent = ({step = 1}) => {
  const {singleServiceData} = useAppSelector(s => s.servicesReducers);
  return (
    <View style={styles.cont}>
      <View style={{...SharedStyles.paddingHorizontal}}>
        <View
          style={{
            marginTop: PixelPerfect(28),
            marginBottom: PixelPerfect(26),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={[
              styles.lineView,
              step >= 1 && {backgroundColor: Colors.white},
            ]}
          />
          <View
            style={[
              styles.lineView,
              step >= 2 && {backgroundColor: Colors.white},
            ]}
          />
          <View
            style={[
              styles.lineView,
              step >= 3 && {backgroundColor: Colors.white},
            ]}
          />
          <View
            style={[
              styles.lineView,
              step >= 4 && {backgroundColor: Colors.white},
            ]}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: PixelPerfect(38),
          }}>
          <View>
            <Text style={{...fontStyle.Medium17, color: Colors.white}}>
              السائق في طريقة إليك
            </Text>
            <Text style={{...fontStyle.Medium14, color: Colors.white}}>
              وجدنا سائق يبعد عنك 4 دقائق
            </Text>
          </View>

          <View style={styles.timeCont}>
            <Text style={{...fontStyle.Medium12, color: '#112134B2'}}>
              يبعد عنك
            </Text>
            <Text style={{...fontStyle.Medium14}}>4 دقائق</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        style={styles.popUp}>
        <View style={styles.popUpLine} />
        <View style={{...SharedStyles.paddingHorizontal}}>
          <DriverCard
            rate={'4.8'}
            driver={singleServiceData?.provider?.provider_name}
            van={'24 رحلة'}
          />
          <VanCard vanType={singleServiceData?.provider?.vehicle_type} />
        </View>
        <Separator style={{height: 4, backgroundColor: '#DEDEDE'}} />
        <DetailsCard
          title={'موقع الوصول'}
          subTitle="شارع عبدالعزيز ، الرياض 2387"
          pressableWord={'اضافة / تغيير'}
          icon={<Marker2 />}
        />
        <Separator style={{height: 4, backgroundColor: '#DEDEDE'}} />

        <DetailsCard
          title="شارك حالة المشوار"
          subTitle="شارك الرحلة مع الاخرين ليعرفوا موقع الابل "
          pressableWord="شارك"
          icon={<Marker2 />}
        />
        <Separator style={{height: 4, backgroundColor: '#DEDEDE'}} />
        <DetailsCard
          title="200 ر.س."
          subTitle="الدفع النقدي "
          pressableWord="تبديل طريقة الدفع"
          icon={<Marker2 />}
        />
        <Separator style={{height: 4, backgroundColor: '#DEDEDE'}} />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginVertical: 10,
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <Text style={{...fontStyle.Medium14, color: '#112134B2'}}>
            تحتاج مساعدة ؟
          </Text>
          <Text style={{...fontStyle.Medium14, color: '#C03E3E'}}>
            انهاء الطلب
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DriverTrackContent;

const styles = StyleSheet.create({
  cont: {
    backgroundColor: '#2664C0',
    borderTopRightRadius: PixelPerfect(23),
    borderTopLeftRadius: PixelPerfect(23),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: phoneHeight / 2,
  },
  lineView: {
    height: PixelPerfect(2),
    backgroundColor: '#FFFFFF33',
    width: '20%',
  },
  timeCont: {
    backgroundColor: Colors.white,
    padding: PixelPerfect(10),
    borderRadius: PixelPerfect(4),
  },
  popUp: {
    backgroundColor: Colors.white,
    borderTopRightRadius: PixelPerfect(10),
    borderTopLeftRadius: PixelPerfect(10),
    paddingBottom: PixelPerfect(40),
  },
  popUpLine: {
    width: PixelPerfect(50),
    height: 3,
    borderRadius: 2,
    backgroundColor: '#BFBFBF',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: PixelPerfect(20),
  },
});
