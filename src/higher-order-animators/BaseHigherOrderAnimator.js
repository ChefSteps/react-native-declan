// @flow

import { pick } from 'ramda';
import ManualTrigger from '../triggers/ManualTrigger';

const propWhitelist = [
  'getTargetRef',
  'x',
  'y',
  'initialValue',
  'value',
  'duration',
  'easing',
  'delay',
  'durationBack',
  'easingBack',
  'delayBack'
];

class BaseHigherOrderAnimator extends ManualTrigger {
  constructor(props) {
    super(props);
    console.log('BaseHigherOrderAnimator');
    const propsClone = pick(propWhitelist, props);

    this.propertiesToAppend = {
      ...(this.propertiesToAppend || {}),
      ...(propsClone || {})
    };
  }
}

export default BaseHigherOrderAnimator;
