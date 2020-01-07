/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function SelfBuildingSquareSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 2.5;
  const [square1, square2, square3, square4, square5, square6, square7, square8, square9] = useAnimated(9);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize
    },
    squareContainer: {
      flexDirection: 'row'
    },
    square: {
      height: containerSize / 4,
      width: containerSize / 4,
      marginRight: containerSize / 4,
      marginTop: containerSize / 4,
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
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <View style={spinnerStyle.squareContainer}>
          <GenerateAnimatedViews
            animatedViewsArray={['square1', 'square2', 'square3']}
            animatedStyle={animatedStyle}
            style={spinnerStyle.square}
          />
        </View>
        <View style={spinnerStyle.squareContainer}>
          <GenerateAnimatedViews
            animatedViewsArray={['square4', 'square5', 'square6']}
            animatedStyle={animatedStyle}
            style={spinnerStyle.square}
          />
        </View>
        <View style={spinnerStyle.squareContainer}>
          <GenerateAnimatedViews
            animatedViewsArray={['square7', 'square8', 'square9']}
            animatedStyle={animatedStyle}
            style={spinnerStyle.square}
          />
        </View>
      </View>
    </View>
  );
}

SelfBuildingSquareSpinner.defaultProps = EpicSpinnersDefaultProps;
