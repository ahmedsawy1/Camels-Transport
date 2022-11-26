import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import {SharedStyles} from '../../styles/sharedStyles';
import {Colors} from '../../styles/stylesConstants';

interface ISafeView {
  style?: StyleProp<ViewStyle>;
  children?: any;
  hasPaddingHorizontal?: boolean;
}

const SafeView: FC<ISafeView> = ({style, children, hasPaddingHorizontal}) => {
  const styles = useStyles();

  const styleArr = [
    styles.cont,
    hasPaddingHorizontal && {...SharedStyles.paddingHorizontal},
    style,
  ];

  if (Platform.OS == 'android') return <View style={styleArr}>{children}</View>;
  else
    return (
      <View style={styleArr}>
        <SafeAreaView style={styleArr}>{children}</SafeAreaView>
      </View>
    );
};

const useStyles = () =>
  StyleSheet.create({
    cont: {
      flex: 1,
      backgroundColor: Colors.white,
    },
  });

export default SafeView;
