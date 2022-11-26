import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {Marker2} from '../../assets/svg/icons';
import {fontStyle} from '../../styles/fonts';

interface Props {
  title: string;
  subTitle: string;
  icon: JSX.Element;
  pressableWord: string;
  reverseStyle?: boolean;
}

const DetailsCard: FC<Props> = ({
  title,
  subTitle,
  icon,
  pressableWord,
  reverseStyle = false,
}) => {
  return (
    <View
      style={{
        ...SharedStyles.paddingHorizontal,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {icon}
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <Text style={reverseStyle ? styles.subtitle : styles.title}>
          {title}
        </Text>
        <Text style={reverseStyle ? styles.title : styles.subtitle}>
          {subTitle}
        </Text>
      </View>

      <Text style={{...fontStyle.Bold14, color: '#2664C0'}}>
        {pressableWord}
      </Text>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  title: {
    ...fontStyle.Medium17,
    marginVertical: 5,
  },
  subtitle: {
    ...fontStyle.Medium14,
    color: '#112134B2',
  },
});
