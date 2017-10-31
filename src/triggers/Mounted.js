// @flow

import BaseTrigger from './BaseTrigger';

class Mounted extends BaseTrigger {
  componentDidMount() {
    this.animators.forEach(({ ref }) => {
      ref.start();
    });
  }
}

export default Mounted;
