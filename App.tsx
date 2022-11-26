import React from 'react';
import {Provider} from 'react-redux';
import AppInitializer from './src/AppInitializer';
import FlashMessage from 'react-native-flash-message';
import {Fonts} from './src/styles/stylesConstants';
import {store} from './store/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppInitializer />
      </Provider>

      <FlashMessage
        position="top"
        floating
        hideOnPress={true}
        style={{paddingTop: 15}}
        titleStyle={{
          fontFamily: Fonts.Medium,
          paddingTop: 10,
        }}
        textStyle={{
          fontFamily: Fonts.Medium,
        }}
      />
    </>
  );
}
