import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {SharedStyles} from '../../styles/sharedStyles';
import {ArrowLeftIcon} from '../../assets/svg/icons';

interface Props {
  title: string;
  onPress: () => void;
  hasBorder?: boolean;
}

const SectionButton: FC<Props> = ({title, onPress, hasBorder = true}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.cont}>
        <Text style={styles.title}>{title}</Text>
        <ArrowLeftIcon fill="#222222" />
      </View>
      {hasBorder && <View style={styles.separator} />}
    </Pressable>
  );
};

export default SectionButton;

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    ...SharedStyles.textMedium16,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#DEE1E6',
    marginVertical: 15,
  },
});
