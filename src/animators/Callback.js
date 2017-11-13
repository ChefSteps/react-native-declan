// @flow

import BaseAnimator from './BaseAnimator';

type State = {};

type Props = {
  action: () => any,
};

class Callback extends BaseAnimator<any, Props, State> {
  state: {};
  start = () => this.props.action && this.props.action();
  stop = () => {};
}

export default Callback;
