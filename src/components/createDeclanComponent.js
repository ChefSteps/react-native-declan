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

export default (WrappedComponent) => {

  return class DeclanComponent extends Component<any, any, State> {
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
        <WrappedComponent
          {...this.props}
          style={reduce(mergeDeepWithKey(concatTransforms), {}, [
            style,
            ...this.state.styleTransformations,
          ])}
        >
          {this.props.children}
        </WrappedComponent>
      );
    }
  }

}
