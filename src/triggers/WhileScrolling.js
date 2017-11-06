// @flow

import ManualTrigger from './ManualTrigger';
import ScrollDriver, {
  type ScrollDirection,
} from '../drivers/ScrollDriver';

type Direction = 'up' | 'down' | 'either';

type Props = {
  direction: Direction,
  driver: ScrollDriver,
};

class WhileScrolling extends ManualTrigger {
  constructor(props: Props) {
    super();
    this.animators = [];
    this.direction = props.direction;
    this.driver = props.driver;
    this.driver.scrollDirectionEmitter.addListener(
      'directionChanged',
      (newDirection: ScrollDirection) => {
        if (newDirection === 'NONE') {
          this.stop();
        } else if (this.direction === 'either') {
          this.start();
        } else if (this.direction === 'up' && newDirection === 'UP') {
          this.start();
        } else if (this.direction === 'down' && newDirection === 'DOWN') {
          this.start();
        } else {
          this.stop();
        }
      },
    );
  }

  direction: Direction;
  driver: ScrollDriver;
}

export default WhileScrolling;
