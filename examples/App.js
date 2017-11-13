import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ShakeDemo from './views/ShakeDemo';
import CycleDemo from './views/CycleDemo';
import ScrollPositionDemo from './views/ScrollPositionDemo';
import StateGroupDemo from './views/StateGroupDemo';
import SequenceDemo from './views/SequenceDemo';
import StaggerDemo from './views/StaggerDemo';
import CameraDemo from './views/CameraDemo';
import MeetupDemo from './views/MeetupDemo';
import TinyBeansDemo from './views/TinyBeansDemo';
import SwipeDemo from './views/SwipeDemo';

const HomeScreen = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button
      onPress={() => navigation.navigate('CameraDemo')}
      title="Camera"
    />
    <Button
      onPress={() => navigation.navigate('MeetupDemo')}
      title="Meetup"
    />
    <Button
      onPress={() => navigation.navigate('TinyBeansDemo')}
      title="Tiny Beans"
    />
    <Button
      onPress={() => navigation.navigate('SwipeDemo')}
      title="Swipe"
    />
  </View>
);

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  ShakeDemo: {
    screen: ShakeDemo,
    navigationOptions: {
      headerTitle: 'Shake Demo',
    },
  },
  CycleDemo: {
    screen: CycleDemo,
    navigationOptions: {
      headerTitle: 'Cycle Demo',
    },
  },
  ScrollPositionDemo: {
    screen: ScrollPositionDemo,
    navigationOptions: {
      headerTitle: 'Scroll Position Demo',
    },
  },
  StateGroupDemo: {
    screen: StateGroupDemo,
    navigationOptions: {
      headerTitle: 'State Group Demo',
    },
  },
  SequenceDemo: {
    screen: SequenceDemo,
    navigationOptions: {
      headerTitle: 'Sequence Demo',
    },
  },
  StaggerDemo: {
    screen: StaggerDemo,
    navigationOptions: {
      headerTitle: 'Stagger Demo',
    },
  },
  CameraDemo: {
    screen: CameraDemo,
    navigationOptions: {
      headerTitle: 'Camera Demo',
    },
  },
  MeetupDemo: {
    screen: MeetupDemo,
    navigationOptions: {
      header: null,
    },
  },
  TinyBeansDemo: {
    screen: TinyBeansDemo,
    navigationOptions: {
      headerTitle: 'Tiny Beans Demo',
    },
  },
  SwipeDemo: {
      screen: SwipeDemo,
      navigationOptions: {
        headerTitle: 'Swipe Demo',
      },
    },
}, {
  headerMode: 'screen'
});

export default class App extends React.Component {
  render() {
    return <RootNavigator />;
  }
}
