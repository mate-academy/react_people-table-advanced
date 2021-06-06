import React, {
  useMemo, useCallback, useReducer,
} from 'react';
import {
  Link, Switch, Route,
  useLocation, useRouteMatch, useHistory,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import '@fortawesome/fontawesome-free/css/all.css';

import { PeopleTable } from '../components/PeopleTable';
import { NewPerson } from '../components/NewPerson';
import { filterPeople, sortPeople } from '../helpers/peopleHelpers';
import { usePeople } from '../helpers/hooks';
import { peopleReducer, actions } from '../reducers/peopleReducer';

export const PeoplePage = () => {
  const [people, setPeople] = usePeople();

  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const appliedQuery = searchParams.get('query') || '';
  const [state, dispatch] = useReducer(peopleReducer, {
    query: appliedQuery,
    sortBy: searchParams.get('sortBy') || '',
    sortOrder: searchParams.get('sortOrder') || '',
  });

  const updateSearchParams = useCallback((key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    history.push({ search: searchParams.toString() });
  }, []);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      updateSearchParams('query', newQuery);
    }, 500),
    [],
  );

  const handleQueryChange = (e) => {
    const newQuery = e.target.value;

    dispatch(actions.filter(newQuery));
    applyQuery(newQuery);
  };

  const handleColumnClick = (column) => {
    if (state.sortBy === column) {
      const newSortOrder = (state.sortOrder === 'asc') ? 'desc' : 'asc';

      dispatch(actions.sortOrder(newSortOrder));
      updateSearchParams('sortOrder', newSortOrder);
    } else {
      dispatch(actions.sortBy(column));
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
