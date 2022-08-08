import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../store';

type Props = {
  title: string;
};

export const Start: React.FC<Props> = ({ title }) => {
  // it is a link to `store.dispatch` method
  const dispatch = useDispatch();
  const loading = useSelector(selectors.isLoading);

  return (
    <button
      type="button"
      onClick={() => {
        // startLoading is an action creator so it just returns an action object
        const action = actions.startLoading();

        // so we need to dispatch a created action to apply it
        dispatch(action);

        // it can be written in 1 line, () are important, as we must run action creator
        // dispatch(actions.startLoading());
      }}
      disabled={loading}
    >
      {title}
    </button>
  );
};
