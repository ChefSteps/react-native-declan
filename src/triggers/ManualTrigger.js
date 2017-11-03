// @flow

import uuid from 'uuid';

import AnimatableView from '../components/AnimatableView';
import BaseTrigger from './BaseTrigger';
import { Animator, type AnimatedValue } from '../types';

class ManualTrigger extends BaseTrigger implements Animator {
  id: string;
  target: ?AnimatableView;
  value: AnimatedValue;

  constructor(props) {
    super(props);
    this.id = uuid.v4();
    this.target = null;
  }

  start() {
    this.animators.forEach(({ ref }) => {
      ref.start();
    });
  }

  stop() {
    this.animators.forEach(({ ref }) => {
      ref.stop();
    });
  }

  reset() {
    this.animators.forEach(({ ref }) => {
      ref.reset();
    });
  }
}

export default ManualTrigger;
