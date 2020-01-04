/** @flow **/
import type AnimatedInterpolation from 'react-native/Libraries/Animated/src/nodes/AnimatedInterpolation';

type TransformationTypeProp = {
  translateX: number | AnimatedInterpolation,
  translateY: number | AnimatedInterpolation,
  rotateX: string | AnimatedInterpolation,
  rotateY: string | AnimatedInterpolation,
  rotateZ: string | AnimatedInterpolation,
  scale: number | AnimatedInterpolation
};

type TransformationReturnType = { transform: Array<Object> };

export const getAnimatedTransformation = ({
  translateX = 0,
  translateY = 0,
  rotateX = '0deg',
  rotateY = '0deg',
  rotateZ = '0deg',
  scale = 1
}: TransformationTypeProp): TransformationReturnType => {
  return { transform: [{ translateX }, { translateY }, { rotateX }, { rotateY }, { rotateZ }, { scale }] };
};
