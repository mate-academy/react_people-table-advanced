import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectors, actions } from '../store';

type Props = {
  title: string;
  message: string;
};

export const Finish: React.FC<Props> = ({ title, message }) => {
  // it is a link to `store.dispatch` method
  const dispatch = useDispatch();
  const loading = useSelector(selectors.isLoading);

  const handleClick = () => {
    // action creator returns an action that must be dispatched
    // { type: 'FINISH_LOADING', message: 'some text' }
    dispatch(
      actions.finishLoading(message),
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!loading}
    >
      {title}
    </button>
  );
};
