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
  animationDuration: 2500
};

export const FlowerSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style, ...restProps } = props;
  const dotSize = size / 7;
  const dotNumber = 8;
  const bigDotAxisDirection = {
    center: 0,
    positive: size * 0.4,
    negative: size * -0.4,
    positiveCorner: size * 0.3,
    negativeCorner: size * -0.3
  };
  const smallDotAxisDirection = {
    center: 0,
    positive: size * 0.2,
    negative: size * -0.2,
    positiveCorner: size * 0.15,
    negativeCorner: size * -0.15
  };
  const [dotsContainer] = useAnimated();
  const [bigDot1, bigDot2, bigDot3, bigDot4, bigDot5, bigDot6, bigDot7, bigDot8] = useAnimated(dotNumber);
  const [smallDot1, smallDot2, smallDot3, smallDot4, smallDot5, smallDot6, smallDot7, smallDot8] = useAnimated(
    dotNumber
  );
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    dotsContainer: {
      height: dotSize,
      width: dotSize,
      backgroundColor: color,
      borderRadius: size * 0.5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    biggerDot: {
      backgroundColor: color,
      borderRadius: size * 0.5,
      height: '100%',
      width: '100%',
      padding: '10%',
      position: 'absolute'
    },
    smallerDot: {
      backgroundColor: color,
      height: '80%',
      width: '80%',
      borderRadius: size * 0.5,
      position: 'absolute'
    }
  });

  const getTranslateAxisFromAnimatedInterpolation = (animated, axisDirection) => {
    return animated.interpolate({
      inputRange: [0, 0.5, 1.5, 2],
      outputRange: [bigDotAxisDirection.center, axisDirection, axisDirection, bigDotAxisDirection.center]
    });
  };

  const animateStyle = {
    dotsContainer: {
      transform: [
        {
          rotate: dotsContainer.interpolate({
            inputRange: [0, 0.7, 0.9, 1, 1.7, 1.9, 2],
            outputRange: ['0deg', '150deg', '170deg', '170deg', '320deg', '340deg', '360deg']
          })
        }
      ]
    },
    bigDot1: {
      transform: [
        { translateX: bigDotAxisDirection.center },
        { translateY: getTranslateAxisFromAnimatedInterpolation(bigDot1, bigDotAxisDirection.negative) }
      ]
    },
    bigDot2: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(bigDot2, bigDotAxisDirection.positiveCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(bigDot2, bigDotAxisDirection.negativeCorner) }
      ]
    },
    bigDot3: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(bigDot3, bigDotAxisDirection.positive) },
        { translateY: bigDotAxisDirection.center }
      ]
    },
    bigDot4: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(bigDot4, bigDotAxisDirection.positiveCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(bigDot4, bigDotAxisDirection.positiveCorner) }
      ]
    },
    bigDot5: {
      transform: [
        { translateX: bigDotAxisDirection.center },
        { translateY: getTranslateAxisFromAnimatedInterpolation(bigDot5, bigDotAxisDirection.positive) }
      ]
    },
    bigDot6: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(bigDot6, bigDotAxisDirection.negativeCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(bigDot6, bigDotAxisDirection.positiveCorner) }
      ]
    },
    bigDot7: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(bigDot7, bigDotAxisDirection.negative) },
        { translateY: bigDotAxisDirection.center }
      ]
    },
    bigDot8: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(bigDot8, bigDotAxisDirection.negativeCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(bigDot8, bigDotAxisDirection.negativeCorner) }
      ]
    },

    smallDot1: {
      transform: [
        { translateX: smallDotAxisDirection.center },
        { translateY: getTranslateAxisFromAnimatedInterpolation(smallDot1, smallDotAxisDirection.negative) }
      ]
    },
    smallDot2: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(smallDot2, smallDotAxisDirection.positiveCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(smallDot2, smallDotAxisDirection.negativeCorner) }
      ]
    },
    smallDot3: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(smallDot3, smallDotAxisDirection.positive) },
        { translateY: smallDotAxisDirection.center }
      ]
    },
    smallDot4: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(smallDot4, smallDotAxisDirection.positiveCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(smallDot4, smallDotAxisDirection.positiveCorner) }
      ]
    },
    smallDot5: {
      transform: [
        { translateX: smallDotAxisDirection.center },
        { translateY: getTranslateAxisFromAnimatedInterpolation(smallDot5, smallDotAxisDirection.positive) }
      ]
    },
    smallDot6: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(smallDot6, smallDotAxisDirection.negativeCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(smallDot6, smallDotAxisDirection.positiveCorner) }
      ]
    },
    smallDot7: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(smallDot7, smallDotAxisDirection.negative) },
        { translateY: smallDotAxisDirection.center }
      ]
    },
    smallDot8: {
      transform: [
        { translateX: getTranslateAxisFromAnimatedInterpolation(smallDot8, smallDotAxisDirection.negativeCorner) },
        { translateY: getTranslateAxisFromAnimatedInterpolation(smallDot8, smallDotAxisDirection.negativeCorner) }
      ]
    }
  };

  useEffect(() => {
    const parallelAnimation = (animated) => {
      return Animated.timing(animated, {
        toValue: 2,
        duration: animationDuration
      });
    };

    Animated.loop(
      Animated.parallel([
        Animated.timing(dotsContainer, {
          toValue: 2.1,
          duration: animationDuration,
          easing: Easing.linear
        }),

        parallelAnimation(bigDot1),
        parallelAnimation(bigDot2),
        parallelAnimation(bigDot3),
        parallelAnimation(bigDot4),
        parallelAnimation(bigDot5),
        parallelAnimation(bigDot6),
        parallelAnimation(bigDot7),
        parallelAnimation(bigDot8),

        parallelAnimation(smallDot1),
        parallelAnimation(smallDot2),
        parallelAnimation(smallDot3),
        parallelAnimation(smallDot4),
        parallelAnimation(smallDot5),
        parallelAnimation(smallDot6),
        parallelAnimation(smallDot7),
        parallelAnimation(smallDot8)
      ])
    ).start();
  }, [
    animationDuration,
    bigDot1,
    bigDot2,
    bigDot3,
    bigDot4,
    bigDot5,
    bigDot6,
    bigDot7,
    bigDot8,
    dotsContainer,
    smallDot1,
    smallDot2,
    smallDot3,
    smallDot4,
    smallDot5,
    smallDot6,
    smallDot7,
    smallDot8
  ]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <Animated.View style={[spinnerStyle.dotsContainer, animateStyle.dotsContainer]}>
          <Animated.View style={[spinnerStyle.biggerDot, animateStyle.bigDot1]} />
          <Animated.View style={[spinnerStyle.biggerDot, animateStyle.bigDot2]} />
          <Animated.View style={[spinnerStyle.biggerDot, animateStyle.bigDot3]} />
          <Animated.View style={[spinnerStyle.biggerDot, animateStyle.bigDot4]} />
          <Animated.View style={[spinnerStyle.biggerDot, animateStyle.bigDot5]} />
          <Animated.View style={[spinnerStyle.biggerDot, animateStyle.bigDot6]} />
          <Animated.View style={[spinnerStyle.biggerDot, animateStyle.bigDot7]} />
          <Animated.View style={[spinnerStyle.biggerDot, animateStyle.bigDot8]} />

          <Animated.View style={[spinnerStyle.smallerDot, animateStyle.smallDot1]} />
          <Animated.View style={[spinnerStyle.smallerDot, animateStyle.smallDot2]} />
          <Animated.View style={[spinnerStyle.smallerDot, animateStyle.smallDot3]} />
          <Animated.View style={[spinnerStyle.smallerDot, animateStyle.smallDot4]} />
          <Animated.View style={[spinnerStyle.smallerDot, animateStyle.smallDot5]} />
          <Animated.View style={[spinnerStyle.smallerDot, animateStyle.smallDot6]} />
          <Animated.View style={[spinnerStyle.smallerDot, animateStyle.smallDot7]} />
          <Animated.View style={[spinnerStyle.smallerDot, animateStyle.smallDot8]} />
        </Animated.View>
      </View>
    </View>
  );
};

FlowerSpinner.defaultProps = EpicSpinnersDefaultProps;
