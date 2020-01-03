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
  size: 60,
  color: 'red',
  animationDuration: 1000
};

export const HalfCircleSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style } = props;
  const [firstInnerCircle, secondInnerCircle] = useAnimated(2);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'relative',
      borderRadius: size
    },
    circle: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: size,
      borderWidth: size / 10,
      borderColor: 'transparent'
    },
    firstInnerCircle: {
      borderTopColor: color
    },
    secondInnerCircle: {
      borderBottomColor: color
    }
  });
  const animateStyle = {
    firstInnerCircle: {
      transform: [
        {
          rotate: firstInnerCircle.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ]
    },
    secondInnerCircle: {
      transform: [
        {
          rotate: secondInnerCircle.interpolate({
            inputRange: [0, 1],
            outputRange: ['360deg', '0deg']
          })
        }
      ]
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(firstInnerCircle, {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear
        })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(secondInnerCircle, {
            toValue: 1,
            duration: animationDuration,
            easing: Easing.quad
          }),
          Animated.timing(secondInnerCircle, {
            toValue: 0,
            duration: animationDuration,
            easing: Easing.linear
          })
        ])
      )
    ]).start();
  }, [animationDuration, firstInnerCircle, secondInnerCircle]);

  return (
    <View style={style} {...props}>
      <View style={spinnerStyle.container}>
        <Animated.View style={[spinnerStyle.circle, spinnerStyle.firstInnerCircle, animateStyle.firstInnerCircle]} />
        <Animated.View style={[spinnerStyle.circle, spinnerStyle.secondInnerCircle, animateStyle.secondInnerCircle]} />
      </View>
    </View>
  );
};

HalfCircleSpinner.defaultProps = EpicSpinnersDefaultProps;
