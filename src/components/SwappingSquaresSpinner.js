/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { useAnimated } from '../core/customHooks';

type EpicProps = {
  size?: number,
  animationDuration?: number,
  color?: string,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 65,
  color: 'red',
  animationDuration: 1000
};

export const SwappingSquaresSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style, ...restProps } = props;
  const [rightAnimation, leftAnimation] = useAnimated(2);
  const axisDirection = {
    center: 0,
    positive: size * 0.65,
    negative: size * -0.65,
    slowPositive: size * 0.7,
    slowNegative: size * -0.7
  };
  const generateSpinners = () => {
    return ['square1', 'square2', 'square3', 'square4'].map((val, index) => (
      <Animated.View key={index} style={[spinnerStyle.square, animatedStyle[val]]} />
    ));
  };

  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center'
    },
    square: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      borderColor: color,
      borderWidth: size * 0.2
    }
  });

  const animatedStyle = {
    square1: {
      transform: [
        {
          translateX: rightAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        },
        {
          translateY: rightAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        },
        {
          scale: rightAnimation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0.5, 1, 1, 0.5]
          })
        }
      ]
    },
    square2: {
      transform: [
        {
          translateX: rightAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        },
        {
          translateY: rightAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        },
        {
          scale: rightAnimation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0.5, 1, 1, 0.5]
          })
        }
      ]
    },
    square3: {
      transform: [
        {
          translateX: leftAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        },
        {
          translateY: leftAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        },
        {
          scale: leftAnimation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0.5, 1, 1, 0.5]
          })
        }
      ]
    },
    square4: {
      transform: [
        {
          translateX: leftAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        },
        {
          translateY: leftAnimation.interpolate({
            inputRange: [0, 0.8, 1, 2, 3],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        },
        {
          scale: leftAnimation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0.5, 1, 1, 0.5]
          })
        }
      ]
    }
  };

  useEffect(() => {
    Animated.stagger(animationDuration * 0.5, [
      Animated.loop(
        Animated.timing(rightAnimation, {
          toValue: 3,
          duration: animationDuration,
        })
      ),
      Animated.loop(
        Animated.timing(leftAnimation, {
          toValue: 3,
          duration: animationDuration,
        })
      )
    ]).start();
  }, [rightAnimation, animationDuration, leftAnimation]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>{generateSpinners(4)}</View>
    </View>
  );
};

SwappingSquaresSpinner.defaultProps = EpicSpinnersDefaultProps;
