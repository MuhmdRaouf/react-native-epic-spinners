/** @flow **/
import { Animated } from 'react-native';
import type AnimatedValue from 'react-native/Libraries/Animated/src/nodes/AnimatedValue';

export const useAnimated = (objectsNumber: number = 1): Array<AnimatedValue> => {
  return Array.from(Array(objectsNumber), () => new Animated.Value(0));
};

export const useAnimatedViewsNameGenerator = (viewName: string, viewsNumber: number = 1): Array<string> => {
  return Array.from(Array(viewsNumber), (_, index) => `${viewName}${index + 1}`);
};
