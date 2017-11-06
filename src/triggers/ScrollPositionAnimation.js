// @flow

import { Animated } from 'react-native';
import BaseTrigger from './BaseTrigger';
import ScrollDriver from '../drivers/ScrollDriver';

type Props = {
  from: number,
  to: number,
  driver: ScrollDriver,
};

class ScrollingAnimation extends BaseTrigger {
  constructor(props: Props) {
    super(props);
    this.animators = [];
    this.from = props.from;
    this.to = props.to;
    this.driver = props.driver;
    this.propertiesToAppend = {
      driverValue: this.driver.value.interpolate({
        inputRange: [this.from, this.to],
        outputRange: [0, 1],
      })
    };
  }

  from: number;
  to: number;
  driver: ScrollDriver;
  interpolated: Animated.Interpolation;
  propertiesToAppend: Object;
}

export default ScrollingAnimation;
