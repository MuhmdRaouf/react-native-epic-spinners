/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function SemipolarSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 5;
  const ringsNumber = 5;
  const containerPadding = 3;
  const outerRingSize = containerSize - containerPadding * 2;
  const ringBase = outerRingSize / ringsNumber;
  const [ring1, ring2, ring3, ring4, ring5] = useAnimated(ringsNumber);
  const VIEWS = useAnimatedViewsNameGenerator('ring', 5);
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      padding: containerPadding,
      overflow: 'hidden',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center'
    },
    ring: {
      borderRadius: containerSize * 0.5,
      borderWidth: containerSize * 0.04,
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

  useEffect(() => {
    const getAnimatedTiming = (animated) => {
      return Animated.loop(
        Animated.timing(animated, {
          toValue: 2,
          duration: animationDuration
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
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews
          animatedViewsArray={VIEWS}
          animatedStyle={animatedStyle}
          spinnerStyle={spinnerStyle}
          style={spinnerStyle.ring}
        />
      </View>
    </View>
  );
}

SemipolarSpinner.defaultProps = EpicSpinnersDefaultProps;
