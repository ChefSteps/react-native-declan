// @flow

import ManualTrigger from './ManualTrigger';
import ScrollDirectionDriver, {
  type ScrollDirection,
} from '../drivers/ScrollDirectionDriver';

type Direction = 'up' | 'down' | 'either';

type Props = {
  direction: Direction,
  driver: ScrollDirectionDriver,
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
  driver: ScrollDirectionDriver;
}

export default WhileScrolling;
