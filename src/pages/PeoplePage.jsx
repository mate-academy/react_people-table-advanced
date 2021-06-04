import React, {
  useState, useEffect, useMemo, useCallback, useReducer,
} from 'react';
import {
  Link, Switch, Route,
  useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import '@fortawesome/fontawesome-free/css/all.css';

import { PeopleTable } from '../components/PeopleTable';
import { NewPerson } from '../components/NewPerson';
import { getPeople } from '../api';
import { filterPeople, sortPeople } from '../helpers/peopleHelpers';

function usePeople() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople()
      .then((response) => {
        setPeople(response.map(person => ({
          ...person,
          mother: response.find(
            ({ name }) => name === person.motherName,
          ) || null,
          father: response.find(
            ({ name }) => name === person.fatherName,
          ) || null,
        })));
      });
  }, []);

  return people;
}

function useSearchParams() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const updateSearchParams = (key, value) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }

    history.push({ search: searchParams.toString() });
  };

  return [searchParams, updateSearchParams];
}

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
        needSort: true,
        sortBy: action.sortBy,
        sortOrder: 'asc',
      };
    case 'SORT_ASC':
      return {
        ...state,
        needSort: false,
        sortOrder: 'asc',
      };
    case 'SORT_DESC':
      return {
        ...state,
        needSort: false,
        sortOrder: 'desc',
      };
    default:
      return state;
  }
}

export const PeoplePage = () => {
  const people = usePeople();
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
      type: 'FILTER',
      query: newQuery,
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
        type: 'SORT_BY',
        sortBy: column,
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
  ), [filteredPeople, state.needSort, state.sortBy]);

  const orderedPeople = useMemo(() => {
    if (state.needSort || !state.sortOrder) {
      return sortedPeople;
    }

    return sortedPeople.reverse();
  }, [sortedPeople, state.sortBy, state.sortOrder]);

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
          <NewPerson people={people} />
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
