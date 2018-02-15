// @flow

import React, { Component, Children } from 'react';
import { View } from 'react-native';
import { equals } from 'ramda';
import { Animator } from '../types';
import EventEmitter from 'eventemitter3';

class BaseTrigger<D, P: any, S> extends Component<D, P, S> {
  static defaultProps: $Abstract<D>;
  state: $Abstract<S> & {
    propertiesToAppend: {},
  } = {
    propertiesToAppend: {},
  };
  props: P & {
    children: typeof Children,
  };

  animators: Array<{
    ref: Animator,
    events: EventEmitter,
  }> = [];

  shouldComponentUpdate(nextProps, nextState) {
    return !equals(this.state.propertiesToAppend, nextState.propertiesToAppend);
  }

  cloneAnimator = (animator: React.Element<*>, index: number) => {
    const events = new EventEmitter();
    return React.cloneElement(animator, {
      ...(this.state.propertiesToAppend || {}),
      // eslint-disable-next-line react/no-array-index-key
      key: index,
      ref: ref => {
        this.animators[index] = {
          ref,
          events,
        };
        if (animator.ref) {
          animator.ref(ref);
        }
      },
      onFinish: ({ finished }) => {
        if (animator.props.onFinish) {
          animator.props.onFinish({ finished });
        }
        events.emit('finish', { finished });
      },
      onFinishBack: ({ finished }) => {
        if (animator.props.onFinishBack) {
          animator.props.onFinishBack({ finished });
        }
        events.emit('finish_back', { finished });
      },
    });
  };

  processChildren() {
    if (Children.count(this.props.children) > 1) {
      return this.props.children.map(this.cloneAnimator);
    } else if (Children.count(this.props.children) === 1) {
      const child = Children.only(this.props.children);
      return this.cloneAnimator(child, 0);
    }
    return null;
  }

  render() {
    return <View>{this.processChildren()}</View>;
  }
}

export default BaseTrigger;
