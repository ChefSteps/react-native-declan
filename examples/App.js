import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ShakeDemo from './views/ShakeDemo';
import CycleDemo from './views/CycleDemo';
import ScrollPositionDemo from './views/ScrollPositionDemo';
import ScrollDirectionDemo from './views/ScrollDirectionDemo';
import StateGroupDemo from './views/StateGroupDemo';
import SequenceDemo from './views/SequenceDemo';
import StaggerDemo from './views/StaggerDemo';
import CameraDemo from './views/CameraDemo';

const HomeScreen = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button
      onPress={() => navigation.navigate('ShakeDemo')}
      title="Shake"
    />
    <Button
      onPress={() => navigation.navigate('CycleDemo')}
      title="Cycle"
    />
    <Button
      onPress={() => navigation.navigate('ScrollPositionDemo')}
      title="Scroll Position Animation"
    />
    <Button
      onPress={() => navigation.navigate('ScrollDirectionDemo')}
      title="Scroll Direction Animation"
    />
    <Button
      onPress={() => navigation.navigate('StateGroupDemo')}
      title="State Group"
    />
    <Button
      onPress={() => navigation.navigate('SequenceDemo')}
      title="Sequence"
    />
    <Button
      onPress={() => navigation.navigate('StaggerDemo')}
      title="Stagger"
    />
    <Button
      onPress={() => navigation.navigate('CameraDemo')}
      title="Camera"
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
  ScrollDirectionDemo: {
    screen: ScrollDirectionDemo,
    navigationOptions: {
      headerTitle: 'Scroll Direction Demo',
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
});

export default class App extends React.Component {
  render() {
    return <RootNavigator />;
  }
}
