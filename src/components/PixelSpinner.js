/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function PixelSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 3;
  const pixelSize = containerSize * 0.3;
  const movementDirection = { positive: 'positive', negative: 'negative' };
  const pixelAxisDirection = { center: 0, positive: containerSize * 0.5, negative: containerSize * -0.5 };
  const [pixelContainer, pixel1, pixel3, pixel5, pixel7] = useAnimated(5);
  const VIEWS = useAnimatedViewsNameGenerator('pixel', 8);
  const getTranslateAxisFromAnimatedInterpolation = (animated, axisDirection, isPositive) => {
    const direction = { [movementDirection.positive]: pixelSize + 1, [movementDirection.negative]: -(pixelSize + 1) };
    return animated.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        pixelAxisDirection.center + direction[isPositive],
        axisDirection,
        pixelAxisDirection.center + direction[isPositive]
      ]
    });
  };
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    pixelSpinnerContainer: {
      width: pixelSize,
      height: pixelSize,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center'
    },
    pixelSpinner: {
      height: '100%',
      width: '100%',
      backgroundColor: color,
      position: 'absolute'
    },
    pixel2: {
      transform: [{ translateX: pixelAxisDirection.positive }, { translateY: pixelAxisDirection.negative }]
    },
    pixel4: {
      transform: [{ translateX: pixelAxisDirection.positive }, { translateY: pixelAxisDirection.positive }]
    },
    pixel6: {
      transform: [{ translateX: pixelAxisDirection.negative }, { translateY: pixelAxisDirection.positive }]
    },
    pixel8: {
      transform: [{ translateX: pixelAxisDirection.negative }, { translateY: pixelAxisDirection.negative }]
    }
  });
  const animatedStyle = {
    pixelSpinnerContainer: {
      transform: [
        {
          rotate: pixelContainer.interpolate({
            inputRange: [0, 2],
            outputRange: ['0deg', '360deg']
          })
        }
      ]
    },
    pixel1: {
      transform: [
        { translateX: pixelAxisDirection.center },
        {
          translateY: getTranslateAxisFromAnimatedInterpolation(
            pixel1,
            pixelAxisDirection.negative,
            movementDirection.negative
          )
        }
      ]
    },
    pixel3: {
      transform: [
        {
          translateX: getTranslateAxisFromAnimatedInterpolation(
            pixel3,
            pixelAxisDirection.positive,
            movementDirection.positive
          )
        },
        { translateY: pixelAxisDirection.center }
      ]
    },
    pixel5: {
      transform: [
        { translateX: pixelAxisDirection.center },
        {
          translateY: getTranslateAxisFromAnimatedInterpolation(
            pixel5,
            pixelAxisDirection.positive,
            movementDirection.positive
          )
        }
      ]
    },
    pixel7: {
      transform: [
        {
          translateX: getTranslateAxisFromAnimatedInterpolation(
            pixel7,
            pixelAxisDirection.negative,
            movementDirection.negative
          )
        },
        { translateY: pixelAxisDirection.center }
      ]
    }
  };

  useEffect(() => {
    const parallelAnimation = (animated) => {
      return Animated.timing(animated, {
        toValue: 2,
        duration: animationDuration,
        easing: Easing.linear
      });
    };

    Animated.loop(
      Animated.parallel([
        Animated.timing(pixelContainer, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.linear
        }),

        parallelAnimation(pixel1),
        parallelAnimation(pixel3),
        parallelAnimation(pixel5),
        parallelAnimation(pixel7)
      ])
    ).start();
  }, [animationDuration, pixel1, pixel3, pixel5, pixel7, pixelContainer]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <Animated.View style={[spinnerStyle.pixelSpinnerContainer, animatedStyle.pixelSpinnerContainer]}>
          <GenerateAnimatedViews
            animatedViewsArray={VIEWS}
            animatedStyle={animatedStyle}
            spinnerStyle={spinnerStyle}
            style={spinnerStyle.pixelSpinner}
          />
        </Animated.View>
      </View>
    </View>
  );
}

PixelSpinner.defaultProps = EpicSpinnersDefaultProps;
