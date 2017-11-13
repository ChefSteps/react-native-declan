// @flow

import { contains } from 'ramda';
import ManualTrigger from './ManualTrigger';
import type SwipeGesture from '../behaviors/SwipeGesture';

export const SwipedHow = {
  toActive: 'toActive',
  toInactive: 'toInactive',
  toEither: 'toEither',
};

type Props = {
  how: $Keys<typeof SwipedHow>,
  getSourceRef: () => SwipeGesture,
};

class Swiped extends ManualTrigger {
  componentDidMount() {
    const source = this.props.getSourceRef();
    if (source) {
      source.swipeStateEmitter.on('isActive', (isActive) => {
        if (isActive && contains(this.props.how, ['toActive', 'toEither'])) {
          this.start();
        }
        if (!isActive && contains(this.props.how, ['toInactive', 'toEither'])) {
          this.start();
        }
      });
    }
  }
}

Swiped.defaultProps = {
  how: 'toActive',
};

export default Swiped;
