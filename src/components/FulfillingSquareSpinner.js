/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated } from '../core/CustomHooks';

export function FulfillingSquareSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 4;
  const [animated] = useAnimated();
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      position: 'relative',
      borderWidth: containerSize * 0.1,
      borderColor: color
    },
    spinnerInner: {
      backgroundColor: color,
      width: '100%',
      opacity: 1
    }
  });
  const animatedStyle = {
    container: {
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 1, 2, 4, 5],
            outputRange: ['0deg', '180deg', '180deg', '360deg', '360deg']
          })
        }
      ]
    },
    spinnerInner: {
      height: animated.interpolate({
        inputRange: [0, 1, 2, 4, 5],
        outputRange: ['0%', '0%', '100%', '100%', '0%']
      })
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 5,
        duration: animationDuration,
        easing: Easing.ease
      })
    ).start();
  }, [animated, animationDuration]);

  return (
    <View style={style} {...restProps}>
      <Animated.View style={[spinnerStyle.container, animatedStyle.container]}>
        <Animated.View style={[spinnerStyle.spinnerInner, animatedStyle.spinnerInner]} />
      </Animated.View>
    </View>
  );
}

FulfillingSquareSpinner.defaultProps = EpicSpinnersDefaultProps;
