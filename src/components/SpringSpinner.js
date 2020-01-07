/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated } from '../core/CustomHooks';

export function SpringSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const start = containerSize / 7;
  const end = containerSize / 23.33;
  const [animated] = useAnimated();
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize
    },
    springSpinnerPart: {
      overflow: 'hidden',
      height: containerSize / 2,
      width: containerSize
    },
    bottom: {
      bottom: size * 0.001,
      transform: [{ rotate: '180deg' }, { scaleX: -1 }, { scaleY: 1 }]
    },
    springSpinnerRotator: {
      width: containerSize,
      height: containerSize,
      borderColor: 'transparent',
      borderRightColor: color,
      borderTopColor: color,
      borderRadius: containerSize
    }
  });
  const animatedStyle = {
    rotator: {
      borderWidth: animated.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: [start, end, start, end, start]
      }),
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 1.8, 2, 3.8, 4],
            outputRange: ['-200deg', '100deg', '115deg', '-185deg', '-200deg']
          })
        }
      ]
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 4,
        duration: animationDuration,
        easing: Easing.linear
      })
    ).start();
  }, [animationDuration, animated]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <View style={spinnerStyle.springSpinnerPart}>
          <Animated.View style={[spinnerStyle.springSpinnerRotator, animatedStyle.rotator]} />
        </View>
        <View style={[spinnerStyle.springSpinnerPart, spinnerStyle.bottom]}>
          <Animated.View style={[spinnerStyle.springSpinnerRotator, animatedStyle.rotator]} />
        </View>
      </View>
    </View>
  );
}

SpringSpinner.defaultProps = EpicSpinnersDefaultProps;
