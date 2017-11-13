// @flow

import { Animated } from 'react-native';

import ManualTrigger from './ManualTrigger';
import type SwipeGesture from '../behaviors/SwipeGesture';

type Props = {
  getSourceRef: () => SwipeGesture,
};

class SwipingAnimation extends ManualTrigger {
  componentDidMount() {
    const source = this.props.getSourceRef();
    if (source) {
      this.setState({
        propertiesToAppend: {
          driverValue: source.progress
        }
      });
    }
  }
}

export default SwipingAnimation;
