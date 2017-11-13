// @flow

import BaseAnimator from './BaseAnimator';

type State = {};

type Props = {
  message: string,
};

class DebugAction extends BaseAnimator<any, Props, State> {
  state: {};
  start = () => console.log(this.props.message);
  stop = () => {};
}

export default DebugAction;
