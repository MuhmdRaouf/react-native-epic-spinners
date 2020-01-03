/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import type AnimatedInterpolation from 'react-native/Libraries/Animated/src/nodes/AnimatedInterpolation';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { useAnimated } from '../core/customHooks';

type EpicProps = {
  size?: number,
  animationDuration?: number,
  color?: string,
  style?: ViewStyleProp
};
type TransformationTypeProp = {
  rotateX: string | AnimatedInterpolation,
  rotateY: string | AnimatedInterpolation,
  rotateZ: string | AnimatedInterpolation
};
const EpicSpinnersDefaultProps = {
  size: 250,
  color: 'red',
  animationDuration: 1000
};

export const OrbitSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style } = props;
  const spinnerWidth = size * 0.05;
  const [orbitLine] = useAnimated();
  const animatedOrbitLine = orbitLine.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const getAnimatedTransformation = ({ rotateX, rotateY, rotateZ }: TransformationTypeProp) => {
    return { transform: [{ rotateX }, { rotateY }, { rotateZ }] };
  };
  const getOrbitView = () => {
    return ['firstOrbitLine', 'secondOrbitLine', 'thirdOrbitLine'].map((styleClassName, index) => {
      return (
        <Animated.View
          key={index}
          style={[spinnerStyle.orbit, spinnerStyle[styleClassName], animateStyle[styleClassName]]}
        />
      );
    });
  };

  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      borderRadius: size * 0.5,
      transform: [{ perspective: 800 }]
    },
    orbit: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: size * 0.5
    },
    firstOrbitLine: {
      left: 0,
      top: 0,
      borderBottomWidth: spinnerWidth,
      borderBottomColor: color
    },
    secondOrbitLine: {
      right: 0,
      top: 0,
      borderRightWidth: spinnerWidth,
      borderRightColor: color
    },
    thirdOrbitLine: {
      right: 0,
      bottom: 0,
      borderTopWidth: spinnerWidth,
      borderTopColor: color
    }
  });

  const animateStyle = {
    firstOrbitLine: getAnimatedTransformation({ rotateX: '35deg', rotateY: '-45deg', rotateZ: animatedOrbitLine }),
    secondOrbitLine: getAnimatedTransformation({ rotateX: '50deg', rotateY: '10deg', rotateZ: animatedOrbitLine }),
    thirdOrbitLine: getAnimatedTransformation({ rotateX: '35deg', rotateY: '55deg', rotateZ: animatedOrbitLine })
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
    <View style={style} {...props}>
      <View style={spinnerStyle.container}>{getOrbitView()}</View>
    </View>
  );
};

OrbitSpinner.defaultProps = EpicSpinnersDefaultProps;
