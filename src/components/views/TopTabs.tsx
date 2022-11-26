import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {useTranslation} from 'react-i18next';
import {SharedStyles} from '../../styles/sharedStyles';
import {
  CalenderIcon,
  CloseIcon,
  CloseIconInCircle,
  TickInCircle,
} from '../../assets/svg/icons';

interface Props {
  tabState: String;
  onNewPress: () => void;
  onPrevPress: () => void;
  onCancelPress: () => void;
}

const TopTabs: FC<Props> = ({
  tabState = 'new',
  onNewPress,
  onPrevPress,
  onCancelPress,
}) => {
  const {t} = useTranslation();

  //   new , prev , cancel
  //   const [selectedTab, setSelectedTab] = useState(tabState);

  return (
    <View style={styles.cont}>
      <Pressable
        onPress={onNewPress}
        style={[
          styles.tabButton,
          tabState == 'new' && {borderColor: Colors.mainColor},
        ]}>
        <CalenderIcon
          height={PixelPerfect(24)}
          width={PixelPerfect(24)}
          fill={tabState == 'new' ? Colors.mainColor : '#B4B4B4'}
        />
        <Text
          style={[
            styles.textTabTitle,
            tabState == 'new' && {color: Colors.mainColor},
          ]}>
          {t('newBooking')}
        </Text>
      </Pressable>
      <Pressable
        onPress={onPrevPress}
        style={[
          styles.tabButton,
          tabState == 'prev' && {borderColor: Colors.mainColor},
        ]}>
        <TickInCircle
          height={PixelPerfect(24)}
          width={PixelPerfect(24)}
          fill={tabState == 'prev' ? Colors.mainColor : '#B4B4B4'}
        />
        <Text
          style={[
            styles.textTabTitle,
            tabState == 'prev' && {color: Colors.mainColor},
          ]}>
          {t('previousBooking')}
        </Text>
      </Pressable>
      <Pressable
        onPress={onCancelPress}
        style={[
          styles.tabButton,
          tabState == 'cancel' && {borderColor: Colors.mainColor},
        ]}>
        <CloseIconInCircle
          fill={tabState == 'cancel' ? Colors.mainColor : '#B4B4B4'}
        />
        <Text
          style={[
            styles.textTabTitle,
            tabState == 'cancel' && {color: Colors.mainColor},
          ]}>
          {t('canceledBooking')}
        </Text>
      </Pressable>
    </View>
  );
};

export default TopTabs;

const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    marginBottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // ...SharedStyles.paddingHorizontal,
  },
  tabButton: {
    width: PixelPerfect(100),
    paddingVertical: PixelPerfect(12),
    ...SharedStyles.centred,
    borderRadius: PixelPerfect(16),
    borderWidth: 1,
    borderColor: '#B4B4B4',
  },
  textTabTitle: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: '#B4B4B4',
    marginTop: 5,
  },
});
