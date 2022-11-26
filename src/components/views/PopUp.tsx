import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';

interface IPopUp {
  visible: boolean;
  onRequestClose: () => void;
  animationType?: any;
  isFullScreen?: boolean;
  children: JSX.Element | JSX.Element[];
  styleTouchable?: StyleProp<ViewStyle>;
  styleCont?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const PopUp: FC<IPopUp> = ({
  visible,
  onRequestClose,
  animationType,
  children,
  styleTouchable,
  style,
  isFullScreen = false,
  styleCont,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType={animationType ? animationType : 'fade'}
      onRequestClose={onRequestClose}>
      <TouchableOpacity
        style={[
          {
            flex: 1,
            backgroundColor: 'rgba(29, 37, 45, 0.5)',
          },
          styleTouchable,
        ]}
        onPress={onRequestClose}></TouchableOpacity>

      <View
        style={[
          {
            flex: 1.5,
            backgroundColor: 'rgba(29, 37, 45, 0.5)',
          },
          styleCont,
        ]}>
        <View style={[styles.modalView, style]}>
          <View style={styles.lineView} />
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  modalView: {
    flex: 1.5,
    backgroundColor: Colors.white,
    paddingTop: 24,
    borderTopLeftRadius: PixelPerfect(50),
    borderTopRightRadius: PixelPerfect(50),
  },
  lineView: {
    width: 30,
    height: 5,
    borderRadius: 2,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
    marginTop: -10,
  },
});
