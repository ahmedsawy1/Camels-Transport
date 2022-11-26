import React, {FC, useEffect, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import {
  ArrowDownIcon,
  MinusIcon,
  PlusIcon,
  // ArrowUpIcon,
  // ExclamationIcon,
} from '../../assets/svg/icons';
import {fontStyle} from '../../styles/fonts';
import {Colors, Fonts, PixelPerfect} from '../../styles/stylesConstants';

interface IAccordian {
  title: string;
  content: any;
}

const Accordian: FC<IAccordian> = ({title, content}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const toggleExpand = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        100,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleY,
      ),
    );
    setExpanded(old => !old);
  };

  return (
    <View style={[styles.container]}>
      <Pressable onPress={toggleExpand}>
        <View
          style={[
            styles.header,
            {
              borderBottomLeftRadius: expanded ? 0 : 10,
              borderBottomRightRadius: expanded ? 0 : 10,
            },
          ]}>
          {/* <ExclamationIcon /> */}

          <Text style={[styles.title, {fontFamily: Fonts.Bold}]}>{title}</Text>
          <View style={styles.plus}>
            {expanded ? <MinusIcon /> : <PlusIcon />}
          </View>
        </View>
      </Pressable>
      {expanded && <View style={styles.child}>{content}</View>}
    </View>
  );
};

export default Accordian;
const styles = StyleSheet.create({
  container: {
    marginBottom: PixelPerfect(10),
    backgroundColor: '#F5F5F5',
    borderRadius: PixelPerfect(8),
  },
  title: {
    ...fontStyle.Bold17,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    padding: 14,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  plus: {
    marginLeft: 'auto',
    fontSize: 30,
    color: '#CCCCCC',
  },
  child: {
    paddingHorizontal: PixelPerfect(15),
    padding: PixelPerfect(10),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#F5F5F5',
  },
});
