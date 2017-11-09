// @flow
/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react';
import { View, Button } from 'react-native';

import {
  Declan,
  Shake,
  type Animator,
} from 'react-native-declan';

type State = {};
type Props = {};

class ShakeDemo extends Component<any, Props, State> {
  state: State;
  toShake: React.Element<*>;
  shaker: Animator;

  getElementToShake = () => this.toShake;

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Declan.View
          ref={ref => {
            this.toShake = ref;
          }}
          style={{
            width: 200,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'lightblue',
            borderWidth: 3,
            borderColor: 'white',
            margin: 50,
          }}
        />

        <Button
          onPress={() => {
            this.shaker.start();
          }}
          title="Shake it!"
        />

        <Shake
          ref={ref => {
            this.shaker = ref;
          }}
          getTargetRef={this.getElementToShake}
        />
      </View>
    );
  }
}

export default ShakeDemo;
