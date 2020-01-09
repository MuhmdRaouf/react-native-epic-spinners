/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
  AtomSpinner,
  BreedingRhombusSpinner,
  FingerprintSpinner,
  FlowerSpinner,
  FulfillingBouncingCircleSpinner,
  FulfillingSquareSpinner,
  HalfCircleSpinner,
  CirclesToRhombusesSpinner,
  HollowDotsSpinner,
  IntersectingCirclesSpinner,
  LoopingRhombusesSpinner,
  OrbitSpinner,
  PixelSpinner,
  RadarSpinner,
  ScalingSquaresSpinner,
  SelfBuildingSquareSpinner,
  SemipolarSpinner,
  SpringSpinner,
  SwappingSquaresSpinner,
  TrinityRingsSpinner
} from 'react-native-epic-spinners';

const App: () => React$Node = () => {
  const SCREENS = [
    'Atom',
    'BreedingRhombus',
    'CirclesToRhombuses',
    'Fingerprint',
    'Flower',
    'FulfillingBouncingCircle',
    'FulfillingSquare',
    'HalfCircle',
    'HollowDots',
    'IntersectingCircles',
    'LoopingRhombuses',
    'Orbit',
    'Pixel',
    'Radar',
    'ScalingSquares',
    'SelfBuildingSquare',
    'Semipolar',
    'Spring',
    'SwappingSquares',
    'TrinityRings'
  ];
  const COMPONENTS = {
    Atom: <AtomSpinner animationDuration={1000} size={20} />,
    BreedingRhombus: <BreedingRhombusSpinner animationDuration={1500} size={15} />,
    CirclesToRhombuses: <CirclesToRhombusesSpinner animationDuration={2000} size={20} />,
    Fingerprint: <FingerprintSpinner animationDuration={2000} size={15} />,
    Flower: <FlowerSpinner animationDuration={2500} size={20} />,
    FulfillingBouncingCircle: <FulfillingBouncingCircleSpinner animationDuration={1500} size={15} />,
    FulfillingSquare: <FulfillingSquareSpinner animationDuration={2000} size={20} />,
    HalfCircle: <HalfCircleSpinner animationDuration={2000} size={20} />,
    HollowDots: <HollowDotsSpinner animationDuration={2000} size={15} />,
    IntersectingCircles: <IntersectingCirclesSpinner animationDuration={3000} size={15} />,
    LoopingRhombuses: <LoopingRhombusesSpinner animationDuration={2000} size={20} />,
    Orbit: <OrbitSpinner animationDuration={1000} size={20} />,
    Pixel: <PixelSpinner animationDuration={1500} size={20} />,
    Radar: <RadarSpinner animationDuration={2000} size={20} />,
    ScalingSquares: <ScalingSquaresSpinner animationDuration={1000} size={20} />,
    SelfBuildingSquare: <SelfBuildingSquareSpinner animationDuration={2000} size={20} />,
    Semipolar: <SemipolarSpinner animationDuration={1500} size={20} />,
    Spring: <SpringSpinner animationDuration={2000} size={20} />,
    SwappingSquares: <SwappingSquaresSpinner animationDuration={1500} size={20} />,
    TrinityRings: <TrinityRingsSpinner animationDuration={2000} size={20} />
  };
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black'
    },
    componentContainer: {
      flex: 1,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center'
    },
    titleContainer: {
      flex: 0.05,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
      zIndex: 999
    },
    title: {
      fontSize: 22,
      color: 'white',
      textAlign: 'center'
    },
    flatListContainer: {
      flex: 0.95
    },
    spinnerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    spinnerTitle: {
      bottom: 0,
      fontSize: 12,
      color: 'white',
      position: 'absolute',
      textAlign: 'center'
    }
  });

  const renderReactNativeEpicSpinnerComponent = (componentName) => {
    const _displayName = (name) => name.replace(/([A-Z])/g, ' $1').trim();
    return (
      <View style={style.componentContainer}>
        <View style={style.spinnerContainer}>{COMPONENTS[componentName]}</View>
        <View style={style.titleContainer}>
          <Text style={style.spinnerTitle}>{_displayName(componentName)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.titleContainer}>
        <Text style={style.title}>React Native Epic Spinners</Text>
      </View>
      <View style={style.flatListContainer}>
        <FlatList
          data={SCREENS}
          renderItem={({ item }) => renderReactNativeEpicSpinnerComponent(item)}
          keyExtractor={(_, index) => index}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
