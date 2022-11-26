import {Modal, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import SafeView from '../../components/views/SafeView';
import Video from 'react-native-video';
import ModalHeader from '../../components/headers/ModalHeader';
import {t} from 'i18next';
import {Colors, phoneHeight, PixelPerfect} from '../../styles/stylesConstants';

const VideoModalContent: FC<{
  visible: boolean;
  onClosePress: () => void;
  videoURI: string;
}> = ({visible, onClosePress, videoURI}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClosePress}>
      <SafeView style={{}}>
        <ModalHeader
          // title={t('locateArriveLocation')}
          title={'طريقة الاستخدام'}
          onClosePress={onClosePress}
        />
        <Video
          controls
          source={{
            uri: videoURI,
          }} // Can be a URL or a local file.
          // Store reference
          onBuffer={() => {
            console.log('Buffer');
          }} // Callback when remote video is buffering
          onError={err => {
            console.log('====================================');
            console.log(err);
          }} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />
      </SafeView>
    </Modal>
  );
};

export default VideoModalContent;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: PixelPerfect(60),
    height: phoneHeight / 1.3,
    width: '100%',
    backgroundColor: Colors.black,
  },
});
