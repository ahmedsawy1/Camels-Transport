import React, {FC} from 'react';
import {
  I18nManager,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {
  selectDayFrom,
  selectDayTo,
  selectOneDay,
} from '../../store/reducers/selectDate';
import {SharedStyles} from '../../styles/sharedStyles';
import {
  Colors,
  ColorWithOpacity,
  Fonts,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';

let daysShort = ['Sat.', 'Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.'];

// const selectedJun = [1, 2, 5, 8, 10, 13];
const selectedJun: [] = [];
export const totalWidth = phoneWidth * 0.9;
const itemDimension = totalWidth / 7.2;

const CustomCalender: FC<{
  monthDays: Date[];
  monthName: string;
}> = React.memo(({monthDays, monthName}) => {
  console.log('Render CustomCalender');

  const dispatch = useAppDispatch();
  const {oneDay, dayFrom, dayTo, selectedDays, onlyOneDay} = useAppSelector(
    state => state.dateSlice,
  );

  const firstDate =
    dayFrom == 0 ? 0 : dayFrom?.toISOString()?.slice(0, 10)?.replace(/-/g, '/');

  const secondDate =
    dayTo == 0 ? 0 : dayTo?.toISOString()?.slice(0, 10)?.replace(/-/g, '/');

  const onSelectDay = (mapItem: any) => {
    if (onlyOneDay) {
      dispatch(selectOneDay(mapItem));

      // Many Days
    } else {
      if (dayFrom == 0) {
        dispatch(selectDayFrom(mapItem));

        //
      } else if (dayTo == 0) {
        dispatch(selectDayTo(mapItem));

        //
      } else {
        console.log('Done');
      }
    }
  };

  return (
    <View style={{width: totalWidth, marginTop: PixelPerfect(35)}}>
      <Text style={styles.textMonthName}>{monthName}</Text>
      <ScrollView horizontal contentContainerStyle={styles.daysNamesCont}>
        {daysShort.map((item, index) => (
          <Text key={index} style={styles.textDayName}>
            {item}
          </Text>
        ))}
      </ScrollView>

      <View style={{flexWrap: 'wrap', flexDirection: 'row-reverse'}}>
        {monthDays.map((mapItem: any, mapIndex: number) => {
          return (
            <TouchableOpacity
              onPress={() => onSelectDay(mapItem)}
              key={mapIndex}
              style={[
                styles.dayCont,
                mapItem?.getDay() + 1 != 7 && {
                  marginRight: I18nManager.isRTL
                    ? mapIndex == 0
                      ? itemDimension * (mapItem?.getDay() + 1)
                      : 0
                    : 0,
                },
              ]}>
              <View
                style={[
                  styles.circleNumCont,

                  // If One Day
                  onlyOneDay &&
                    selectedDays?.includes(mapItem) &&
                    selectedDays?.includes(oneDay) && {
                      backgroundColor: Colors.mainColor,
                      borderRadius: PixelPerfect(50),
                    },

                  // If Many Days
                  !onlyOneDay &&
                    selectedDays?.includes(mapItem) && {
                      backgroundColor: Colors.mainColor,
                      borderRadius: PixelPerfect(50),
                    },

                  mapItem?.toISOString()?.slice(0, 10)?.replace(/-/g, '/') >
                    firstDate &&
                    mapItem?.toISOString()?.slice(0, 10)?.replace(/-/g, '/') <
                      secondDate && {
                      backgroundColor: ColorWithOpacity(Colors.mainColor, 0.1),
                      width: '100%',
                    },
                ]}>
                <Text
                  style={[
                    styles.textDayNum,
                    {
                      textDecorationLine:
                        monthDays[0].getMonth() + 1 == 6 &&
                        selectedJun?.includes(mapItem.getDate())
                          ? 'line-through'
                          : 'none',
                    },
                    selectedDays?.includes(mapItem) && {
                      color: Colors.white,
                    },

                    mapItem?.toISOString()?.slice(0, 10)?.replace(/-/g, '/') >
                      firstDate &&
                      mapItem?.toISOString()?.slice(0, 10)?.replace(/-/g, '/') <
                        secondDate && {
                        color: Colors.mainColor,
                      },
                  ]}>
                  {mapItem?.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});
export default CustomCalender;

const styles = StyleSheet.create({
  textMonthName: {
    ...SharedStyles.textBold16,
    marginHorizontal: PixelPerfect(22),
    marginBottom: Platform.OS == 'ios' ? PixelPerfect(15) : 10,
    textAlign: 'left',
  },
  dayCont: {
    borderRadius: 30,
    width: itemDimension,
    height: PixelPerfect(40),
    ...SharedStyles.centred,
  },
  daysNamesCont: {
    flexDirection: 'row-reverse',
    width: totalWidth,
    marginBottom: PixelPerfect(10),
  },
  textDayName: {
    width: itemDimension,
    textAlign: 'center',
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  textDayNum: {
    ...SharedStyles.textRegular16,
  },
  circleNumCont: {
    height: PixelPerfect(32),
    width: PixelPerfect(32),
    // borderRadius: PixelPerfect(50),
    ...SharedStyles.centred,
  },
});
