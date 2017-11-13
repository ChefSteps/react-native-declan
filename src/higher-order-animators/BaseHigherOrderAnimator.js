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
  'delayBack',
  'driverValue',
];

class BaseHigherOrderAnimator extends ManualTrigger {
  componentDidMount() {
    this.updateProperties(this.props);
  }

  updateProperties = (props) => {
    const propsClone = pick(propWhitelist, props);
    this.setState({
      propertiesToAppend: {
        ...(this.state.propertiesToAppend || {}),
        ...(propsClone || {})
      }
    });
  }
}

export default BaseHigherOrderAnimator;
