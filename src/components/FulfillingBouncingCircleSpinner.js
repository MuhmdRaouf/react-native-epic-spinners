/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function FulfillingBouncingCircleSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const VIEWS = ['circle', 'orbit'];
  const [animate] = useAnimated();
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      position: 'relative'
    },
    circle: {
      height: containerSize,
      width: containerSize,
      borderColor: color,
      borderRadius: containerSize * 0.5,
      position: 'relative',
      borderWidth: containerSize * 0.1
    },
    orbit: {
      height: containerSize,
      width: containerSize,
      borderColor: color,
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: containerSize * 0.5,
      borderWidth: containerSize * 0.03
    }
  });
  const animatedStyle = {
    container: {
      transform: [
        {
          rotate: animate.interpolate({
            inputRange: [0, 9, 10],
            outputRange: ['0deg', '360deg', '360deg']
          })
        }
      ]
    },
    orbit: {
      transform: [
        {
          scale: animate.interpolate({
            inputRange: [0, 6, 7, 8, 9, 10],
            outputRange: [1, 1, 0.8, 1, 0.8, 1]
          })
        }
      ]
    },
    circle: {
      transform: [
        {
          scale: animate.interpolate({
            inputRange: [0, 6, 7, 8, 9, 10],
            outputRange: [1, 1, 1.4, 1, 1.4, 1]
          })
        }
      ],
      borderColor: animate.interpolate({
        inputRange: [0, 4, 5, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      }),
      borderTopColor: animate.interpolate({
        inputRange: [0, 10],
        outputRange: [color, color]
      }),
      borderRightColor: animate.interpolate({
        inputRange: [0, 1, 2, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      }),
      borderBottomColor: animate.interpolate({
        inputRange: [0, 2, 3, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      })
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animate, {
        toValue: 10,
        duration: animationDuration * 4,
        easing: Easing.inOut(Easing.ease)
      })
    ).start();
  }, [animate, animationDuration]);

  return (
    <View style={style} {...restProps}>
      <Animated.View style={[spinnerStyle.container, animatedStyle.container]}>
        <GenerateAnimatedViews animatedViewsArray={VIEWS} animatedStyle={animatedStyle} spinnerStyle={spinnerStyle} />
      </Animated.View>
    </View>
  );
}

FulfillingBouncingCircleSpinner.defaultProps = EpicSpinnersDefaultProps;
