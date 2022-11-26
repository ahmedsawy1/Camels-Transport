import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';
import {CameraIcon, MapMarkerIcon} from '../../assets/svg/icons';

interface Props {
  options?: TextInputProps & {ref?: (ref: any) => void};
  styleTextInput?: StyleProp<TextStyle>;
  onSendMessage: () => void;
  onSendImage?: () => void;
  onSendMap?: () => void;
}

const MessageInput: FC<Props> = ({
  options,
  styleTextInput,
  onSendMessage,
  onSendImage,
  onSendMap,
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={styles.cont}>
        <TextInput
          style={[styles.textInput, styleTextInput]}
          placeholderTextColor="#9B9B9B"
          {...options}
        />
        <View style={styles.iconsCont}>
          <TouchableOpacity style={styles.iconCont} onPress={onSendMap}>
            <MapMarkerIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconCont} onPress={onSendImage}>
            <CameraIcon />
          </TouchableOpacity>
        </View>
      </View>
      <Pressable style={styles.sendButtonCont} onPress={onSendMessage}>
        <Image
          source={require('../../assets/icons/message-arrow.png')}
          style={{height: PixelPerfect(24), width: PixelPerfect(24)}}
        />
      </Pressable>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  cont: {
    height: PixelPerfect(48),
    borderRadius: PixelPerfect(50),
    // width: '100%',
    paddingHorizontal: PixelPerfect(16),
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    flex: 1,
  },
  textInput: {
    flex: 3,
    fontSize: PixelPerfect(14),
    fontFamily: Fonts.Medium,
    color: Colors.black,
    textAlign: 'right',
  },
  iconsCont: {
    flex: 1,
    flexDirection: 'row',
  },
  iconCont: {
    flex: 1,
    ...SharedStyles.centred,
  },
  sendButtonCont: {
    height: PixelPerfect(45),
    width: PixelPerfect(45),
    borderRadius: PixelPerfect(25),
    backgroundColor: Colors.mainColor,
    marginLeft: 10,
    ...SharedStyles.centred,
  },
});
