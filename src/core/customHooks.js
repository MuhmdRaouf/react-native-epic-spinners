/** @flow **/
import { Animated } from 'react-native';

export const useAnimated = (objectsNumber: number = 1) => {
  return Array.from(Array(objectsNumber), () => new Animated.Value(0));
};
