# react-native-declan

Declan is a library that makes it easy to incorporate declarative animations and interactions into your React Native app. It's inspired heavily by the [UX](https://www.fusetools.com/docs/declarative-animation) language created by Fuse.

## Demo

[Insert gifs of some compelling demos here]

### Run the demo app on Expo
https://expo.io/@akalyan/examples

### Build and run the demo app on your computer
Clone the repo and run:
```
cd examples
yarn
yarn start
```
...then scan the QR code in the Expo app

## Installation
> npm install --save react-native-declan

or

> yarn add react-native-declan

## Usage

We suggest reading the Fuse [documentation for Animations](https://www.fusetools.com/docs/declarative-animation) to get a better sense for what react-native-declan strives to be and how to implement compelling user interactions with a truly declarative API. In lieu of that, here is a summary.

There are three main entities that react-native-declan comprises:
- Animators - descriptions of how components change
- Triggers - stimuli that invoke change
- Components - what will change

### Animators

Animators describe how components will change. There are a handful of basic animators to use: Move, Rotate, Scale, Fade.

New, more complex, animators can be built by combining those basic animators. For an example of this, see the [Shake](https://github.com/ChefSteps/react-native-declan/blob/master/src/animators/Shake.js). These new animators should have the same behavior as the basic animators.

Animators essentially wrap the [Animated.timing](https://facebook.github.io/react-native/docs/animated.html#timing) API twice -- once running forward, and another running backward.

Example:
```
<Move
  getTargetRef={() => elementToMove}
  x={80}
  duration={1000}
  easing={Easing.bounce}
  durationBack={500}
  easing={Easing.linear}
/>
```

The above snippet describes a movement of the component referenced by `elementToMove`, which will move right 80 pixels over 1 second with a bounce easing curve...when triggered.

### Triggers

Triggers actually cause change to happen. This is where we take the user's actions into account. There are three types of triggers:
- Pulse triggers - play a set of animators forward)
- While triggers - play forward while a condition is met, and play backward otherwise)
- Gesture-responsive triggers - animators that play in response to, and in proportion to, some user gesture

#### Supported triggers
[Insert table of triggers, description, usage.]

### Components

Finally, react-native-declan has a set of components that can be manipulated through animators and triggers. Right now, the only component is a static view, but that will soon change.

## Contributing
If you are interested in contributing to react-native-declan or have feedback, please contact us. Pull requests are also welcome.

## License
[MIT](https://github.com/ChefSteps/react-native-declan/blob/master/LICENSE)
