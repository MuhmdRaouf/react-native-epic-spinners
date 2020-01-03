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
  size: 300,
  color: 'red',
  animationDuration: 1500
};

export const FingerprintSpinner = (props: EpicProps): Element<any> => {
  const { size, animationDuration, color, style, ...restProps } = props;
  const ringsNumber = 9;
  const [first, second, third, forth, fifth, sixth, seventh, eighth, ninth] = useAnimated(ringsNumber);
  const containerPadding = 2;
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
    spinnerRing: {
      borderRadius: size * 0.5,
      borderWidth: size * 0.03,
      borderTopColor: color,
      position: 'absolute'
    },
    spinnerRingFirstChild: {
      height: ringBase,
      width: ringBase
    },
    spinnerRingSecondChild: {
      height: ringBase + ringBase,
      width: ringBase + ringBase
    },
    spinnerRingThirdChild: {
      height: ringBase + 2 * ringBase,
      width: ringBase + 2 * ringBase
    },
    spinnerRingFourthChild: {
      height: ringBase + 3 * ringBase,
      width: ringBase + 3 * ringBase
    },
    spinnerRingFifthChild: {
      height: ringBase + 4 * ringBase,
      width: ringBase + 4 * ringBase
    },
    spinnerRingSixthChild: {
      height: ringBase + 5 * ringBase,
      width: ringBase + 5 * ringBase
    },
    spinnerRingSeventhChild: {
      height: ringBase + 6 * ringBase,
      width: ringBase + 6 * ringBase
    },
    spinnerRingEighthChild: {
      height: ringBase + 7 * ringBase,
      width: ringBase + 7 * ringBase
    },
    spinnerRingNinthChild: {
      height: ringBase + 8 * ringBase,
      width: ringBase + 8 * ringBase
    }
  });

  const borderTransform = (animated) => [
    {
      rotate: animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
      })
    }
  ];

  const animateStyle = {
    firstRotate: { transform: borderTransform(first) },
    secondRotate: { transform: borderTransform(second) },
    thirdRotate: { transform: borderTransform(third) },
    forthRotate: { transform: borderTransform(forth) },
    fifthRotate: { transform: borderTransform(fifth) },
    sixthRotate: { transform: borderTransform(sixth) },
    seventhRotate: { transform: borderTransform(seventh) },
    eighthRotate: { transform: borderTransform(eighth) },
    ninthRotate: { transform: borderTransform(ninth) }
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
        bezierAnimation(first),
        bezierAnimation(second),
        bezierAnimation(third),
        bezierAnimation(forth),
        bezierAnimation(fifth),
        bezierAnimation(sixth),
        bezierAnimation(seventh),
        bezierAnimation(eighth),
        bezierAnimation(ninth)
      ])
    ).start();
  }, [animationDuration, eighth, fifth, first, forth, ninth, second, seventh, sixth, third]);

  return (
    <View style={style} {...restProps}>
      <View style={spinnerStyle.container}>
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingFirstChild, animateStyle.firstRotate]}
        />
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingSecondChild, animateStyle.secondRotate]}
        />
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingThirdChild, animateStyle.thirdRotate]}
        />
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingFourthChild, animateStyle.forthRotate]}
        />
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingFifthChild, animateStyle.fifthRotate]}
        />
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingSixthChild, animateStyle.sixthRotate]}
        />
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingSeventhChild, animateStyle.seventhRotate]}
        />
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingEighthChild, animateStyle.eighthRotate]}
        />
        <Animated.View
          style={[spinnerStyle.spinnerRing, spinnerStyle.spinnerRingNinthChild, animateStyle.ninthRotate]}
        />
      </View>
    </View>
  );
};

FingerprintSpinner.defaultProps = EpicSpinnersDefaultProps;
