import React, {
  useMemo, useCallback, useReducer,
} from 'react';
import {
  Link, Switch, Route,
  useLocation, useRouteMatch,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import '@fortawesome/fontawesome-free/css/all.css';

import { PeopleTable } from '../components/PeopleTable';
import { NewPerson } from '../components/NewPerson';
import { filterPeople, sortPeople } from '../helpers/peopleHelpers';
import { usePeople, useSearchParams } from '../helpers/hooks';

function peopleReducer(state, action) {
  switch (action.type) {
    case 'FILTER':
      return {
        ...state,
        query: action.query,
      };

    case 'SORT_BY':
      return {
        ...state,
        sortBy: action.sortBy,
        sortOrder: 'asc',
      };

    case 'SORT_ASC':
      return {
        ...state,
        sortOrder: 'asc',
      };

    case 'SORT_DESC':
      return {
        ...state,
        sortOrder: 'desc',
      };

    default:
      return state;
  }
}

export const PeoplePage = () => {
  const [people, setPeople] = usePeople();
  const [searchParams, updateSearchParams] = useSearchParams();

  const appliedQuery = searchParams.get('query') || '';
  const [state, dispatch] = useReducer(peopleReducer, {
    query: appliedQuery,
    sortBy: searchParams.get('sortBy') || '',
    sortOrder: searchParams.get('sortOrder') || '',
  });

  const applyQuery = useCallback(
    debounce((newQuery) => {
      updateSearchParams('query', newQuery);
    }, 500),
    [],
  );

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;

    dispatch({
      type: 'FILTER', query: newQuery,
    });
    applyQuery(newQuery);
  };

  const handleColumnClick = (column) => {
    if (state.sortBy === column) {
      const newSortOrder = (state.sortOrder === 'asc') ? 'desc' : 'asc';

      dispatch({ type: `SORT_${newSortOrder.toUpperCase()}` });
      updateSearchParams('sortOrder', newSortOrder);
    } else {
      dispatch({
        type: 'SORT_BY', sortBy: column,
      });
      updateSearchParams('sortBy', column);
      updateSearchParams('sortOrder', 'asc');
    }
  };

  const filteredPeople = useMemo(() => (
    filterPeople(people, appliedQuery)
  ), [people, appliedQuery]);

  const sortedPeople = useMemo(() => (
    sortPeople(filteredPeople, state.sortBy)
  ), [filteredPeople, state.sortBy]);

  const orderedPeople = useMemo(() => {
    if (state.sortOrder === 'desc') {
      return [...sortedPeople].reverse();
    }

    return sortedPeople;
  }, [sortedPeople, state.sortOrder]);

  const { path, url } = useRouteMatch();
  const { search } = useLocation();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="field">
        <div className="control has-icons-left">
          <input
            type="text"
            className="input"
            value={state.query}
            onChange={handleQueryChange}
            placeholder="Enter person's name"
          />

          <span className="icon is-left">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>

      <Switch>
        <Route path={`${path}/new`}>
          <NewPerson
            people={people}
            onAddPerson={person => setPeople([...people, person])}
          />
        </Route>

        <Route>
          <div className="field">
            <Link
              className="button is-primary"
              to={{
                pathname: `${url}/new`,
                search,
              }}
            >
              Add a Person
            </Link>
          </div>
        </Route>
      </Switch>

      <PeopleTable
        people={orderedPeople}
        sortedBy={state.sortBy}
        sortOrder={state.sortOrder}
        onColumnClick={handleColumnClick}
      />
    </>
  );
};
