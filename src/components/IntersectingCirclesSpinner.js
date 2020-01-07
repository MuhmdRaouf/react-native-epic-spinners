/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function IntersectingCirclesSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 3;
  const circleSize = containerSize;
  const [animated] = useAnimated();
  const VIEWS = useAnimatedViewsNameGenerator('circle', 7);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      alignItems: 'center',
      justifyContent: 'center'
    },
    spinnerBlock: {
      height: containerSize,
      width: containerSize
    },
    circle: {
      borderWidth: containerSize * 0.06,
      borderColor: color,
      borderRadius: containerSize * 0.5,
      height: '100%',
      width: '100%',
      position: 'absolute',
      left: 0,
      top: 0
    },
    circle1: {
      left: 0,
      top: 0
    },
    circle2: {
      left: circleSize * -0.36,
      top: circleSize * 0.2
    },
    circle3: {
      left: circleSize * -0.36,
      top: circleSize * -0.2
    },
    circle4: {
      left: 0,
      top: circleSize * -0.36
    },
    circle5: {
      left: circleSize * 0.36,
      top: circleSize * -0.2
    },
    circle6: {
      left: circleSize * 0.36,
      top: circleSize * 0.2
    },
    circle7: {
      left: 0,
      top: circleSize * 0.36
    }
  });
  const animatedStyle = {
    rotate: {
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ]
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 2,
        duration: animationDuration,
        easing: Easing.linear
      })
    ).start();
  }, [animated, animationDuration]);

  return (
    <View style={style} {...restProps}>
      <Animated.View style={[spinnerStyle.container, animatedStyle.rotate]}>
        <View style={spinnerStyle.spinnerBlock}>
          <GenerateAnimatedViews animatedViewsArray={VIEWS} spinnerStyle={spinnerStyle} style={spinnerStyle.circle} />
        </View>
      </Animated.View>
    </View>
  );
}

IntersectingCirclesSpinner.defaultProps = EpicSpinnersDefaultProps;
