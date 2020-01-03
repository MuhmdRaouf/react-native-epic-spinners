/** @flow **/
import type { Element } from 'react';
import React, { useEffect, useState } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, Easing, StyleSheet, View } from 'react-native';

type EpicSpinnersProps = {
  size?: number,
  color?: string,
  animationDuration?: number,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 30,
  color: 'red',
  animationDuration: 2500
};

export const LoopingRhombusesSpinner = (props: EpicSpinnersProps): Element<any> => {
  const { size, color, animationDuration, style } = props;
  const [firstRhombuses] = useState(new Animated.Value(0));
  const [secondRhombuses] = useState(new Animated.Value(0));
  const [thirdRhombuses] = useState(new Animated.Value(0));
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'relative'
    },
    rhombus: {
      height: size,
      width: size,
      backgroundColor: color,
      position: 'absolute',
      left: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size * 0.2
    }
  });

  const getAnimatedStyle = (animated) => {
    return [
      {
        translateX: animated.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, -50, -100]
        })
      },
      {
        scale: animated.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 0]
        })
      },
      {
        rotate: '45deg'
      }
    ];
  };
  const animateStyle = {
    firstRhombuses: {
      transform: getAnimatedStyle(firstRhombuses)
    },
    secondRhombuses: {
      transform: getAnimatedStyle(secondRhombuses)
    },
    thirdRhombuses: {
      transform: getAnimatedStyle(thirdRhombuses)
    }
  };

  useEffect(() => {
    Animated.stagger(animationDuration * 0.3, [
      Animated.loop(
        Animated.timing(firstRhombuses, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.linear
        })
      ),
      Animated.loop(
        Animated.timing(secondRhombuses, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.linear
        })
      ),
      Animated.loop(
        Animated.timing(thirdRhombuses, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.linear
        })
      )
    ]).start();
  }, [animationDuration, firstRhombuses, secondRhombuses, thirdRhombuses]);

  return (
    <View style={style} {...props}>
      <View style={spinnerStyle.container}>
        <Animated.View style={[spinnerStyle.rhombus, animateStyle.firstRhombuses]} />
        <Animated.View style={[spinnerStyle.rhombus, animateStyle.secondRhombuses]} />
        <Animated.View style={[spinnerStyle.rhombus, animateStyle.thirdRhombuses]} />
      </View>
    </View>
  );
};

LoopingRhombusesSpinner.defaultProps = EpicSpinnersDefaultProps;
