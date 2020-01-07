/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function BreedingRhombusSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const animationDelay = animationDuration * 0.05;
  const axisDirection = {
    center: 0,
    positive: containerSize * 0.4,
    negative: containerSize * -0.4,
    slowPositive: containerSize * 0.5,
    slowNegative: containerSize * -0.5
  };
  const animatedInterpolateOutputRange = {
    positive: [axisDirection.center, axisDirection.positive, axisDirection.slowPositive, axisDirection.center],
    negative: [axisDirection.center, axisDirection.negative, axisDirection.slowNegative, axisDirection.center]
  };
  const [rhombus1, rhombus2, rhombus3, rhombus4, rhombus5, rhombus6, rhombus7, rhombus8] = useAnimated(8);
  const VIEWS = useAnimatedViewsNameGenerator('rhombus', 8);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      position: 'relative',
      transform: [{ rotate: '45deg' }]
    },
    rhombus: {
      height: containerSize / 7.5,
      width: containerSize / 7.5,
      top: containerSize / 2.3077,
      left: containerSize / 2.3077,
      backgroundColor: color,
      position: 'absolute'
    },
    big: {
      height: containerSize / 3,
      width: containerSize / 3,
      top: containerSize / 3,
      left: containerSize / 3,
      backgroundColor: color
    }
  });
  const animatedStyle = {
    rhombus1: {
      transform: [
        {
          translateX: rhombus1.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.negative
          })
        },
        {
          translateY: rhombus1.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.negative
          })
        }
      ]
    },
    rhombus2: {
      transform: [
        {
          translateX: axisDirection.center
        },
        {
          translateY: rhombus2.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.negative
          })
        }
      ]
    },
    rhombus3: {
      transform: [
        {
          translateX: rhombus3.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.positive
          })
        },
        {
          translateY: rhombus3.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.negative
          })
        }
      ]
    },
    rhombus4: {
      transform: [
        {
          translateX: rhombus4.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.positive
          })
        },
        {
          translateY: axisDirection.center
        }
      ]
    },
    rhombus5: {
      transform: [
        {
          translateX: rhombus5.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.positive
          })
        },
        {
          translateY: rhombus5.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.positive
          })
        }
      ]
    },
    rhombus6: {
      transform: [
        {
          translateX: axisDirection.center
        },
        {
          translateY: rhombus6.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.positive
          })
        }
      ]
    },
    rhombus7: {
      transform: [
        {
          translateX: rhombus7.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.negative
          })
        },
        {
          translateY: rhombus7.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.positive
          })
        }
      ]
    },
    rhombus8: {
      transform: [
        {
          translateX: rhombus8.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: animatedInterpolateOutputRange.negative
          })
        },
        {
          translateY: axisDirection.center
        }
      ]
    }
  };

  useEffect(() => {
    const getAnimatedTiming = (animated) => {
      return Animated.timing(animated, {
        toValue: 2,
        duration: animationDuration
      });
    };

    Animated.loop(
      Animated.stagger(animationDelay, [
        getAnimatedTiming(rhombus1),
        getAnimatedTiming(rhombus2),
        getAnimatedTiming(rhombus3),
        getAnimatedTiming(rhombus4),
        getAnimatedTiming(rhombus5),
        getAnimatedTiming(rhombus6),
        getAnimatedTiming(rhombus7),
        getAnimatedTiming(rhombus8)
      ])
    ).start();
  }, [
    animationDuration,
    animationDelay,
    rhombus1,
    rhombus2,
    rhombus3,
    rhombus4,
    rhombus5,
    rhombus6,
    rhombus7,
    rhombus8
  ]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container} {...restProps}>
        <GenerateAnimatedViews animatedViewsArray={VIEWS} animatedStyle={animatedStyle} style={spinnerStyle.rhombus} />
        <View style={[spinnerStyle.rhombus, spinnerStyle.big]} />
      </View>
    </View>
  );
}

BreedingRhombusSpinner.defaultProps = EpicSpinnersDefaultProps;
