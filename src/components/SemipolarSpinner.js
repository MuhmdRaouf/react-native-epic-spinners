/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Animated, StyleSheet, View } from 'react-native';

import { useAnimated } from '../core/customHooks';

type EpicProps = {
  size?: number,
  animationDuration?: number,
  color?: string,
  style?: ViewStyleProp
};

const EpicSpinnersDefaultProps = {
  size: 100,
  color: 'red',
  animationDuration: 2000
};

export const SemipolarSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style, ...restProps } = props;
  const ringsNumber = 5;
  const [ring1, ring2, ring3, ring4, ring5] = useAnimated(ringsNumber);
  const containerPadding = 3;
  const outerRingSize = size - containerPadding * 2;
  const ringBase = outerRingSize / ringsNumber;
  const spinnerStyle = StyleSheet.create({
    container: {
      height: size,
      width: size,
      padding: containerPadding,
      overflow: 'hidden',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center'
    },
    ring: {
      borderRadius: size * 0.5,
      borderWidth: size * 0.04,
      borderTopColor: color,
      borderLeftColor: color,
      position: 'absolute'
    },
    ring1: {
      height: ringBase,
      width: ringBase
    },
    ring2: {
      height: ringBase + ringBase,
      width: ringBase + ringBase
    },
    ring3: {
      height: ringBase + 2 * ringBase,
      width: ringBase + 2 * ringBase
    },
    ring4: {
      height: ringBase + 3 * ringBase,
      width: ringBase + 3 * ringBase
    },
    ring5: {
      height: ringBase + 4 * ringBase,
      width: ringBase + 4 * ringBase
    }
  });

  const getAnimatedTransformation = (animated) => {
    return {
      transform: [
        {
          scale: animated.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [1, 0.8, 1]
          })
        },
        {
          rotate: animated.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['0deg', '360deg', '0deg']
          })
        }
      ]
    };
  };

  const animatedStyle = {
    ring1: getAnimatedTransformation(ring1),
    ring2: getAnimatedTransformation(ring2),
    ring3: getAnimatedTransformation(ring3),
    ring4: getAnimatedTransformation(ring4),
    ring5: getAnimatedTransformation(ring5)
  };

  const generateSpinners = () => {
    return ['ring1', 'ring2', 'ring3', 'ring4', 'ring5'].map((val, index) => {
      return <Animated.View key={index} style={[spinnerStyle.ring, spinnerStyle[val], animatedStyle[val]]} />;
    });
  };

  useEffect(() => {
    const getAnimatedTiming = (animated) => {
      return Animated.loop(
        Animated.timing(animated, {
          toValue: 2,
          duration: animationDuration,
        })
      );
    };

    Animated.stagger(animationDuration * 0.1, [
      getAnimatedTiming(ring1),
      getAnimatedTiming(ring2),
      getAnimatedTiming(ring3),
      getAnimatedTiming(ring4),
      getAnimatedTiming(ring5)
    ]).start();
  }, [animationDuration, ring1, ring2, ring3, ring4, ring5]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>{generateSpinners()}</View>
    </View>
  );
};

SemipolarSpinner.defaultProps = EpicSpinnersDefaultProps;
