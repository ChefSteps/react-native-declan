// @flow

import React, { Component } from 'react';
import { Animated } from 'react-native';
import { values, reduce, mergeDeepWithKey, concat } from 'ramda';

type State = {
  styleTransformations: {
    [string]: Object,
  }
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
      styleTransformations: {},
    };

    registerAnimationTransformation(id: string, transformation: Object) {
      const newTransformations = this.state.styleTransformations;
      newTransformations[id] = transformation;
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
            ...(values(this.state.styleTransformations)),
          ])}
        >
          {this.props.children}
        </WrappedComponent>
      );
    }
  }

}
