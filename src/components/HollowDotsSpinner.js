/** @flow **/
import type { Element } from 'react';
import React, { useEffect, useState } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, Easing, StyleSheet, View } from 'react-native';

type EpicSpinnersProps = {
  size?: number,
  animationDuration?: number,
  color?: string,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 15,
  color: 'red',
  animationDuration: 1000
};

export const HollowDotsSpinner = (props: EpicSpinnersProps): Element<any> => {
  const { size, color, animationDuration, style } = props;
  const dotsNum = 3;
  const animationDelay = animationDuration * 0.3;
  const [leftCircle] = useState(new Animated.Value(0));
  const [middleCircle] = useState(new Animated.Value(0));
  const [rightCircle] = useState(new Animated.Value(0));
  const spinnerStyle = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: size,
      width: 2 * size * dotsNum
    },
    dot: {
      width: size,
      height: size,
      borderColor: color,
      borderRadius: size * 0.5,
      borderWidth: size * 0.2,
      marginRight: size / 0.5,
      transform: [{ scale: 0 }]
    }
  });
  const animateStyle = {
    leftCircle: {
      transform: [
        {
          scale: leftCircle.interpolate({
            inputRange: [0, 1, 1.1, 2],
            outputRange: [0, 2, 2, 0]
          })
        }
      ],
      opacity: leftCircle.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 1, 0]
      })
    },
    middleCircle: {
      transform: [
        {
          scale: middleCircle.interpolate({
            inputRange: [0, 1, 1.1, 2],
            outputRange: [0, 2, 2, 0]
          })
        }
      ],
      opacity: middleCircle.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 1, 0]
      })
    },
    rightCircle: {
      transform: [
        {
          scale: rightCircle.interpolate({
            inputRange: [0, 1, 1.1, 2],
            outputRange: [0, 2, 2, 0]
          })
        }
      ],
      opacity: rightCircle.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [1, 1, 0]
      })
    }
  };

  useEffect(() => {
    Animated.stagger(animationDelay, [
      Animated.loop(
        Animated.timing(leftCircle, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease)
        })
      ),
      Animated.loop(
        Animated.timing(middleCircle, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease)
        })
      ),
      Animated.loop(
        Animated.timing(rightCircle, {
          toValue: 2,
          duration: animationDuration,
          easing: Easing.inOut(Easing.ease)
        })
      )
    ]).start();
  }, [leftCircle, middleCircle, rightCircle, animationDelay, animationDuration]);

  return (
    <View style={[style, spinnerStyle.container]} {...props}>
      <Animated.View style={[spinnerStyle.dot, animateStyle.leftCircle]} />
      <Animated.View style={[spinnerStyle.dot, animateStyle.middleCircle]} />
      <Animated.View style={[spinnerStyle.dot, animateStyle.rightCircle]} />
    </View>
  );
};

HollowDotsSpinner.defaultProps = EpicSpinnersDefaultProps;
