/** @flow **/
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

export type EpicSpinnersProps = {
  size: number,
  animationDuration: number,
  color: string,
  style?: ViewStyleProp
};

export const EpicSpinnersDefaultProps = {
  size: 25,
  color: 'red',
  animationDuration: 1500
};
