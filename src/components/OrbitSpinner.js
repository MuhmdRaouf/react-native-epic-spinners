/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { getAnimatedTransformation } from '../core/StylingUtils';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function OrbitSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const spinnerWidth = containerSize * 0.05;
  const [orbitLine] = useAnimated();
  const VIEWS = useAnimatedViewsNameGenerator('orbitLine', 3);
  const animatedOrbitLine = orbitLine.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      borderRadius: containerSize * 0.5,
      transform: [{ perspective: 800 }]
    },
    orbit: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: containerSize * 0.5
    },
    orbitLine1: {
      left: 0,
      top: 0,
      borderBottomWidth: spinnerWidth,
      borderBottomColor: color
    },
    orbitLine2: {
      right: 0,
      top: 0,
      borderRightWidth: spinnerWidth,
      borderRightColor: color
    },
    orbitLine3: {
      right: 0,
      bottom: 0,
      borderTopWidth: spinnerWidth,
      borderTopColor: color
    }
  });

  const animatedStyle = {
    orbitLine1: getAnimatedTransformation({ rotateX: '35deg', rotateY: '-45deg', rotateZ: animatedOrbitLine }),
    orbitLine2: getAnimatedTransformation({ rotateX: '50deg', rotateY: '10deg', rotateZ: animatedOrbitLine }),
    orbitLine3: getAnimatedTransformation({ rotateX: '35deg', rotateY: '55deg', rotateZ: animatedOrbitLine })
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(orbitLine, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.linear
      })
    ).start();
  }, [animationDuration, orbitLine]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews
          animatedViewsArray={VIEWS}
          animatedStyle={animatedStyle}
          spinnerStyle={spinnerStyle}
          style={spinnerStyle.orbit}
        />
      </View>
    </View>
  );
}

OrbitSpinner.defaultProps = EpicSpinnersDefaultProps;
