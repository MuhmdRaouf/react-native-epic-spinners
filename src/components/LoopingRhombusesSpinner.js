/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function LoopingRhombusesSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const [firstRhombuses, secondRhombuses, thirdRhombuses] = useAnimated(3);
  const VIEWS = useAnimatedViewsNameGenerator('rhombus', 3);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'relative'
    },
    rhombus: {
      height: size,
      width: size,
      backgroundColor: color,
      position: 'absolute',
      left: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size * 0.2
    }
  });

  const getAnimatedStyle = (animated) => {
    return [
      {
        translateX: animated.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, -50, -100]
        })
      },
      {
        scale: animated.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 0]
        })
      },
      {
        rotate: '45deg'
      }
    ];
  };
  const animatedStyle = {
    rhombus1: {
      transform: getAnimatedStyle(firstRhombuses)
    },
    rhombus2: {
      transform: getAnimatedStyle(secondRhombuses)
    },
    rhombus3: {
      transform: getAnimatedStyle(thirdRhombuses)
    }
  };

  useEffect(() => {
    const getAnimatedTimingLoop = (animated) => {
      return Animated.loop(
        Animated.timing(animated, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.linear
        })
      );
    };

    Animated.stagger(animationDuration * 0.3, [
      getAnimatedTimingLoop(firstRhombuses),
      getAnimatedTimingLoop(secondRhombuses),
      getAnimatedTimingLoop(thirdRhombuses)
    ]).start();
  }, [animationDuration, firstRhombuses, secondRhombuses, thirdRhombuses]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews animatedViewsArray={VIEWS} animatedStyle={animatedStyle} style={spinnerStyle.rhombus} />
      </View>
    </View>
  );
}

LoopingRhombusesSpinner.defaultProps = EpicSpinnersDefaultProps;
