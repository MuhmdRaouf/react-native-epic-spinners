/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import type AnimatedInterpolation from 'react-native/Libraries/Animated/src/nodes/AnimatedInterpolation';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

type TransformationProps = {
  rotateX: string | AnimatedInterpolation,
  rotateZ: string | AnimatedInterpolation,
  secondRotateZ: string | AnimatedInterpolation
};

type TransformationReturn = { transform: Array<Object> };

export function AtomSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const [animatedSpinnerLine] = useAnimated();
  const VIEWS = useAnimatedViewsNameGenerator('spinnerLine', 3);
  const spinnerLineRotateZ = animatedSpinnerLine.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const getAnimatedTransformation = ({
    rotateX = '0deg',
    rotateZ = '0deg',
    secondRotateZ = '0deg'
  }: TransformationProps): TransformationReturn => {
    return { transform: [{ rotateZ: secondRotateZ }, { rotateX }, { rotateZ }] };
  };
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      overflow: 'hidden'
    },
    spinnerInner: {
      position: 'relative',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    spinnerCircle: {
      height: containerSize * 0.18,
      width: containerSize * 0.18,
      backgroundColor: color,
      borderRadius: containerSize * 0.5
    },
    spinnerLine: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: containerSize * 0.5,
      borderLeftWidth: containerSize / 25,
      borderTopWidth: containerSize / 25,
      borderLeftColor: color,
      borderTopColor: 'transparent'
    }
  });
  const animatedStyle = {
    spinnerLine1: getAnimatedTransformation({
      secondRotateZ: '120deg',
      rotateX: '66deg',
      rotateZ: spinnerLineRotateZ
    }),
    spinnerLine2: getAnimatedTransformation({
      secondRotateZ: '240deg',
      rotateX: '66deg',
      rotateZ: spinnerLineRotateZ
    }),
    spinnerLine3: getAnimatedTransformation({
      secondRotateZ: '360deg',
      rotateX: '66deg',
      rotateZ: spinnerLineRotateZ
    })
  };

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animatedSpinnerLine, {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear
        })
      ])
    ).start();
  }, [animationDuration, animatedSpinnerLine]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <View style={[spinnerStyle.spinnerInner]}>
          <GenerateAnimatedViews
            animatedViewsArray={VIEWS}
            animatedStyle={animatedStyle}
            style={spinnerStyle.spinnerLine}
          />
          <View style={[spinnerStyle.spinnerCircle]} />
        </View>
      </View>
    </View>
  );
}

AtomSpinner.defaultProps = EpicSpinnersDefaultProps;
