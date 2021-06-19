import React, { useCallback, useMemo, useState, useEffect } from 'react';
import {
  useLocation, useHistory, useRouteMatch,
  Switch, Route, Link,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import { getPeople, filterPeople } from '../../HelpTools/PreparePeople';
import { PeopleTable } from '../../components/PeopleTable';
import { NewPerson } from '../../components/NewPerson';

export const PeoplePage = () => {
  const [people, setPeople] = useState([]);
  const [addedPeople, setAddedPeople] = useState([]);

  useEffect(() => {
    getPeople().then(setPeople);
  }, []);

  const { path, url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const appliedQuery = searchParams.get('query') || '';
  const [sort, setSort] = useState({
    sortBy: '',
    sortOrder: '',
  });
  const [query, setQuery] = useState(appliedQuery);

  const setSearchParam = useCallback((searchParam, value) => {
    if (value) {
      searchParams.set(searchParam, value);
    } else {
      searchParams.delete(searchParam);
    }
  }, [searchParams]);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      setSearchParam('query', newQuery);

      history.push(`?${searchParams.toString()}`);
    }, 500),
    [setSearchParam],
  );

  useEffect(() => {
    setSearchParam('sortBy', sort.sortBy);
    setSearchParam('sortOrder', sort.sortOrder);
    history.push(`?${searchParams.toString()}`);
  }, [sort]);

  const filteredPeople = useMemo(() => (
    filterPeople([...people, ...addedPeople], appliedQuery)
  ), [people, appliedQuery, addedPeople]);

  const handleQueryChange = ({ target }) => {
    setQuery(target.value);
    applyQuery(target.value);
  };

  return (
    <>
      <h2 className="subtitle">People page</h2>
      <div className="block">
        <div className="control has-icons-right">
          <input
            className="input"
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Enter name for filter"
          />
          <span className="icon is-small is-right">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
      <Switch>
        <Route
          path={`${path}/new`}
        >
          <NewPerson people={people} setPeople={setAddedPeople} />
        </Route>
        <Route>
          <Link
            className="button is-primary"
            to={{
              pathname: `${path}/new`,
              search: location.search,
            }}
          >
            Add Person
          </Link>
        </Route>
      </Switch>
      <PeopleTable
        people={filteredPeople}
        onSort={setSort}
      />
    </>
  );
};
