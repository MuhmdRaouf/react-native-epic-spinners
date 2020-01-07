/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function RadarSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 1.5;
  const borderWidth = containerSize * 0.2;
  const animationDelay = animationDuration * 0.15;
  const [coreCircle, biggerCircles] = useAnimated(2);
  const VIEWS = useAnimatedViewsNameGenerator('outerCircle', 3);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    circleContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    circle: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      borderRadius: containerSize * containerSize,
      borderWidth: borderWidth,
      borderColor: color,
      backgroundColor: 'transparent',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    coreCircle: {
      padding: borderWidth * 2
    },
    outerCircle1: {
      padding: borderWidth * 2 * 2
    },
    outerCircle2: {
      padding: borderWidth * 2 * 3
    },
    outerCircle3: {
      padding: borderWidth * 2 * 4
    }
  });

  const getTransformRotation = (animated) => {
    return {
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 1, 2, 3, 4],
            outputRange: ['0deg', '170deg', '180deg', '10deg', '0deg']
          })
        }
      ]
    };
  };

  const animatedStyle = {
    coreCircle: getTransformRotation(coreCircle),
    biggerCircle: getTransformRotation(biggerCircles)
  };

  useEffect(() => {
    const getAnimatedTiming = (animated) => {
      return Animated.loop(
        Animated.timing(animated, {
          toValue: 4,
          duration: animationDuration,
          easing: Easing.linear
        })
      );
    };
    Animated.stagger(animationDelay, [getAnimatedTiming(coreCircle), getAnimatedTiming(biggerCircles)]).start();
  }, [animationDelay, animationDuration, biggerCircles, coreCircle]);

  return (
    <View style={[style]} {...restProps}>
      <View style={spinnerStyle.container}>
        <View style={spinnerStyle.circleContainer}>
          <Animated.View style={[spinnerStyle.circle, spinnerStyle.coreCircle, animatedStyle.coreCircle]} />
          <Animated.View style={[spinnerStyle.circleContainer, animatedStyle.biggerCircle]}>
            <GenerateAnimatedViews animatedViewsArray={VIEWS} spinnerStyle={spinnerStyle} style={spinnerStyle.circle} />
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

RadarSpinner.defaultProps = EpicSpinnersDefaultProps;
