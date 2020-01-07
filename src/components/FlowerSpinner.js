/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function FlowerSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const dotSize = containerSize / 7;
  const bigDotAxisDirection = {
    center: 0,
    positive: containerSize * 0.4,
    negative: containerSize * -0.4,
    positiveCorner: containerSize * 0.3,
    negativeCorner: containerSize * -0.3
  };
  const smallDotAxisDirection = {
    center: 0,
    positive: containerSize * 0.2,
    negative: containerSize * -0.2,
    positiveCorner: containerSize * 0.15,
    negativeCorner: containerSize * -0.15
  };
  const [animated] = useAnimated();
  const BIG_DOT_VIEWS = useAnimatedViewsNameGenerator('bigDot', 8);
  const SMALL_DOT_VIEWS = useAnimatedViewsNameGenerator('smallDot', 8);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    dotsContainer: {
      height: dotSize,
      width: dotSize,
      backgroundColor: color,
      borderRadius: containerSize * 0.5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    biggerDot: {
      backgroundColor: color,
      borderRadius: containerSize * 0.5,
      height: '100%',
      width: '100%',
      padding: '10%',
      position: 'absolute'
    },
    smallerDot: {
      backgroundColor: color,
      height: '70%',
      width: '70%',
      borderRadius: containerSize * 0.5,
      position: 'absolute'
    }
  });
  const getTranslateAxisFromAnimatedInterpolation = (animatedObject, axisDirection) => {
    return animatedObject.interpolate({
      inputRange: [0, 0.5, 1.5, 2],
      outputRange: [bigDotAxisDirection.center, axisDirection, axisDirection, bigDotAxisDirection.center]
    });
  };
  const animatedStyle = {
    dotsContainer: {
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 0.7, 0.9, 1, 1.7, 1.9, 2],
            outputRange: ['0deg', '150deg', '170deg', '170deg', '320deg', '340deg', '360deg']
          })
        }
      ]
    },
    bigDot1: {
      transform: [
        { translateX: bigDotAxisDirection.center },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.negative) }
      ]
    },
    bigDot2: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.positiveCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.negativeCorner) }
      ]
    },
    bigDot3: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.positive) },
        { translateY: bigDotAxisDirection.center }
      ]
    },
    bigDot4: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.positiveCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.positiveCorner) }
      ]
    },
    bigDot5: {
      transform: [
        { translateX: bigDotAxisDirection.center },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.positive) }
      ]
    },
    bigDot6: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.negativeCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.positiveCorner) }
      ]
    },
    bigDot7: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.negative) },
        { translateY: bigDotAxisDirection.center }
      ]
    },
    bigDot8: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.negativeCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, bigDotAxisDirection.negativeCorner) }
      ]
    },

    smallDot1: {
      transform: [
        { translateX: smallDotAxisDirection.center },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.negative) }
      ]
    },
    smallDot2: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.positiveCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.negativeCorner) }
      ]
    },
    smallDot3: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.positive) },
        { translateY: smallDotAxisDirection.center }
      ]
    },
    smallDot4: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.positiveCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.positiveCorner) }
      ]
    },
    smallDot5: {
      transform: [
        { translateX: smallDotAxisDirection.center },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.positive) }
      ]
    },
    smallDot6: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.negativeCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.positiveCorner) }
      ]
    },
    smallDot7: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.negative) },
        { translateY: smallDotAxisDirection.center }
      ]
    },
    smallDot8: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.negativeCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(animated, smallDotAxisDirection.negativeCorner) }
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
  }, [animationDuration, animated]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <Animated.View style={[spinnerStyle.dotsContainer, animatedStyle.dotsContainer]}>
          <GenerateAnimatedViews
            animatedViewsArray={BIG_DOT_VIEWS}
            animatedStyle={animatedStyle}
            style={spinnerStyle.biggerDot}
          />
          <GenerateAnimatedViews
            animatedViewsArray={SMALL_DOT_VIEWS}
            animatedStyle={animatedStyle}
            style={spinnerStyle.smallerDot}
          />
        </Animated.View>
      </View>
    </View>
  );
}

FlowerSpinner.defaultProps = EpicSpinnersDefaultProps;
