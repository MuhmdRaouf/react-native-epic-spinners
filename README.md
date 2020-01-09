# React Native Epic Spinners

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-epic-spinners">
    <img src="https://img.shields.io/npm/v/react-native-epic-spinners.svg" alt="npm version" />
  </a>
  <a href="https://github.com/MuhmdRaouf/react-native-epic-spinners/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/react-native-epic-spinners.svg" alt="license" />
  </a>
  <a href="https://snyk.io/test/github/muhmdraouf/react-native-epic-spinners">
    <img src="https://snyk.io/test/github/muhmdraouf/react-native-epic-spinners/badge.svg" alt="Vulnerability status" />
  </a>
</p>

This library is the React Native's built-in Animated implementation of [epic-spinners](http://epic-spinners.epicmax.co/) by [EpicMax](https://github.com/epicmaxco/epic-spinners)

Special Thanks to [Bondz](https://github.com/bondz/react-epic-spinners) for his project [react-epic-spinners](https://bondz.github.io/react-epic-spinners/) it helps me a lot. 

## Installation

Using NPM

```bash
npm install react-native-epic-spinners
```

Or Yarn

```bash
yarn add react-native-epic-spinners
```

## Usage

All components accept the following props

* `animationDelay` `[number]`: (optional) defaults to `1000` which is 1 second. specifies the timing of the spinner animation. Lower numbers mean the animations restart faster.
* `color` `[string]`: (optional) defaults to `red`. Specifies the color of the spinner.
* `size` `[number]`: (optional) specifies how large the spinner should be rendered
* `style` `[object]`: (optional) a react component style object to additionally style the component

## Examples

```jsx
//** @flow **//
import React from 'react';
import { SafeAreaView } from 'react-native';
import { AtomSpinner } from 'react-native-epic-spinners'

const App: () => React$Node = () => {
  return (
    <SafeAreaView style={style.container}>
      <AtomSpinner animationDuration={2500} color="blue" size={20} />
    </SafeAreaView>
  );
};
export default App;
```
The source code for the example (showcase) app is under the [Example](Example/README.md) directory.
If you want to play with the API but don't feel like trying it on a real app, you can run the example project.

## Components

> All components are named exports of the package.

```jsx
import { ... } from 'react-native-epic-spinners'
```

1. [AtomSpinner](/src/components/AtomSpinner.js)
2. [BreedingRhombusSpinner](/src/components/BreedingRhombusSpinner.js)
3. [CirclesToRhombusesSpinner](/src/components/CirclesToRhombusesSpinner.js)
4. [FingerprintSpinner](/src/components/FingerprintSpinner.js)
5. [FlowerSpinner](/src/components/FlowerSpinner.js)
6. [FulfillingBouncingCircleSpinner](/src/components/FulfillingBouncingCircleSpinner.js)
7. [FulfillingSquareSpinner](/src/components/FulfillingSquareSpinner.js)
8. [HalfCircleSpinner](/src/components/HalfCircleSpinner.js)
9. [HollowDotsSpinner](/src/components/HollowDotsSpinner.js)
10. [IntersectingCirclesSpinner](/src/components/IntersectingCirclesSpinner.js)
11. [LoopingRhombusesSpinner](/src/components/LoopingRhombusesSpinner.js)
12. [OrbitSpinner](/src/components/OrbitSpinner.js)
13. [PixelSpinner](/src/components/PixelSpinner.js)
14. [RadarSpinner](/src/components/RadarSpinner.js)
15. [ScalingSquaresSpinner](/src/components/ScalingSquaresSpinner.js)
16. [SelfBuildingSquareSpinner](/src/components/SelfBuildingSquareSpinner.js)
17. [SemipolarSpinner](/src/components/SemipolarSpinner.js)
18. [SpringSpinner](/src/components/SpringSpinner.js)
19. [SwappingSquaresSpinner](/src/components/SwappingSquaresSpinner.js)
20. [TrinityRingsSpinner](/src/components/TrinityRingsSpinner.js)

### Known Issues

Because i am using React Native's built-in Animated `Android` has  the following problems
  
* Performance issue due it runs JS threads and send the animation through the bridge 
(if we use react reanimated it might solve it but i dont know how to use the library, PRs welcomed if you know how)
* Some styling dont work on android (a bug in react native itself) such as borderRightColor and borderLeftColor 
* some style partially works but it looks odd too.  

If you know a fix for it, please send a PR :)

## License

[MIT](LICENSE).
