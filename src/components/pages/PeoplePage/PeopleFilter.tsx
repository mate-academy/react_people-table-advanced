import React, { useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { usePeople } from '../../hooks/usePeople';

export const PeopleFilter: React.FC = () => {
  const { people, setPeople } = usePeople();
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  const nameQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(nameQuery);

  setPeople(
    people.filter((person: Person) => (
      person.name.toLowerCase().includes(nameQuery)
      || person.fatherName?.toLowerCase().includes(nameQuery)
      || person.motherName?.toLowerCase().includes(nameQuery))),
  );

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery.toLowerCase().trimLeft());
      } else {
        searchParams.delete('query');
      }

      history(`?${searchParams.toString()}`);
    }, 500),
    [],
  );

  return (
    <p className="control has-icons-left">
      <input
        type="search"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
        placeholder="Find a person"
        className="input"
        style={{ width: '260px' }}
      />
      <span className="icon is-small is-left">
        <i className="fas fa-search" />
      </span>
    </p>
  );
};
