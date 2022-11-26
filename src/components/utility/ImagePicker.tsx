import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useState} from 'react';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import MainButton from '../buttons/MainButton';
import {t} from 'i18next';
import {CloseIcon} from '../../assets/svg/icons';
import {SharedStyles} from '../../styles/sharedStyles';
// import {launchImageLibrary} from 'react-native-image-picker';
import ImagePickerLib from 'react-native-image-crop-picker';

interface Props {
  selected: string | string[];
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isOneImage?: boolean;
  oneImageURL?: string;
  multiImages?: string[] | boolean;
}

const ImagePicker: FC<Props> = ({
  selected,
  onPress,
  style,
  isOneImage,
  oneImageURL,
  multiImages,
}) => {
  const [state, setState] = useState({
    oneImageName: selected,
    oneImageURL: '',
    multiImagesNames: selected,
    imageURIs: multiImages,
    finishSelect: false,
  });

  const pickImage = async () => {
    const options = isOneImage
      ? {
          width: 300,
          height: 400,
          cropping: true,
        }
      : {multiple: true};

    ImagePickerLib.openPicker(options).then(selected => {
      if (isOneImage) {
        const fileName = selected.path.substring(
          selected.path.length - 20,
          selected.path.length,
        );

        console.log(fileName);
        setState(old => ({
          ...old,
          oneImageURL: selected.path,
          oneImageName: fileName,
        }));
      } else if (!isOneImage) {
        const fileNames = selected.map((item, index) =>
          item.path.substring(item.path.length - 8, item.path.length),
        );

        console.log('=================fileNames===================');
        console.log(fileNames.toString());
        console.log('====================================');

        setState(old => ({
          ...old,
          imageURIs: selected,
          finishSelect: true,
          multiImagesNames: fileNames.join(', '),
        }));
      }
    });
  };

  return (
    <View style={style}>
      {/* <Pressable style={[styles.con]} onPress={pickImage}> */}
      <View style={[styles.con]}>
        <Text style={styles.selectedText} numberOfLines={1}>
          {isOneImage ? state.oneImageName : state.multiImagesNames}
        </Text>
        <MainButton
          title={t('add')}
          style={styles.button}
          styleTitle={styles.buttonTitle}
          onPress={pickImage}
        />
      </View>

      {isOneImage && ( // this to select just single image like license
        <View style={{marginHorizontal: PixelPerfect(25)}}>
          <TouchableOpacity style={styles.closeIconCont}>
            <CloseIcon
              fill={Colors.white}
              height={PixelPerfect(15)}
              width={PixelPerfect(15)}
            />
          </TouchableOpacity>
          <Image
            style={styles.borderedImage}
            source={{uri: state.oneImageURL ? state.oneImageURL : oneImageURL}}
          />
        </View>
      )}

      {multiImages && (
        <ScrollView horizontal contentContainerStyle={styles.scrollImageCont}>
          {state.imageURIs.map(
            (item: string | {path: string}, index: number) => (
              <View key={index} style={{marginRight: PixelPerfect(16)}}>
                <TouchableOpacity style={styles.closeIconCont}>
                  <CloseIcon
                    fill={Colors.white}
                    height={PixelPerfect(15)}
                    width={PixelPerfect(15)}
                  />
                </TouchableOpacity>
                <Image
                  style={styles.borderedImage}
                  source={{uri: state.finishSelect ? item.path : item}}
                />
              </View>
            ),
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  con: {
    height: PixelPerfect(48),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: PixelPerfect(50),
    overflow: 'hidden',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: '#9B9B9B',
    flex: 1,
    marginHorizontal: PixelPerfect(28),
    textAlign: 'left',
  },
  button: {
    height: PixelPerfect(35),
    marginRight: PixelPerfect(7),
    backgroundColor: '#B1B1B1',
  },
  buttonTitle: {
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
  },
  borderedImage: {
    height: PixelPerfect(60),
    width: PixelPerfect(60),
    backgroundColor: Colors.lightGray,
    borderRadius: PixelPerfect(5),
    marginTop: 10,
  },
  closeIconCont: {
    height: PixelPerfect(18),
    width: PixelPerfect(18),
    borderRadius: PixelPerfect(9),
    backgroundColor: '#F5596C',
    position: 'absolute',
    zIndex: 1,
    left: PixelPerfect(-8),
    top: PixelPerfect(4),
    ...SharedStyles.centred,
  },
  scrollImageCont: {
    flexDirection: 'row',
    // width: '100%',
    paddingLeft: PixelPerfect(25),
  },
});
