import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';

import {
  useSearchParams, Link, useLocation,
} from 'react-router-dom';
import { debounce } from 'lodash';
import './PeoplePage.scss';
import { PeopleContext } from '../PeopleContext';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage:React.FC = () => {
  const { people, setVisiblePeople } = useContext(PeopleContext);
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      setSearchParams(searchParams);
    }, 500),
    [searchParams],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  useEffect(() => {
    if (appliedQuery) {
      setVisiblePeople(people.filter(
        person => person.name.toLowerCase().includes(appliedQuery.toLowerCase())
          || person.motherName?.toLowerCase().includes(
            appliedQuery.toLowerCase(),
          )
          || person.fatherName?.toLowerCase().includes(
            appliedQuery.toLowerCase(),
          ),
      ));
    } else {
      setVisiblePeople(people);
    }
  }, [people, appliedQuery]);

  return (
    <div className="people-page">
      <h1 className="people-page__title">People Page</h1>
      <input
        type="text"
        className="people-page__search"
        placeholder="Enter a name"
        value={query}
        onChange={handleQueryChange}
      />
      <Link className="people-page__link" to="/people/new">Add person</Link>
      <PeopleTable />
    </div>
  );
};
