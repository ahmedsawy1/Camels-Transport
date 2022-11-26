import React, {FC, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Pressable,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  ColorWithOpacity,
  PixelPerfect,
} from '../../styles/stylesConstants';

import {SharedStyles} from '../../styles/sharedStyles';
import {
  CurvedArrow,
  HeartIcon,
  RedHeart,
  RightArrowIcon,
} from '../../assets/svg/icons';
import IconButton from '../buttons/IconButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../constants/interfaces';

const phoneHeight = Dimensions.get('window').height;
const phoneWidth = Dimensions.get('window').width;

export interface Props {
  bannerData?: any;
  bannerContainerStyle?: StyleProp<ViewStyle>;
  flatListStyle?: StyleProp<ViewStyle>;
  styleDots?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  activeDotColor?: string;
  inActiveDotColor?: string;
  activeDotBorderColor?: string;
  inActiveDotBorderColor?: string;
  imageResizeMode?: any;
  imageStyle?: StyleProp<ImageStyle>;
  hasMultiIcons?: boolean;
  imageURL: any;
}

export const MainSlider: FC<Props> = React.memo(
  ({
    bannerData,
    bannerContainerStyle,
    flatListStyle,
    dotStyle,
    activeDotColor,
    inActiveDotColor,
    activeDotBorderColor,
    inActiveDotBorderColor,
    imageResizeMode,
    imageStyle,
    styleContainer,
    styleDots,
    hasMultiIcons,
  }) => {
    const indexRef: any = useRef();

    const [index, setIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigation: NavigationProps = useNavigation();
    const [stateIsFav, setStateIsFav] = useState(true);
    const onFavSwitchPress = () => setStateIsFav(cb => !cb);

    useEffect(() => {
      indexRef.current.scrollToIndex({animated: true, index});
    }, [index]);

    const theNext = (index: number) => {
      if (index < bannerData.length - 1) {
        setIndex(index + 1);
      }
    };

    useEffect(() => {
      const timeOut = setTimeout(() => {
        theNext(index);
        if (index === bannerData.length - 1) {
          setIndex(0);
        }
      }, 4000);

      return () => {
        if (timeOut) {
          clearTimeout(timeOut);
        }
      };
    });

    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

    const onChange = (nativeEvent: any) => {
      if (nativeEvent) {
        const slide = Math.ceil(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
        );
        if (slide !== selectedIndex) {
          setSelectedIndex(slide);
        }
      }
    };

    return (
      <View style={[bannerContainerStyle]}>
        {hasMultiIcons && (
          <View style={styles.buttonsCon}>
            <View style={{flex: 1}}>
              <IconButton
                style={[styles.circle]}
                onPress={() => navigation.goBack()}>
                <RightArrowIcon fill={Colors.white} />
              </IconButton>
            </View>

            <IconButton
              onPress={onFavSwitchPress}
              style={[
                styles.circle,
                stateIsFav && {backgroundColor: Colors.white},
              ]}>
              {stateIsFav ? <RedHeart /> : <HeartIcon fill={Colors.white} />}
              {/* {<HeartIcon fill={Colors.white} />} */}
            </IconButton>

            <IconButton style={[styles.circle, {marginLeft: 8}]}>
              <CurvedArrow />
            </IconButton>
          </View>
        )}
        <FlatList
          onScroll={({nativeEvent}) => {
            onChange(nativeEvent);
          }}
          ref={indexRef}
          style={[
            styles.scrollView,
            flatListStyle,
            {
              flexDirection: 'row',
            },
          ]}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={bannerData}
          keyExtractor={(_, index) => index.toString()}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({item}: any) => {
            return (
              <View
                style={[
                  {
                    width: phoneWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  styleContainer,
                ]}>
                <Image
                  style={[styles.image, imageStyle]}
                  resizeMode={imageResizeMode ? imageResizeMode : 'stretch'}
                  source={{uri: item.image}}
                />
              </View>
            );
          }}
        />
        <View
          style={[
            styles.dotIcons,
            {
              flexDirection: 'row',
              marginTop: PixelPerfect(-15),
            },
            styleDots,
          ]}>
          {bannerData?.map((e: any, index: number) => (
            <View
              key={index}
              style={[
                {
                  backgroundColor:
                    selectedIndex === index ? activeDotColor : inActiveDotColor,
                  borderColor:
                    selectedIndex === index
                      ? activeDotBorderColor
                      : inActiveDotBorderColor,
                  height: PixelPerfect(6),
                  width: PixelPerfect(6),
                  borderRadius: PixelPerfect(3),
                  marginHorizontal: 5,
                },
                dotStyle,
              ]}
            />
          ))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  scrollView: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  image: {
    height: phoneHeight / 4,
    width: phoneWidth * 0.8,
    borderRadius: 15,
  },
  dotIcons: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonsCon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? PixelPerfect(30) : PixelPerfect(40),
    zIndex: 1,
    width: phoneWidth,
    flexDirection: 'row',
    ...SharedStyles.paddingHorizontal,
  },
  heartButton: {
    ...SharedStyles.centred,
    ...SharedStyles.shadow,
    height: 28,
    width: 28,
    borderRadius: 14,
    marginTop: 5,
  },
  circle: {
    height: PixelPerfect(40),
    width: PixelPerfect(40),
    borderRadius: PixelPerfect(20),
    backgroundColor: ColorWithOpacity(Colors.black, 0.5),
    ...SharedStyles.centred,
    // backgroundColor: stateIsFav
    //   ? Colors.white
    //   : ColorWithOpacity(Colors.black, 0.5),
    // ...SharedStyles.centred,
  },
});

export default MainSlider;
