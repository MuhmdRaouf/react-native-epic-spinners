/** @flow **/
import type { Element } from 'react';
import React, { useEffect, useState } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, Easing, StyleSheet, View } from 'react-native';

type EpicProps = {
  size?: number,
  animationDuration?: number,
  color?: string,
  style?: ViewStyleProp
};
const EpicSpinnersDefaultProps = {
  size: 50,
  color: 'red',
  animationDuration: 4000
};

export const FulfillingSquareSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style } = props;
  const [animatedContainer] = useState(new Animated.Value(0));
  const [animatedInnerSpinner] = useState(new Animated.Value(0));
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      position: 'relative',
      borderWidth: size * 0.1,
      borderColor: color
    },
    spinnerInner: {
      backgroundColor: color,
      width: '100%',
      opacity: 1
    }
  });
  const animateStyle = {
    container: {
      transform: [
        {
          rotate: animatedContainer.interpolate({
            inputRange: [0, 1, 2, 4, 5],
            outputRange: ['0deg', '180deg', '180deg', '360deg', '360deg']
          })
        }
      ]
    },
    spinnerInner: {
      height: animatedInnerSpinner.interpolate({
        inputRange: [0, 1, 2, 4, 5],
        outputRange: ['0%', '0%', '100%', '100%', '0%']
      })
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animatedContainer, {
          toValue: 5,
          duration: animationDuration,
          easing: Easing.ease
        }),
        Animated.timing(animatedInnerSpinner, {
          toValue: 5,
          duration: animationDuration,
          easing: Easing.ease
        })
      ])
    ).start();
  }, [animatedContainer, animatedInnerSpinner, animationDuration]);

  return (
    <View style={style} {...props}>
      <Animated.View style={[spinnerStyle.container, animateStyle.container]}>
        <Animated.View style={[spinnerStyle.spinnerInner, animateStyle.spinnerInner]} />
      </Animated.View>
    </View>
  );
};

FulfillingSquareSpinner.defaultProps = EpicSpinnersDefaultProps;
