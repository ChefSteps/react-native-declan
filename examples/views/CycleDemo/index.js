// @flow
/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react';
import { Text, View, Easing, Button } from 'react-native';

import {
  Declan,
  Move,
  Cycle,
  type Animator,
} from 'react-native-declan';

type State = {};
type Props = {};

class CycleDemo extends Component<any, Props, State> {
  state: State;
  target: React.Element<*>;
  cycle: Animator;

  getTargetRef = () => this.target;

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Declan.View
          ref={ref => {
            this.target = ref;
          }}
          style={{
            width: 20,
            height: 20,
            borderRadius: 25,
            backgroundColor: 'lightblue',
            borderWidth: 1,
            borderColor: 'white',
            margin: 50,
            transform: [{ translateX: -40 }],
          }}
        />

        <Button
          onPress={() => {
            this.cycle.reset();
            this.cycle.start();
          }}
          title="Start"
        />
        <Button
          onPress={() => {
            this.cycle.stop();
          }}
          title="Stop"
        />

        <Cycle
          ref={ref => {
            this.cycle = ref;
          }}
          getTargetRef={this.getTargetRef}
          duration={1000}
          easing={Easing.bounce}
        >
          <Move x={80} />
          <Move x={-80} delay={1000} />
        </Cycle>
      </View>
    );
  }
}

export default CycleDemo;
