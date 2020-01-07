/** @flow **/
import type { Element } from 'react';
import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import type { EpicSpinnersProps } from '../core/Typings';
import { EpicSpinnersDefaultProps } from '../core/Typings';
import { useAnimated, useAnimatedViewsNameGenerator } from '../core/CustomHooks';
import { GenerateAnimatedViews } from '../core/GenerateAnimatedViews';

export function FingerprintSpinner(props: EpicSpinnersProps): Element<any> {
  const { color, animationDuration, size, style, ...restProps } = props;
  const containerSize = size * 8;
  const ringsNumber = 9;
  const containerPadding = 2;
  const outerRingSize = containerSize - containerPadding * 2;
  const ringBase = outerRingSize / ringsNumber;
  const [ring1, ring2, ring3, ring4, ring5, ring6, ring7, ring8, ring9] = useAnimated(ringsNumber);
  const VIEWS = useAnimatedViewsNameGenerator('ring', 9);
  const borderTransform = (animated) => [
    {
      rotate: animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    }
  ];
  const spinnerStyle = StyleSheet.create({
    container: {
      height: containerSize,
      width: containerSize,
      overflow: 'hidden',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center'
    },
    spinnerRing: {
      borderRadius: containerSize * 0.5,
      borderWidth: containerSize * 0.03,
      borderTopColor: color,
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
    },
    ring6: {
      height: ringBase + 5 * ringBase,
      width: ringBase + 5 * ringBase
    },
    ring7: {
      height: ringBase + 6 * ringBase,
      width: ringBase + 6 * ringBase
    },
    ring8: {
      height: ringBase + 7 * ringBase,
      width: ringBase + 7 * ringBase
    },
    ring9: {
      height: ringBase + 8 * ringBase,
      width: ringBase + 8 * ringBase
    }
  });
  const animatedStyle = {
    ring1: { transform: borderTransform(ring1) },
    ring2: { transform: borderTransform(ring2) },
    ring3: { transform: borderTransform(ring3) },
    ring4: { transform: borderTransform(ring4) },
    ring5: { transform: borderTransform(ring5) },
    ring6: { transform: borderTransform(ring6) },
    ring7: { transform: borderTransform(ring7) },
    ring8: { transform: borderTransform(ring8) },
    ring9: { transform: borderTransform(ring9) }
  };

  useEffect(() => {
    const bezierAnimation = (animated) => {
      return Animated.timing(animated, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.bezier(0.68, -0.75, 0.265, 1.75)
      });
    };

    Animated.loop(
      Animated.stagger(50, [
        bezierAnimation(ring1),
        bezierAnimation(ring2),
        bezierAnimation(ring3),
        bezierAnimation(ring4),
        bezierAnimation(ring5),
        bezierAnimation(ring6),
        bezierAnimation(ring7),
        bezierAnimation(ring8),
        bezierAnimation(ring9)
      ])
    ).start();
  }, [animationDuration, ring1, ring2, ring3, ring4, ring5, ring6, ring7, ring8, ring9]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <GenerateAnimatedViews
          animatedViewsArray={VIEWS}
          animatedStyle={animatedStyle}
          spinnerStyle={spinnerStyle}
          style={spinnerStyle.spinnerRing}
        />
      </View>
    </View>
  );
}

FingerprintSpinner.defaultProps = EpicSpinnersDefaultProps;
