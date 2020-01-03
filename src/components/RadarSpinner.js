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
  size: 50,
  color: 'red',
  animationDuration: 2000
};

export const RadarSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style } = props;
  const borderWidth = size * 0.2;
  const animationDelay = animationDuration * 0.15;
  const [coreCircle, biggerCircles] = useAnimated(2);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    circleContainer: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    circle: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      borderRadius: size * size,
      borderWidth: borderWidth,
      borderColor: color,
      backgroundColor: 'transparent',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    firstCircle: {
      padding: borderWidth * 2
    },
    secondCircle: {
      padding: borderWidth * 2 * 2
    },
    thirdCircle: {
      padding: borderWidth * 2 * 3
    },
    forthCircle: {
      padding: borderWidth * 2 * 4
    }
  });

  const getTransformRotation = (animated) => {
    return {
      transform: [
        {
          rotate: animated.interpolate({
            inputRange: [0, 1, 2, 3, 4],
            outputRange: ['0deg', '170deg', '180deg', '10deg', '0deg']
          })
        }
      ]
    };
  };

  const animatedStyle = {
    coreCircle: getTransformRotation(coreCircle),
    biggerCircle: getTransformRotation(biggerCircles)
  };

  useEffect(() => {
    const getAnimatedTiming = (animated) => {
      return Animated.loop(
        Animated.timing(animated, {
          toValue: 4,
          duration: animationDuration,
          easing: Easing.linear
        })
      );
    };
    Animated.stagger(animationDelay, [getAnimatedTiming(coreCircle), getAnimatedTiming(biggerCircles)]).start();
  }, [animationDelay, animationDuration, biggerCircles, coreCircle]);

  return (
    <View style={[style]} {...props}>
      <View style={spinnerStyle.container}>
        <View style={spinnerStyle.circleContainer}>
          <Animated.View style={[spinnerStyle.circle, spinnerStyle.firstCircle, animatedStyle.coreCircle]} />
          <Animated.View style={[spinnerStyle.circleContainer, animatedStyle.biggerCircle]}>
            <View style={[spinnerStyle.circle, spinnerStyle.secondCircle]} />
            <View style={[spinnerStyle.circle, spinnerStyle.thirdCircle]} />
            <View style={[spinnerStyle.circle, spinnerStyle.forthCircle]} />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

RadarSpinner.defaultProps = EpicSpinnersDefaultProps;
