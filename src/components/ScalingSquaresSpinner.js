/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function ScalingSquaresSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 3;
  const axisDirection = { center: 0, positive: containerSize * 0.15, negative: containerSize * -0.15 };
  const [container, firstSquare, secondSquare, thirdSquare, forthSquare] = useAnimated(5);
  const VIEWS = useAnimatedViewsNameGenerator('square', 4);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    square: {
      height: (containerSize * 0.25) / 1.3,
      width: (containerSize * 0.25) / 1.3,
      borderWidth: (containerSize * 0.04) / 1.3,
      borderColor: color,
      position: 'absolute',
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  });

  const getTransformRotation = (animated) => {
    return {
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 1, 1.2, 2.2, 2.4],
            outputRange: ['0deg', '90deg', '90deg', '180deg', '180deg']
          })
        }
      ]
    };
  };
  const getSquareTransformation = (animated, translateX, translateY) => {
    return {
      transform: [
        {
          scale: animated.interpolate({
            inputRange: [0, 1, 1.2, 2.2, 2.4],
            outputRange: [1, 2, 2, 1, 1]
          })
        },
        {
          translateX: animated.interpolate({
            inputRange: [0, 1, 1.2, 2.2, 2.4],
            outputRange: [axisDirection.center, translateX, translateX, axisDirection.center, axisDirection.center]
          })
        },
        {
          translateY: animated.interpolate({
            inputRange: [0, 1, 1.2, 2.2, 2.4],
            outputRange: [axisDirection.center, translateY, translateY, axisDirection.center, axisDirection.center]
          })
        }
      ]
    };
  };

  const animatedStyle = {
    container: getTransformRotation(container),
    square1: getSquareTransformation(firstSquare, axisDirection.positive, axisDirection.positive),
    square2: getSquareTransformation(secondSquare, axisDirection.positive, axisDirection.negative),
    square3: getSquareTransformation(thirdSquare, axisDirection.negative, axisDirection.positive),
    square4: getSquareTransformation(forthSquare, axisDirection.negative, axisDirection.negative)
  };

  useEffect(() => {
    const parallelAnimation = (animated) => {
      return Animated.timing(animated, {
        toValue: 2.4,
        duration: animationDuration,
        easing: Easing.linear
      });
    };
    Animated.loop(
      Animated.parallel([
        parallelAnimation(container),
        parallelAnimation(firstSquare),
        parallelAnimation(secondSquare),
        parallelAnimation(thirdSquare),
        parallelAnimation(forthSquare)
      ])
    ).start();
  }, [animationDuration, container, firstSquare, forthSquare, secondSquare, thirdSquare]);

  return (
    <View style={style} {...restProps}>
      <Animated.View style={[spinnerStyle.container, animatedStyle.container]}>
        <GenerateAnimatedViews animatedViewsArray={VIEWS} animatedStyle={animatedStyle} style={spinnerStyle.square} />
      </Animated.View>
    </View>
  );
}

ScalingSquaresSpinner.defaultProps = EpicSpinnersDefaultProps;
