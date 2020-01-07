/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function HollowDotsSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const dotsNum = 3;
  const animationDelay = animationDuration * 0.3;
  const VIEWS = useAnimatedViewsNameGenerator('circle', 3);
  const [leftCircle, middleCircle, rightCircle] = useAnimated(3);
  const spinnerStyle = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: size,
      width: 2 * size * dotsNum
    },
    dot: {
      width: size,
      height: size,
      borderColor: color,
      borderRadius: size * 0.5,
      borderWidth: size * 0.2,
      marginRight: size / 0.5,
      transform: [{ scale: 0 }]
    }
  });
  const animatedStyle = {
    circle1: {
      transform: [
        {
          scale: leftCircle.interpolate({
            inputRange: [0, 1, 1.1, 2],
            outputRange: [0, 2, 2, 0]
          })
        }
      ],
      opacity: leftCircle.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 1, 0]
      })
    },
    circle2: {
      transform: [
        {
          scale: middleCircle.interpolate({
            inputRange: [0, 1, 1.1, 2],
            outputRange: [0, 2, 2, 0]
          })
        }
      ],
      opacity: middleCircle.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 1, 0]
      })
    },
    circle3: {
      transform: [
        {
          scale: rightCircle.interpolate({
            inputRange: [0, 1, 1.1, 2],
            outputRange: [0, 2, 2, 0]
          })
        }
      ],
      opacity: rightCircle.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 1, 0]
      })
    }
  };

  useEffect(() => {
    const getAnimatedTimingLoop = (animated) => {
      return Animated.loop(
        Animated.timing(animated, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease)
        })
      );
    };

    Animated.stagger(animationDelay, [
      getAnimatedTimingLoop(leftCircle),
      getAnimatedTimingLoop(middleCircle),
      getAnimatedTimingLoop(rightCircle)
    ]).start();
  }, [animationDelay, animationDuration, leftCircle, middleCircle, rightCircle]);
  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews animatedViewsArray={VIEWS} animatedStyle={animatedStyle} style={spinnerStyle.dot} />
      </View>
    </View>
  );
}

HollowDotsSpinner.defaultProps = EpicSpinnersDefaultProps;
