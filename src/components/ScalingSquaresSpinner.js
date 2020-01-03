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
  animationDuration: 1250
};

export const ScalingSquaresSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style } = props;
  const [container, firstSquare, secondSquare, thirdSquare, forthSquare] = useAnimated(5);
  const axisDirection = { center: 0, positive: size * 0.15, negative: size * -0.15 };
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    square: {
      height: (size * 0.25) / 1.3,
      width: (size * 0.25) / 1.3,
      borderWidth: (size * 0.04) / 1.3,
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
    firstSquare: getSquareTransformation(firstSquare, axisDirection.positive, axisDirection.positive),
    secondSquare: getSquareTransformation(secondSquare, axisDirection.positive, axisDirection.negative),
    thirdSquare: getSquareTransformation(thirdSquare, axisDirection.negative, axisDirection.positive),
    forthSquare: getSquareTransformation(forthSquare, axisDirection.negative, axisDirection.negative)
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
    <View style={style} {...props}>
      <Animated.View style={[spinnerStyle.container, animatedStyle.container]}>
        <Animated.View style={[spinnerStyle.square, animatedStyle.firstSquare]} />
        <Animated.View style={[spinnerStyle.square, animatedStyle.secondSquare]} />
        <Animated.View style={[spinnerStyle.square, animatedStyle.thirdSquare]} />
        <Animated.View style={[spinnerStyle.square, animatedStyle.forthSquare]} />
      </Animated.View>
    </View>
  );
};

ScalingSquaresSpinner.defaultProps = EpicSpinnersDefaultProps;
