/** @flow **/
import { renderHook } from '@testing-library/react-hooks';
import { useAnimated, useAnimatedViewsNameGenerator } from '../CustomHooks';

describe('useAnimated Hook', () => {
  test('should use useAnimated to create one Animated Object when no argument passed', () => {
    const numberOfObject = 1;
    const { result } = renderHook(() => useAnimated(numberOfObject));
    expect(result.current).toHaveLength(numberOfObject);
  });

  test('should use useAnimated to create Animated Objects according to the given argument value', () => {
    const numberOfObject = 5;
    const { result } = renderHook(() => useAnimated(numberOfObject));
    expect(result.current).toHaveLength(numberOfObject);
  });
});

describe('useAnimatedViewsNameGenerator Hook', () => {
  test('should use useAnimatedViewsNameGenerator to create array of 1 of given view name', () => {
    const numberOfObject = 1;
    const { result } = renderHook(() => useAnimatedViewsNameGenerator('square', numberOfObject));
    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toBe('square1');
  });

  test('should use useAnimatedViewsNameGenerator to create array of 5 of given view name', () => {
    const numberOfObject = 5;
    const { result } = renderHook(() => useAnimatedViewsNameGenerator('square', numberOfObject));
    expect(result.current).toHaveLength(5);
    expect(result.current[0]).toBe('square1');
    expect(result.current[1]).toBe('square2');
    expect(result.current[2]).toBe('square3');
    expect(result.current[3]).toBe('square4');
    expect(result.current[4]).toBe('square5');
  });
});
