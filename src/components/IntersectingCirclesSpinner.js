/** @flow **/
import type { Element } from 'react';
import React, { useEffect, useState } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { useAnimated } from '../core/customHooks';

type EpicSpinnersProps = {
  size?: number,
  color?: string,
  animationDuration?: number,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 70,
  color: 'red',
  animationDuration: 2500
};

export const IntersectingCirclesSpinner = (props: EpicSpinnersProps): Element<any> => {
  const { size, color, animationDuration, style } = props;
  const [animated] = useAnimated();
  const circleSize = size;
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      alignItems: 'center',
      justifyContent: 'center'
    },
    spinnerBlock: {
      height: size,
      width: size
    },
    circle: {
      borderWidth: size * 0.06,
      borderColor: color,
      borderRadius: size * 0.5,
      height: '100%',
      width: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    },
    firstCircle: {
      left: 0,
      top: 0
    },
    secondCircle: {
      left: circleSize * -0.36,
      top: circleSize * 0.2
    },
    thirdCircle: {
      left: circleSize * -0.36,
      top: circleSize * -0.2
    },
    forthCircle: {
      left: 0,
      top: circleSize * -0.36
    },
    fifthCircle: {
      left: circleSize * 0.36,
      top: circleSize * -0.2
    },
    sixthCircle: {
      left: circleSize * 0.36,
      top: circleSize * 0.2
    },
    seventhCircle: {
      left: 0,
      top: circleSize * 0.36
    }
  });
  const animateStyle = {
    rotate: {
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ]
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 2,
        duration: animationDuration,
        easing: Easing.linear
      })
    ).start();
  }, [animated, animationDuration]);

  return (
    <Animated.View style={[style, spinnerStyle.container, animateStyle.rotate]} {...props}>
      <View style={spinnerStyle.spinnerBlock}>
        <View style={[spinnerStyle.circle, spinnerStyle.firstCircle]} />
        <View style={[spinnerStyle.circle, spinnerStyle.secondCircle]} />
        <View style={[spinnerStyle.circle, spinnerStyle.thirdCircle]} />
        <View style={[spinnerStyle.circle, spinnerStyle.forthCircle]} />
        <View style={[spinnerStyle.circle, spinnerStyle.fifthCircle]} />
        <View style={[spinnerStyle.circle, spinnerStyle.sixthCircle]} />
        <View style={[spinnerStyle.circle, spinnerStyle.seventhCircle]} />
      </View>
    </Animated.View>
  );
};

IntersectingCirclesSpinner.defaultProps = EpicSpinnersDefaultProps;
