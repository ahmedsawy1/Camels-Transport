import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import Accordian from '../../components/views/Accordion';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {fontStyle} from '../../styles/fonts';
import {PixelPerfect} from '../../styles/stylesConstants';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../../store/hook';
import {getFAQs} from '../../../store/actions/pagesAction';

const FAQs = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFAQs());
  }, []);
  const {FAQsData} = useAppSelector(s => s.pagesReducer);

  return (
    <SafeView hasPaddingHorizontal>
      <MainHeader />
      <Text style={styles.textTitle}>{t('commonQuestions')}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        {FAQsData?.map((item, index) => (
          <Accordian
            key={index}
            title={item.question}
            content={
              <View style={{marginTop: PixelPerfect(-15)}}>
                <Text style={styles.textDesc}>{item.answer}</Text>
              </View>
            }
          />
        ))}
      </ScrollView>
    </SafeView>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  textTitle: {
    ...fontStyle.Bold20,
    fontSize: PixelPerfect(27),
    marginTop: PixelPerfect(15),
    marginBottom: PixelPerfect(20),
  },
  textDesc: {
    ...fontStyle.Regular16,
    color: '#757575',
  },
});
