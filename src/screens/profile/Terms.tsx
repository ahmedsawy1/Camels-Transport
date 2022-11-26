import {ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {fontStyle} from '../../styles/fonts';
import {PixelPerfect} from '../../styles/stylesConstants';
import HtmlContent from '../../components/views/HTMLcontent';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../../store/hook';
import {getTermsPage} from '../../../store/actions/pagesAction';

const Terms = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTermsPage());
  }, []);

  const {termsData} = useAppSelector(s => s.pagesReducer);

  return (
    <SafeView hasPaddingHorizontal>
      <MainHeader />
      <Text style={styles.textTitle}>{t('termsAndConditions')}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <HtmlContent content={termsData.content} />
      </ScrollView>
    </SafeView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  textTitle: {
    ...fontStyle.Bold20,
    fontSize: PixelPerfect(27),
    marginTop: PixelPerfect(15),
    marginBottom: PixelPerfect(20),
  },
  textDesc: {
    ...fontStyle.Regular17,
  },
});
