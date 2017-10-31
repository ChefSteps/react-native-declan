// @flow

import React, { Component } from 'react';
import { Animated } from 'react-native';
import { reduce, mergeDeepWithKey, concat } from 'ramda';

type State = {
  styleTransformations: Object[],
};

const concatTransforms = (k, l, r) => {
  if (k === 'transform') {
    return concat(l, r);
  }
  return r;
};

class AnimatableView extends Component<any, any, State> {
  state: State = {
    styleTransformations: [],
  };

  registerAnimationTransformation(transformation: Object) {
    const newTransformations = this.state.styleTransformations;
    newTransformations.push(transformation);
    this.setState({
      styleTransformations: newTransformations,
    });
  }

  render() {
    const { style } = this.props;
    return (
      <Animated.View
        style={reduce(mergeDeepWithKey(concatTransforms), {}, [
          style,
          ...this.state.styleTransformations,
        ])}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default AnimatableView;
