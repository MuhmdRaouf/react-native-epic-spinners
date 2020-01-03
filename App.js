/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { OrbitSpinner } from './src/components/OrbitSpinner';

const App: () => React$Node = () => {
  const style = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }
  });
  return (
    <View style={style.container}>
      <OrbitSpinner />
    </View>
  );
};

export default App;
