// @flow

import { Animated } from 'react-native';

import BaseAnimator from './BaseAnimator';
import { type Animator } from '../types';

class CompositeAnimator<D, P, S> extends BaseAnimator<D, P, S> {
  static defaultProps: $Abstract<D>;
  state: $Abstract<S>;
  props: P;

  controller: ?Animator;

  getAnimationTransformation = () => ({});

  start() {
    if (this.controller) {
      this.controller.reset();
      this.controller.start();
    }
  }

  stop() {
    if (this.controller) {
      this.controller.stop();
    }
  }

  reset = () => {
    if (this.controller) {
      this.controller.reset();
    }
  };
}

export default CompositeAnimator;
