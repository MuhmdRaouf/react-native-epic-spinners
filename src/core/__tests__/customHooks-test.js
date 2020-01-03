/** @flow **/
import { renderHook } from '@testing-library/react-hooks';
import { useAnimated } from '../customHooks';

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
