import { useEffect, useReducer } from 'react';
import { peopleInitialState, peopleReducer } from '../reducers/peopleReducer';
import { getPeople } from '../api';

export const usePeople = () => {
  const [peopleState, peopleDispatch] = useReducer(
    peopleReducer,
    peopleInitialState,
  );

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        peopleDispatch({ type: 'FETCH_START' });

        const peopleResponse = await getPeople();

        peopleDispatch({ type: 'FETCH_SUCCESS', payload: peopleResponse });
      } catch {
        peopleDispatch({ type: 'FETCH_ERROR' });
      }
    };

    fetchPeople();
  }, []);

  return peopleState;
};
