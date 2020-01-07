/** @flow **/
import type { Element } from 'react';
import React from 'react';
import { Animated } from 'react-native';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

type GenerateAnimatedViewsPropsType = {
  animatedViewsArray: Array<string>,
  animatedStyle?: mixed,
  spinnerStyle?: mixed,
  style?: ViewStyleProp<{ [string]: string }>
};

export const GenerateAnimatedViews = (props: GenerateAnimatedViewsPropsType): Array<Element<any>> => {
  const { animatedViewsArray, animatedStyle, spinnerStyle, style } = props;
  return animatedViewsArray.map((val, index) => {
    // $FlowFixMe
    return <Animated.View key={index} style={[style, spinnerStyle[val], animatedStyle[val]]} />;
  });
};

GenerateAnimatedViews.defaultProps = {
  animatedViewsArray: [],
  animatedStyle: {},
  spinnerStyle: {}
};
