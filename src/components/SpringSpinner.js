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
  animationDuration: 3000
};

export const SpringSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style, ...restProps } = props;
  const [rotator] = useAnimated();
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size
    },
    springSpinnerPart: {
      overflow: 'hidden',
      height: size / 2,
      width: size
    },
    bottom: {
      transform: [{ rotate: '180deg' }, { scaleX: -1 }, { scaleY: 1 }]
    },
    springSpinnerRotator: {
      width: size,
      height: size,
      borderColor: 'transparent',
      borderRightColor: color,
      borderTopColor: color,
      borderRadius: size
    }
  });

  const getAnimatedTransformation = (animated) => {
    const start = size / 7;
    const end = size / 23.33;
    return {
      borderWidth: animated.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: [start, end, start, end, start]
      }),
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 1.8, 2, 3.8, 4],
            outputRange: ['-200deg', '100deg', '115deg', '-185deg', '-200deg']
          })
        }
      ]
    };
  };

  const animatedStyle = {
    rotator: getAnimatedTransformation(rotator)
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotator, {
        toValue: 4,
        duration: animationDuration,
        easing: Easing.linear
      })
    ).start();
  }, [animationDuration, rotator]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <View style={spinnerStyle.springSpinnerPart}>
          <Animated.View style={[spinnerStyle.springSpinnerRotator, animatedStyle.rotator]} />
        </View>
        <View style={[spinnerStyle.springSpinnerPart, spinnerStyle.bottom]}>
          <Animated.View style={[spinnerStyle.springSpinnerRotator, animatedStyle.rotator]} />
        </View>
      </View>
    </View>
  );
};

SpringSpinner.defaultProps = EpicSpinnersDefaultProps;
