// @flow
/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react';
import { View, Easing, Button } from 'react-native';

import {
  AnimatableView,
  Move,
  StateGroup,
  State,
  Scale,
  type Animator,
} from 'react-native-declan';

type ComponentState = {};
type Props = {};

class StateGroupDemo extends Component<any, Props, ComponentState> {
  state: ComponentState;
  target: React.Element<*>;
  stateGroup: StateGroup;

  getTargetRef = () => this.target;

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', 'alignItems': 'center' }}>
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
            }}
          />

        <Button
          onPress={() => {
            this.stateGroup.goToState('left');
          }}
          title="Left"
        />
        <Button
          onPress={() => {
            this.stateGroup.goToState('middle');
          }}
          title="Middle"
        />
        <Button
          onPress={() => {
            this.stateGroup.goToState('right');
          }}
          title="Right"
        />

        <StateGroup
          ref={ref => {
            this.stateGroup = ref;
          }}
          defaultState="middle"
        >
          <State name="left">
            <Move
              getTargetRef={this.getTargetRef}
              x={-40}
              duration={1000}
              easing={Easing.bounce}
            />
            <Scale
              getTargetRef={this.getTargetRef}
              x={1.5}
              y={0.5}
              duration={1000}
              easing={Easing.bounce}
            />
          </State>
          <State name="middle">
            <Move
              getTargetRef={this.getTargetRef}
              x={0}
              duration={1000}
              easing={Easing.bounce}
            />
            <Scale
              getTargetRef={this.getTargetRef}
              x={1}
              y={1}
              duration={1000}
              easing={Easing.bounce}
            />
          </State>
          <State name="right">
            <Move
              getTargetRef={this.getTargetRef}
              x={40}
              duration={1000}
              easing={Easing.bounce}
            />
            <Scale
              getTargetRef={this.getTargetRef}
              x={0.5}
              y={1.5}
              duration={1000}
              easing={Easing.bounce}
            />
          </State>
        </StateGroup>
      </View>
    );
  }
}

export default StateGroupDemo;
