import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, phoneWidth, PixelPerfect} from '../../styles/stylesConstants';
import {paddingHorizontal, SharedStyles} from '../../styles/sharedStyles';
import {useTranslation} from 'react-i18next';
import MainButton from '../../components/buttons/MainButton';
import {fontStyle} from '../../styles/fonts';
import CardButton from '../../components/buttons/CardButton';
import {vans} from '../../temp/vans-data';
import {useAppSelector} from '../../../store/hook';
import {payments} from '../../temp/payment-data';

interface Props {
  onPress: () => void;
  onSelectVan: (item: any) => void;
  onSelectPayment: (item: any) => void;
  selectedVan: string;
  selectedPayment: string;
}
const ConfirmOrderContent: FC<Props> = ({
  onPress,
  onSelectVan,
  onSelectPayment,
  selectedVan,
  selectedPayment,
}) => {
  const {t} = useTranslation();
  const {vans} = useAppSelector(s => s.requestReducer);
  return (
    <View style={styles.popUp}>
      <View style={styles.popUpButton} />

      <View>
        <Text style={styles.textSelect}>{t('selectVan')}</Text>
        <View style={{alignItems: 'flex-start'}}>
          <FlatList
            horizontal
            data={vans}
            contentContainerStyle={{marginBottom: PixelPerfect(20)}}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}: any) => (
              <CardButton
                title={item.price}
                subTitle={item.name}
                description={item.size}
                isSelected={item.type2 == selectedVan}
                onPress={() => onSelectVan(item)}
                // onPress={() => setSelect(s => ({...s, van: item.type2}))}
              />
            )}
          />
        </View>

        <Text style={styles.textSelect}>{t('selectPayment')}</Text>

        <View style={{alignItems: 'flex-start'}}>
          <FlatList
            horizontal
            data={payments}
            contentContainerStyle={{
              marginBottom: PixelPerfect(20),
            }}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CardButton
                title={item.title}
                styleTitle={{...fontStyle.Regular14}}
                style={{
                  width: (phoneWidth - paddingHorizontal * 4) / 3,
                }}
                isSelected={item.type == selectedPayment}
                onPress={() => onSelectPayment(item)}
                // onPress={() => setSelect(s => ({...s, payment: item.type}))}
              />
            )}
          />
        </View>
      </View>

      <MainButton
        onPress={onPress}
        title={t('confirmOrder')}
        style={{backgroundColor: Colors.secondColor}}
      />
    </View>
  );
};

export default ConfirmOrderContent;

const styles = StyleSheet.create({
  popUp: {
    backgroundColor: Colors.white,
    borderTopRightRadius: PixelPerfect(10),
    borderTopLeftRadius: PixelPerfect(10),
    borderRadius: PixelPerfect(10),
    paddingBottom: PixelPerfect(40),
    ...SharedStyles.paddingHorizontal,
  },
  popUpButton: {
    height: PixelPerfect(4),
    width: PixelPerfect(50),
    backgroundColor: '#BFBFBF',
    borderRadius: PixelPerfect(10),
    alignSelf: 'center',
    marginTop: PixelPerfect(16),
    marginBottom: PixelPerfect(20),
  },
  textLocationName: {
    ...fontStyle.Regular14,
    color: Colors.secondGray,
  },

  searchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: PixelPerfect(10),
    marginBottom: PixelPerfect(15),
  },
  searchButton: {
    backgroundColor: '#DEDEDE',
    borderRadius: PixelPerfect(30),
    height: PixelPerfect(30),
  },
  textSelect: {
    ...fontStyle.Bold14,
    marginBottom: PixelPerfect(8),
  },
});
