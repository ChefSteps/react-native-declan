// @flow

import React from 'react';
import { Easing } from 'react-native';

import CompositeAnimator from './CompositeAnimator';
import ManualTrigger from '../triggers/ManualTrigger';
import Move from './Move';
import { type BaseAnimatorProps } from '../types';

type State = {};
type Props = {
  amount: number,
  frequency: number,
} & BaseAnimatorProps;

class Shake extends CompositeAnimator<any, Props, State> {
  state: State;
  props: Props;

  render() {
    const { amount, frequency } = this.props;

    return (
      <ManualTrigger
        ref={ref => {
          this.controller = ref;
        }}
      >
        <Move
          getTargetRef={this.props.getTargetRef}
          initialValue={{ x: 0, y: 0 }}
          x={amount}
          duration={frequency}
          easing={Easing.linear}
        />
        <Move
          getTargetRef={this.props.getTargetRef}
          initialValue={{ x: amount, y: 0 }}
          x={-2 * amount}
          duration={frequency}
          delay={frequency * 1}
          easing={Easing.linear}
        />
        <Move
          getTargetRef={this.props.getTargetRef}
          initialValue={{ x: -amount, y: 0 }}
          x={2 * amount}
          duration={frequency}
          delay={frequency * 2}
          easing={Easing.linear}
        />
        <Move
          getTargetRef={this.props.getTargetRef}
          initialValue={{ x: amount, y: 0 }}
          x={-2 * amount}
          duration={frequency}
          delay={frequency * 3}
          easing={Easing.linear}
        />
        <Move
          getTargetRef={this.props.getTargetRef}
          initialValue={{ x: -amount, y: 0 }}
          x={amount}
          duration={frequency}
          delay={frequency * 4}
          easing={Easing.linear}
        />
      </ManualTrigger>
    );
  }
}

Shake.defaultProps = {
  amount: 12,
  frequency: 50,
};

export default Shake;
