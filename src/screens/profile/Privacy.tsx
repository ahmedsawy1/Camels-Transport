import {ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import SafeView from '../../components/views/SafeView';
import MainHeader from '../../components/headers/MainHeader';
import {t} from 'i18next';
import {fontStyle} from '../../styles/fonts';
import {PixelPerfect} from '../../styles/stylesConstants';
import {useAppDispatch, useAppSelector} from '../../../store/hook';
import {getPrivacyPolicyPage} from '../../../store/actions/pagesAction';
import {useTranslation} from 'react-i18next';
import HtmlContent from '../../components/views/HTMLcontent';

const Privacy = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPrivacyPolicyPage());
  }, []);

  const {privacyData} = useAppSelector(s => s.pagesReducer);

  return (
    <SafeView hasPaddingHorizontal>
      <MainHeader />
      <Text style={styles.textTitle}>{t('privacyPolicy')}</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <HtmlContent content={privacyData.content} />
      </ScrollView>
    </SafeView>
  );
};

export default Privacy;

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
