// @flow

import React, { Component, Children } from 'react';
import { View } from 'react-native';
import State from './State';

type Props = {
  children: typeof Children,
  defaultState: string,
};

class StateGroup extends Component<any, Props, {}> {
  state: {};
  props: Props;

  componentDidMount() {
    const defaultState = this.states[this.props.defaultState];
    if (defaultState) {
      defaultState.start();
      this.activeState = this.props.defaultState;
    }
  }

  activeState: string = 'default';
  states: { [string]: State } = {};

  goToState(state: string) {
    this.states[this.activeState].stop();
    this.states[state].start();
    this.activeState = state;
  }

  cloneState = (state: React.Element<*>) =>
    React.cloneElement(state, {
      // eslint-disable-next-line react/no-array-index-key
      key: state.props.name,
      ref: ref => {
        this.states[state.props.name] = ref;
        if (state.ref) {
          state.ref(ref);
        }
      },
    });

  processChildren() {
    if (Children.count(this.props.children) > 1) {
      return this.props.children.map(this.cloneState);
    } else if (Children.count(this.props.children) === 1) {
      const child = Children.only(this.props.children);
      return this.cloneState(child);
    }
    return null;
  }

  render() {
    return <View>{this.processChildren()}</View>;
  }
}

StateGroup.defaultProps = {
  defaultState: 'default',
};

export default StateGroup;
