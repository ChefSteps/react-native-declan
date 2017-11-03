// @flow
/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react';
import { Text, View, Easing, Button } from 'react-native';

import {
  AnimatableView,
  Move,
  Sequence,
  type Animator,
} from 'react-native-declan';

type State = {};
type Props = {};

class SequenceDemo extends Component<any, Props, State> {
  state: State;
  target: React.Element<*>;
  trigger: Animator;

  getTargetRef = () => this.target;

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AnimatableView
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
            // this.trigger.reset();
            this.trigger.start();
          }}
          title="Start"
        />
        <Button
          onPress={() => {
            this.trigger.stop();
          }}
          title="Stop"
        />

        <Sequence
          ref={ref => {
            this.trigger = ref;
          }}
          getTargetRef={this.getTargetRef}
          duration={1000}
          easing={Easing.bounce}
        >
          <Move x={80} />
          <Move x={-80} />
        </Sequence>
      </View>
    );
  }
}

export default SequenceDemo;
