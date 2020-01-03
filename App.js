/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SpringSpinner } from './src/components/SpringSpinner';

const App: () => React$Node = () => {
  const style = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }
  });
  return (
    <View style={style.container}>
      <SpringSpinner />
    </View>
  );
};

export default App;
