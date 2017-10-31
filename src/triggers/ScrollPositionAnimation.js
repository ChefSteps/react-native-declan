// @flow

import { Animated } from 'react-native';
import BaseTrigger from './BaseTrigger';
import ScrollPositionDriver from '../drivers/ScrollPositionDriver';

type Props = {
  from: number,
  to: number,
  driver: ScrollPositionDriver,
};

class ScrollingAnimation extends BaseTrigger {
  constructor(props: Props) {
    super(props);
    this.animators = [];
    this.from = props.from;
    this.to = props.to;
    this.driver = props.driver;
    this.propertiesToAppend = {
      driverValue: this.driver.value,
      driverInputRange: [this.from, this.to],
    };
  }

  from: number;
  to: number;
  driver: ScrollPositionDriver;
  interpolated: Animated.Interpolation;
  propertiesToAppend: Object;
}

export default ScrollingAnimation;
