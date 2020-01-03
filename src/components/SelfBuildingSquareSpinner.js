/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { useAnimated } from '../core/customHooks';

type EpicProps = {
  size?: number,
  animationDuration?: number,
  color?: string,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 40,
  color: 'red',
  animationDuration: 5000
};

export const SelfBuildingSquareSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style } = props;
  const [square1, square2, square3, square4, square5, square6, square7, square8, square9] = useAnimated(9);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size
    },
    squareContainer: {
      flexDirection: 'row'
    },
    square: {
      height: size / 4,
      width: size / 4,
      marginRight: size / 4,
      marginTop: size / 4,
      backgroundColor: color,
      position: 'relative'
    }
  });
  const getAnimatedStyle = (animated) => {
    return {
      opacity: animated.interpolate({
        inputRange: [0, 0.5, 5.09, 5.59, 6],
        outputRange: [0, 1, 1, 0, 0]
      }),
      top: animated.interpolate({
        inputRange: [0, 0.5, 5.09, 5.59, 6],
        outputRange: [-1, 5, 5, -1, -1]
      })
    };
  };

  const animatedStyle = {
    square1: getAnimatedStyle(square1),
    square2: getAnimatedStyle(square2),
    square3: getAnimatedStyle(square3),
    square4: getAnimatedStyle(square4),
    square5: getAnimatedStyle(square5),
    square6: getAnimatedStyle(square6),
    square7: getAnimatedStyle(square7),
    square8: getAnimatedStyle(square8),
    square9: getAnimatedStyle(square9)
  };

  useEffect(() => {
    const getAnimatedTiming = (animated) => {
      return Animated.timing(animated, {
        toValue: 6,
        duration: animationDuration,
        easing: Easing.linear
      });
    };

    Animated.loop(
      Animated.stagger(animationDuration * 0.09, [
        getAnimatedTiming(square7),
        getAnimatedTiming(square8),
        getAnimatedTiming(square9),
        getAnimatedTiming(square4),
        getAnimatedTiming(square5),
        getAnimatedTiming(square6),
        getAnimatedTiming(square1),
        getAnimatedTiming(square2),
        getAnimatedTiming(square3)
      ])
    ).start();
  }, [animationDuration, square1, square2, square3, square4, square5, square6, square7, square8, square9]);

  return (
    <View style={style} {...props}>
      <View style={spinnerStyle.container}>
        <View style={spinnerStyle.squareContainer}>
          <Animated.View style={[spinnerStyle.square, animatedStyle.square1]} />
          <Animated.View style={[spinnerStyle.square, animatedStyle.square2]} />
          <Animated.View style={[spinnerStyle.square, animatedStyle.square3]} />
        </View>
        <View style={spinnerStyle.squareContainer}>
          <Animated.View style={[spinnerStyle.square, animatedStyle.square4]} />
          <Animated.View style={[spinnerStyle.square, animatedStyle.square5]} />
          <Animated.View style={[spinnerStyle.square, animatedStyle.square6]} />
        </View>
        <View style={spinnerStyle.squareContainer}>
          <Animated.View style={[spinnerStyle.square, animatedStyle.square7]} />
          <Animated.View style={[spinnerStyle.square, animatedStyle.square8]} />
          <Animated.View style={[spinnerStyle.square, animatedStyle.square9]} />
        </View>
      </View>
    </View>
  );
};

SelfBuildingSquareSpinner.defaultProps = EpicSpinnersDefaultProps;
