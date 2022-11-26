import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import SafeView from './SafeView';
import WebView from 'react-native-webview';
import {phoneHeight, phoneWidth} from '../../styles/stylesConstants';

const Webview: FC<{source: string}> = ({source}) => {
  return (
    <SafeView>
      <WebView
        style={{
          height: phoneHeight,
          width: phoneWidth,
        }}
        source={source}
        // onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeView>
  );
};

export default Webview;

const styles = StyleSheet.create({});
