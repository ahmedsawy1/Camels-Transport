import {ActivityIndicator, Modal, Text, View} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors, PixelPerfect} from '../../styles/stylesConstants';
import {fontStyle} from '../../styles/fonts';

const LoaderView: FC<{visible: boolean; message?: string}> = ({visible}) => {
  return (
    <Modal transparent visible={visible}>
      <View
        style={{
          backgroundColor: '#00000099',
          flex: 1,
          ...SharedStyles.centred,
        }}>
        <ActivityIndicator size={PixelPerfect(30)} color={Colors.white} />
        <Text
          style={{...fontStyle.Medium14, color: Colors.white, marginTop: 10}}>
          رجاء انتظر قليلا...
        </Text>
      </View>
    </Modal>
  );
};

export default LoaderView;
