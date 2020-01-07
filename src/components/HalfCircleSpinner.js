/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function HalfCircleSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const [firstInnerCircle, secondInnerCircle] = useAnimated(2);
  const VIEWS = useAnimatedViewsNameGenerator('innerCircle', 2);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      position: 'relative',
      borderRadius: containerSize
    },
    circle: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: containerSize,
      borderWidth: containerSize / 10,
      borderColor: 'transparent'
    },
    innerCircle1: {
      borderTopColor: color
    },
    innerCircle2: {
      borderBottomColor: color
    }
  });
  const animatedStyle = {
    innerCircle1: {
      transform: [
        {
          rotate: firstInnerCircle.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ]
    },
    innerCircle2: {
      transform: [
        {
          rotate: secondInnerCircle.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
          })
        }
      ]
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(firstInnerCircle, {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(secondInnerCircle, {
            toValue: 1,
            duration: animationDuration,
            easing: Easing.quad
          }),
          Animated.timing(secondInnerCircle, {
            toValue: 0,
            duration: animationDuration,
            easing: Easing.linear
          })
        ])
      )
    ]).start();
  }, [animationDuration, firstInnerCircle, secondInnerCircle]);
  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews
          animatedViewsArray={VIEWS}
          animatedStyle={animatedStyle}
          spinnerStyle={spinnerStyle}
          style={spinnerStyle.circle}
        />
      </View>
    </View>
  );
}

HalfCircleSpinner.defaultProps = EpicSpinnersDefaultProps;
