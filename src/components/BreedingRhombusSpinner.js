/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, StyleSheet, View } from 'react-native';

import { useAnimated } from '../core/customHooks';

type EpicSpinnersProps = {
  size?: number,
  color?: string,
  animationDuration?: number,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 150,
  color: 'red',
  animationDuration: 2000
};

export const BreedingRhombusSpinner = (props: EpicSpinnersProps): Element<any> => {
  const { size, color, animationDuration, style } = props;
  const axisDirection = {
    center: 0,
    positive: size * 0.4,
    negative: size * -0.4,
    slowPositive: size * 0.5,
    slowNegative: size * -0.5
  };
  const delayModifier = animationDuration * 0.05;
  const [
    smallRhombus1,
    smallRhombus2,
    smallRhombus3,
    smallRhombus4,
    smallRhombus5,
    smallRhombus6,
    smallRhombus7,
    smallRhombus8
  ] = useAnimated(8);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'relative',
      transform: [{ rotate: '45deg' }]
    },
    rhombus: {
      height: size / 7.5,
      width: size / 7.5,
      top: size / 2.3077,
      left: size / 2.3077,
      backgroundColor: color,
      position: 'absolute'
    },
    big: {
      height: size / 3,
      width: size / 3,
      top: size / 3,
      left: size / 3,
      backgroundColor: color
    }
  });

  const animateStyle = {
    smallRhombus1: {
      transform: [
        {
          translateX: smallRhombus1.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        },
        {
          translateY: smallRhombus1.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        }
      ]
    },
    smallRhombus2: {
      transform: [
        {
          translateX: axisDirection.center
        },
        {
          translateY: smallRhombus2.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        }
      ]
    },
    smallRhombus3: {
      transform: [
        {
          translateX: smallRhombus3.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        },
        {
          translateY: smallRhombus3.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        }
      ]
    },
    smallRhombus4: {
      transform: [
        {
          translateX: smallRhombus4.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        },
        {
          translateY: axisDirection.center
        }
      ]
    },
    smallRhombus5: {
      transform: [
        {
          translateX: smallRhombus5.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        },
        {
          translateY: smallRhombus5.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        }
      ]
    },
    smallRhombus6: {
      transform: [
        {
          translateX: axisDirection.center
        },
        {
          translateY: smallRhombus6.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        }
      ]
    },
    smallRhombus7: {
      transform: [
        {
          translateX: smallRhombus7.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        },
        {
          translateY: smallRhombus7.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.positive,
              axisDirection.slowPositive,
              axisDirection.center
            ]
          })
        }
      ]
    },
    smallRhombus8: {
      transform: [
        {
          translateX: smallRhombus8.interpolate({
            inputRange: [0, 1, 1.8, 2],
            outputRange: [
              axisDirection.center,
              axisDirection.negative,
              axisDirection.slowNegative,
              axisDirection.center
            ]
          })
        },
        {
          translateY: axisDirection.center
        }
      ]
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.stagger(delayModifier, [
        Animated.timing(smallRhombus1, {
          toValue: 2,
          duration: animationDuration
        }),
        Animated.timing(smallRhombus2, {
          toValue: 2,
          duration: animationDuration
        }),
        Animated.timing(smallRhombus3, {
          toValue: 2,
          duration: animationDuration
        }),
        Animated.timing(smallRhombus4, {
          toValue: 2,
          duration: animationDuration
        }),
        Animated.timing(smallRhombus5, {
          toValue: 2,
          duration: animationDuration
        }),
        Animated.timing(smallRhombus6, {
          toValue: 2,
          duration: animationDuration
        }),
        Animated.timing(smallRhombus7, {
          toValue: 2,
          duration: animationDuration
        }),
        Animated.timing(smallRhombus8, {
          toValue: 2,
          duration: animationDuration
        })
      ])
    ).start();
  }, [
    animationDuration,
    delayModifier,
    smallRhombus1,
    smallRhombus2,
    smallRhombus3,
    smallRhombus4,
    smallRhombus5,
    smallRhombus6,
    smallRhombus7,
    smallRhombus8
  ]);

  return (
    <View style={[style, spinnerStyle.container]} {...props}>
      <Animated.View style={[spinnerStyle.rhombus, animateStyle.smallRhombus1]} />
      <Animated.View style={[spinnerStyle.rhombus, animateStyle.smallRhombus2]} />
      <Animated.View style={[spinnerStyle.rhombus, animateStyle.smallRhombus3]} />
      <Animated.View style={[spinnerStyle.rhombus, animateStyle.smallRhombus4]} />
      <Animated.View style={[spinnerStyle.rhombus, animateStyle.smallRhombus5]} />
      <Animated.View style={[spinnerStyle.rhombus, animateStyle.smallRhombus6]} />
      <Animated.View style={[spinnerStyle.rhombus, animateStyle.smallRhombus7]} />
      <Animated.View style={[spinnerStyle.rhombus, animateStyle.smallRhombus8]} />
      <View style={[spinnerStyle.rhombus, spinnerStyle.big]} />
    </View>
  );
};

BreedingRhombusSpinner.defaultProps = EpicSpinnersDefaultProps;
