// @flow

import { Animated } from 'react-native';
import BaseTrigger from './BaseTrigger';
import ScrollDriver from '../drivers/ScrollDriver';

type Props = {
  from: number,
  to: number,
  driver: ScrollDriver,
};

class ScrollPositionAnimation extends BaseTrigger {
  constructor(props: Props) {
    super(props);
    this.animators = [];
    this.from = props.from;
    this.to = props.to;
    this.driver = props.driver;
  }

  componentDidMount() {
    this.setState({
      propertiesToAppend: {
        driverValue: (this.from < this.to)
          ? this.driver.value.interpolate({
              inputRange: [this.from, this.to],
              outputRange: [0, 1],
            })
          : this.driver.value.interpolate({
            inputRange: [this.to, this.from],
            outputRange: [1, 0],
          }),
      }
    });
  }

  from: number;
  to: number;
  driver: ScrollDriver;
}

export default ScrollPositionAnimation;
