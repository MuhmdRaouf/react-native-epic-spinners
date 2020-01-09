/** @flow **/
import React from 'react';
import 'react-native';
import { render } from 'react-native-testing-library';

import App from '../App';

describe('<App />', () => {
  const { toJSON } = render(<App />);

  it('should match <App /> snapshot', () => {
    expect(toJSON()).toMatchSnapshot();
  });
});
