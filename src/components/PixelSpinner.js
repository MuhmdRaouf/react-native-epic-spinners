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
  size: 70,
  color: 'red',
  animationDuration: 1500
};

export const PixelSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style } = props;
  const pixelSize = size * 0.3;
  const movementDirection = { positive: 'positive', negative: 'negative' };
  const pixelAxisDirection = { center: 0, positive: size * 0.5, negative: size * -0.5 };
  const [pixelContainer, pixel1, pixel3, pixel5, pixel7] = useAnimated(5);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
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
    pixelSpinner2: {
      transform: [{ translateX: pixelAxisDirection.positive }, { translateY: pixelAxisDirection.negative }]
    },
    pixelSpinner4: {
      transform: [{ translateX: pixelAxisDirection.positive }, { translateY: pixelAxisDirection.positive }]
    },
    pixelSpinner6: {
      transform: [{ translateX: pixelAxisDirection.negative }, { translateY: pixelAxisDirection.positive }]
    },
    pixelSpinner8: {
      transform: [{ translateX: pixelAxisDirection.negative }, { translateY: pixelAxisDirection.negative }]
    }
  });

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

  const animateStyle = {
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
    pixelSpinner1: {
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
    pixelSpinner3: {
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
    pixelSpinner5: {
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
    pixelSpinner7: {
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
    <View style={style} {...props}>
      <View style={spinnerStyle.container}>
        <Animated.View style={[spinnerStyle.pixelSpinnerContainer, animateStyle.pixelSpinnerContainer]}>
          <Animated.View style={[spinnerStyle.pixelSpinner, animateStyle.pixelSpinner1]} />
          <View style={[spinnerStyle.pixelSpinner, spinnerStyle.pixelSpinner2]} />
          <Animated.View style={[spinnerStyle.pixelSpinner, animateStyle.pixelSpinner3]} />
          <View style={[spinnerStyle.pixelSpinner, spinnerStyle.pixelSpinner4]} />
          <Animated.View style={[spinnerStyle.pixelSpinner, animateStyle.pixelSpinner5]} />
          <View style={[spinnerStyle.pixelSpinner, spinnerStyle.pixelSpinner6]} />
          <Animated.View style={[spinnerStyle.pixelSpinner, animateStyle.pixelSpinner7]} />
          <View style={[spinnerStyle.pixelSpinner, spinnerStyle.pixelSpinner8]} />
        </Animated.View>
      </View>
    </View>
  );
};

PixelSpinner.defaultProps = EpicSpinnersDefaultProps;
