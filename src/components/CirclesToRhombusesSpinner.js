/** @flow **/
import type { Element } from 'react';
import React, { useEffect, useState } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useAnimated } from '../core/customHooks';

type EpicSpinnersProps = {
  size?: number,
  color?: string,
  animationDuration?: number,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 15,
  color: 'red',
  animationDuration: 1200
};

export const CirclesToRhombusesSpinner = (props: EpicSpinnersProps): Element<any> => {
  const { size, color, animationDuration, style } = props;
  const [leftCircle, middleCircle, rightCircle] = useAnimated(3);
  const circleMarginLeft = size * 0.5;
  const squareBorderRadius = size * 0.1;
  const circleBorderRadius = size * 0.5;
  const animationDelay = animationDuration * 0.17;
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    circle: {
      height: size,
      width: size,
      marginHorizontal: circleMarginLeft,
      transform: [{ rotate: '45deg' }],
      borderRadius: size * 0.1,
      borderWidth: size * 0.2,
      borderColor: color,
      overflow: 'hidden'
      // animation: circles-to-rhombuses-animation ${(props) => props.animationDuration}ms linear infinite;
    }
  });
  const animateStyle = {
    leftCircle: {
      borderRadius: leftCircle.interpolate({
        inputRange: [0, 1.7, 9.35, 10],
        outputRange: [squareBorderRadius, circleBorderRadius, circleBorderRadius, squareBorderRadius]
      })
    },
    middleCircle: {
      borderRadius: middleCircle.interpolate({
        inputRange: [0, 1.7, 9.35, 10],
        outputRange: [squareBorderRadius, circleBorderRadius, circleBorderRadius, squareBorderRadius]
      })
    },
    rightCircle: {
      borderRadius: rightCircle.interpolate({
        inputRange: [0, 1.7, 9.35, 10],
        outputRange: [squareBorderRadius, circleBorderRadius, circleBorderRadius, squareBorderRadius]
      })
    }
  };

  useEffect(() => {
    Animated.stagger(animationDelay, [
      Animated.loop(
        Animated.timing(leftCircle, {
          toValue: 10,
          duration: animationDuration,
          easing: Easing.linear(),
          useNativeDriver: true
        })
      ),
      Animated.loop(
        Animated.timing(middleCircle, {
          toValue: 10,
          duration: animationDuration,
          easing: Easing.linear(),
          useNativeDriver: true
        })
      ),
      Animated.loop(
        Animated.timing(rightCircle, {
          toValue: 10,
          duration: animationDuration,
          easing: Easing.linear(),
          useNativeDriver: true
        })
      )
    ]).start();
  }, [animationDelay, animationDuration, leftCircle, middleCircle, rightCircle]);

  return (
    <View style={[style, spinnerStyle.container]} {...props}>
      <Animated.View style={[spinnerStyle.circle, animateStyle.leftCircle]} />
      <Animated.View style={[spinnerStyle.circle, animateStyle.middleCircle]} />
      <Animated.View style={[spinnerStyle.circle, animateStyle.rightCircle]} />
    </View>
  );
};
CirclesToRhombusesSpinner.defaultProps = EpicSpinnersDefaultProps;
