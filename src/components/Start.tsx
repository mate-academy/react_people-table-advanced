import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, isLoading, startLoading } from '../store';

/**
 * mapState - is a function receiving full Redux state as the first argument
 * and returning an object with extra props that will be added to a component
 * after calling connect(mapState)(MyComponent)
 *
 * @param {object} state - full Redux state
 *
 * @return {object}
 */
const mapState = (state: RootState) => {
  return {
    loading: isLoading(state), // we use a selector `isLoading` defined in the store
  };
};

/**
 * We use an object syntax for `mapDispatch` where
 * `load` - is a callback name passed to the component as a prop
 * `startLoading` - is an action creator defined in the store
 */
const mapDispatch = {
  load: startLoading,
};

/**
 * We split the connect(mapState, mapDispatch)(MyComponent) into 2 parts
 * to be able to use `typeof connector` for `MyComponent` props
 */
const connector = connect(mapState, mapDispatch);

/**
 * We use ConnectedProps<typeof connector> to get the type for all the extra
 * props received from `mapState` and `mapDispatch`
 */
type Props = ConnectedProps<typeof connector> & {
  title: string; // a regular prop passed like <Start title="Start loading" />
};

const Start: React.FC<Props> = ({ load, loading, title }) => {
  return (
    <button
      type="button"
      onClick={load}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default connector(Start);
