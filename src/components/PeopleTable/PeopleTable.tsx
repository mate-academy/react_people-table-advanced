import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { useLocation } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { PersonFull, SortByOptions, SortType } from '../../services/types';
import { PeopleTableRow } from './PeopleTableRow/PeopleTableRow';
import {
  usePeopleTableSortCallback,
} from '../../services/hooks/usePeopleTableSortCallback';
import { PeopleTableHeaders } from './PeopleTableHeaders';
import { useQueryChanger } from '../../services/hooks/useQueryChanger';

interface Props {
  people: PersonFull[];
}

export const PeopleTable: FC<Props> = React.memo(({ people }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // region nameFilter
  const appliedQuery = searchParams.get('query') || '';

  const [query, setQuery] = useState(appliedQuery);

  const changeQuery = useQueryChanger();
  const debouncedChangeQuery = useCallback(
    debounce((newQuery: string) => changeQuery(newQuery), 500),
    [],
  );

  const handleQueryChange = useCallback(
    (event) => {
      const { value } = event.target;

      setQuery(value);
      debouncedChangeQuery(value);
    },
    [],
  );

  const filteredPeople = useMemo(
    () => {
      const queryLowerCase = appliedQuery.toLowerCase();

      return people.filter((person) => {
        const fields = [
          person.name || '',
          person.fatherName || '',
          person.motherName || '',
        ];

        return fields.some(
          field => field.toLowerCase().includes(queryLowerCase),
        );
      });
    },
    [appliedQuery],
  );
  // endregion nameFilter

  // region sortBy
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');

  const sortCallback = usePeopleTableSortCallback(
    sortBy as SortByOptions,
  );

  const sortedPeople = sortBy
    ? [...filteredPeople].sort(sortCallback)
    : [...filteredPeople];

  if (sortOrder === SortType.Desc) {
    sortedPeople.reverse();
  }
  // endregion sortBy

  return (
    <div className="container">
      <div className="field columns">
        <div className="container column is-4">
          <label className="label" htmlFor="nameInput">Name</label>
          <div className="control has-icons-right">
            <input
              type="search"
              className="input"
              placeholder="Type person name"
              value={query}
              onChange={handleQueryChange}
              id="nameInput"
            />
            <span className="icon is-right is-small has-text-link">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>

        <div className="column" />
      </div>

      <table className="table people-table">
        <PeopleTableHeaders />

        <tbody>
          {sortedPeople.map(person => (
            <PeopleTableRow
              person={person}
              key={person.slug}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
