import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {Children} from 'react';
import {
  Colors,
  phoneHeight,
  phoneWidth,
  PixelPerfect,
} from '../../styles/stylesConstants';
import {SharedStyles} from '../../styles/sharedStyles';
import {CloseIcon} from '../../assets/svg/icons';

const MainAlert = ({onClose, children, animationType, visible}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType={animationType ? animationType : 'fade'}
      onRequestClose={onClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
        <Pressable style={{flex: 1}} onPress={onClose} />
        <View style={{flexDirection: 'row'}}>
          <Pressable style={{flex: 1}} onPress={onClose} />
          <View
            style={{
              backgroundColor: Colors.white,
              paddingVertical: PixelPerfect(34),
              ...SharedStyles.paddingHorizontal,
              width: '90%',
              borderRadius: PixelPerfect(10),
            }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                position: 'absolute',
                right: PixelPerfect(12),
                top: PixelPerfect(12),
              }}>
              <CloseIcon />
            </TouchableOpacity>
            {children}
          </View>
          <Pressable style={{flex: 1}} onPress={onClose} />
        </View>
        <Pressable style={{flex: 1}} onPress={onClose} />
      </View>
    </Modal>
  );
};

export default MainAlert;

const styles = StyleSheet.create({});
