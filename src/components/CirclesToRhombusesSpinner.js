/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function CirclesToRhombusesSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const [leftCircle, middleCircle, rightCircle] = useAnimated(3);
  const VIEWS = useAnimatedViewsNameGenerator('circle', 3);
  const getAnimatedInterpolation = (animated) => {
    const squareBorderRadius = size * 0.1;
    const circleBorderRadius = size * 0.5;
    return {
      borderRadius: animated.interpolate({
        inputRange: [0, 1.7, 9.35, 10],
        outputRange: [squareBorderRadius, circleBorderRadius, circleBorderRadius, squareBorderRadius]
      })
    };
  };
  const animationDelay = animationDuration * 0.17;
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    circle: {
      height: size,
      width: size,
      marginHorizontal: size * 0.5,
      transform: [{ rotate: '45deg' }],
      borderRadius: size * 0.1,
      borderWidth: size * 0.2,
      borderColor: color,
      overflow: 'hidden'
    }
  });
  const animatedStyle = {
    circle1: getAnimatedInterpolation(leftCircle),
    circle2: getAnimatedInterpolation(middleCircle),
    circle3: getAnimatedInterpolation(rightCircle)
  };

  useEffect(() => {
    Animated.stagger(animationDelay, [
      Animated.loop(
        Animated.timing(leftCircle, {
          toValue: 10,
          duration: animationDuration,
          easing: Easing.linear()
        })
      ),
      Animated.loop(
        Animated.timing(middleCircle, {
          toValue: 10,
          duration: animationDuration,
          easing: Easing.linear()
        })
      ),
      Animated.loop(
        Animated.timing(rightCircle, {
          toValue: 10,
          duration: animationDuration,
          easing: Easing.linear()
        })
      )
    ]).start();
  }, [animationDelay, animationDuration, leftCircle, middleCircle, rightCircle]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews animatedViewsArray={VIEWS} animatedStyle={animatedStyle} style={spinnerStyle.circle} />
      </View>
    </View>
  );
}
CirclesToRhombusesSpinner.defaultProps = EpicSpinnersDefaultProps;
