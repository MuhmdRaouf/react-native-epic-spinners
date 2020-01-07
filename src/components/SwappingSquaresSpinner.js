/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function SwappingSquaresSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 1.5;
  const axisDirection = {
    center: 0,
    positive: containerSize * 0.65,
    negative: containerSize * -0.65,
    slowPositive: containerSize * 0.7,
    slowNegative: containerSize * -0.7
  };
  const animatedInterpolateOutputRange = {
    positive: [
      axisDirection.center,
      axisDirection.positive,
      axisDirection.slowPositive,
      axisDirection.slowPositive,
      axisDirection.center
    ],
    negative: [
      axisDirection.center,
      axisDirection.negative,
      axisDirection.slowNegative,
      axisDirection.slowNegative,
      axisDirection.center
    ]
  };
  const [rightAnimation, leftAnimation] = useAnimated(2);
  const VIEWS = useAnimatedViewsNameGenerator('square', 4);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center'
    },
    square: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      borderColor: color,
      borderWidth: containerSize * 0.2
    }
  });
  const animatedStyle = {
    square1: {
      transform: [
        {
          translateX: rightAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: animatedInterpolateOutputRange.negative
          })
        },
        {
          translateY: rightAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: animatedInterpolateOutputRange.negative
          })
        },
        {
          scale: rightAnimation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0.5, 1, 1, 0.5]
          })
        }
      ]
    },
    square2: {
      transform: [
        {
          translateX: rightAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: animatedInterpolateOutputRange.positive
          })
        },
        {
          translateY: rightAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: animatedInterpolateOutputRange.positive
          })
        },
        {
          scale: rightAnimation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0.5, 1, 1, 0.5]
          })
        }
      ]
    },
    square3: {
      transform: [
        {
          translateX: leftAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: animatedInterpolateOutputRange.positive
          })
        },
        {
          translateY: leftAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: animatedInterpolateOutputRange.negative
          })
        },
        {
          scale: leftAnimation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0.5, 1, 1, 0.5]
          })
        }
      ]
    },
    square4: {
      transform: [
        {
          translateX: leftAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: animatedInterpolateOutputRange.negative
          })
        },
        {
          translateY: leftAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: animatedInterpolateOutputRange.positive
          })
        },
        {
          scale: leftAnimation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0.5, 1, 1, 0.5]
          })
        }
      ]
    }
  };

  useEffect(() => {
    const getAnimatedTimingLoop = (animated) => {
      return Animated.loop(
        Animated.timing(animated, {
          toValue: 3,
          duration: animationDuration
        })
      );
    };

    Animated.stagger(animationDuration * 0.5, [
      getAnimatedTimingLoop(rightAnimation),
      getAnimatedTimingLoop(leftAnimation)
    ]).start();
  }, [animationDuration, leftAnimation, rightAnimation]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews animatedViewsArray={VIEWS} animatedStyle={animatedStyle} style={spinnerStyle.square} />
      </View>
    </View>
  );
}

SwappingSquaresSpinner.defaultProps = EpicSpinnersDefaultProps;
