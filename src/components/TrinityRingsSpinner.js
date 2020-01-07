/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import type AnimatedInterpolation from 'react-native/Libraries/Animated/src/nodes/AnimatedInterpolation';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

type TransformationTypeProp = {
  rotateX?: string | AnimatedInterpolation,
  rotateY?: string | AnimatedInterpolation,
  rotateZ?: string | AnimatedInterpolation
};

export function TrinityRingsSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const containerPadding = 3;
  const VIEWS = useAnimatedViewsNameGenerator('circle', 5);
  const outerSize = containerSize - containerPadding;
  const [anim] = useAnimated();
  const getAnimatedTransformation = ({
    rotateX = '0deg',
    rotateY = '0deg',
    rotateZ = '0deg'
  }: TransformationTypeProp) => {
    return { transform: [{ rotateX }, { rotateY }, { rotateZ }] };
  };

  const circle1RotateX = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const circle1RotateY = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const circle1RotateZ = anim.interpolate({ inputRange: [0, 1], outputRange: ['20deg', '100deg'] });

  const circle2RotateX = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const circle2RotateY = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const circle2RotateZ = anim.interpolate({ inputRange: [0, 1], outputRange: ['100deg', '0deg'] });

  const circle3RotateX = anim.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '-360deg'] });
  const circle3RotateY = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-180deg'] });
  const circle3RotateZ = anim.interpolate({ inputRange: [0, 1], outputRange: ['100deg', '-360deg'] });

  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      padding: 3,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    circle: {
      position: 'absolute',
      borderRadius: containerSize,
      borderColor: color
    },
    circle1: {
      height: outerSize,
      width: outerSize,
      borderWidth: 9
    },
    circle2: {
      height: outerSize * 0.65,
      width: outerSize * 0.65,
      borderWidth: 6
    },
    circle3: {
      height: outerSize * 0.1,
      width: outerSize * 0.1,
      borderWidth: 3
    }
  });
  const animatedStyle = {
    circle1: getAnimatedTransformation({ rotateX: circle1RotateX, rotateY: circle1RotateY, rotateZ: circle1RotateZ }),
    circle2: getAnimatedTransformation({ rotateX: circle2RotateX, rotateY: circle2RotateY, rotateZ: circle2RotateZ }),
    circle3: getAnimatedTransformation({ rotateX: circle3RotateX, rotateY: circle3RotateY, rotateZ: circle3RotateZ })
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.linear
      })
    ).start();
  }, [animationDuration, anim]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews
          animatedViewsArray={VIEWS}
          spinnerStyle={spinnerStyle}
          animatedStyle={animatedStyle}
          style={spinnerStyle.circle}
        />
      </View>
    </View>
  );
}

TrinityRingsSpinner.defaultProps = EpicSpinnersDefaultProps;
