import React, {FC, useRef} from 'react';
import {View, StyleSheet, Text, Button, ViewProps} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Colors} from '../../styles/stylesConstants';
import {useTranslation} from 'react-i18next';
import {SharedStyles} from '../../styles/sharedStyles';

const CustomSlider: FC<{initVal: [number, number]}> = ({
  initVal,
  title,
  unit,
  onValueChange,
}) => {
  const max = initVal[1];
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text
          style={[
            styles.textValue,
          ]}>{`${initVal[0]} - ${initVal[1]} ${unit}`}</Text>
      </View>
      <MultiSlider
        values={initVal}
        max={max}
        onValuesChange={onValueChange}
        markerStyle={{
          backgroundColor: 'white',
          padding: 10,
          elevation: 5,
          top: 2,
        }}
        selectedStyle={{
          backgroundColor: Colors.mainColor,
          height: 6,
        }}
        trackStyle={{height: 6, backgroundColor: '#F1F1F1'}}
        containerStyle={{}}
      />
    </View>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    ...SharedStyles.textMedium16,
    flex: 1,
  },
  textValue: {
    ...SharedStyles.textMedium16,
    color: Colors.mainColor,
  },
});
