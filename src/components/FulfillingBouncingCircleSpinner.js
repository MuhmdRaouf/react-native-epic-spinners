/** @flow **/
import type { Element } from 'react';
import React, { useEffect, useState } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, Easing, StyleSheet } from 'react-native';

type EpicSpinnersProps = {
  size?: number,
  animationDuration?: number,
  color?: string,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 200,
  color: 'red',
  animationDuration: 1000
};

export const FulfillingBouncingCircleSpinner = (props: EpicSpinnersProps): Element<any> => {
  const { size, color, animationDuration, style } = props;
  const [animate] = useState(new Animated.Value(0));
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'relative'
    },
    circle: {
      height: size,
      width: size,
      borderColor: color,
      borderRadius: size * 0.5,
      position: 'relative',
      borderWidth: size * 0.1
    },
    orbit: {
      height: size,
      width: size,
      borderColor: color,
      position: 'absolute',
      top: 0,
      left: 0,
      borderRadius: size * 0.5,
      borderWidth: size * 0.03
    }
  });
  const animateStyle = {
    container: {
      transform: [
        {
          rotate: animate.interpolate({
            inputRange: [0, 9, 10],
            outputRange: ['0deg', '360deg', '360deg']
          })
        }
      ]
    },
    orbit: {
      transform: [
        {
          scale: animate.interpolate({
            inputRange: [0, 6, 7, 8, 9, 10],
            outputRange: [1, 1, 0.8, 1, 0.8, 1]
          })
        }
      ]
    },
    circle: {
      transform: [
        {
          scale: animate.interpolate({
            inputRange: [0, 6, 7, 8, 9, 10],
            outputRange: [1, 1, 1.4, 1, 1.4, 1]
          })
        }
      ],
      borderColor: animate.interpolate({
        inputRange: [0, 4, 5, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      }),
      borderTopColor: animate.interpolate({
        inputRange: [0, 10],
        outputRange: [color, color]
      }),
      borderRightColor: animate.interpolate({
        inputRange: [0, 1, 2, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      }),
      borderBottomColor: animate.interpolate({
        inputRange: [0, 2, 3, 9, 10],
        outputRange: ['transparent', 'transparent', color, color, 'transparent']
      })
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(animate, {
        toValue: 10,
        duration: animationDuration * 4,
        easing: Easing.inOut(Easing.ease)
      })
    ).start();
  }, [animate, animationDuration]);

  return (
    <Animated.View style={[style, spinnerStyle.container, animateStyle.container]} {...props}>
      <Animated.View style={[spinnerStyle.circle, animateStyle.circle]} />
      <Animated.View style={[spinnerStyle.orbit, animateStyle.orbit]} />
    </Animated.View>
  );
};

FulfillingBouncingCircleSpinner.defaultProps = EpicSpinnersDefaultProps;
