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
  size: 100,
  color: 'red',
  animationDuration: 1000
};

export const AtomSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style } = props;
  const [firstSpinnerLine] = useState(new Animated.Value(0));
  const [secondSpinnerLine] = useState(new Animated.Value(0));
  const [thirdSpinnerLine] = useState(new Animated.Value(0));

  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      overflow: 'hidden'
    },
    spinnerInner: {
      position: 'relative',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    spinnerCircle: {
      height: size * 0.18,
      width: size * 0.18,
      backgroundColor: color,
      borderRadius: size * 0.5
    },
    spinnerLine: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: size * 0.5,
      borderLeftWidth: size / 25,
      borderTopWidth: size / 25,
      borderLeftColor: color,
      borderTopColor: 'transparent'
    }
  });
  const animateStyle = {
    firstSpinnerLine: {
      transform: [
        {
          rotateZ: '120deg'
        },
        {
          rotateX: '66deg'
        },
        {
          rotateZ: firstSpinnerLine.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ]
    },
    secondSpinnerLine: {
      transform: [
        {
          rotateZ: '240deg'
        },
        {
          rotateX: '66deg'
        },
        {
          rotateZ: firstSpinnerLine.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ]
    },
    thirdSpinnerLine: {
      transform: [
        {
          rotateZ: '360deg'
        },
        {
          rotateX: '66deg'
        },
        {
          rotateZ: firstSpinnerLine.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ]
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(firstSpinnerLine, {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear
        }),
        Animated.timing(secondSpinnerLine, {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear
        }),
        Animated.timing(thirdSpinnerLine, {
          toValue: 1,
          duration: animationDuration,
          easing: Easing.linear
        })
      ])
    ).start();
  }, [animationDuration, firstSpinnerLine, secondSpinnerLine, thirdSpinnerLine]);

  return (
    <View style={style} {...props}>
      <View style={spinnerStyle.container}>
        <View style={[spinnerStyle.spinnerInner]}>
          <Animated.View style={[spinnerStyle.spinnerLine, animateStyle.firstSpinnerLine]} />
          <Animated.View style={[spinnerStyle.spinnerLine, animateStyle.secondSpinnerLine]} />
          <Animated.View style={[spinnerStyle.spinnerLine, animateStyle.thirdSpinnerLine]} />
          <View style={[spinnerStyle.spinnerCircle]} />
        </View>
      </View>
    </View>
  );
};

AtomSpinner.defaultProps = EpicSpinnersDefaultProps;
