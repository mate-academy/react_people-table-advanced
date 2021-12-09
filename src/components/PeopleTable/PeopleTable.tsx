import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback, useMemo } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { useHistory, useLocation } from 'react-router-dom';
import { PersonFull, SortByOptions } from '../../services/types';
import { PeopleTableHeaders } from './PeopleTableHeaders';
import { PeopleTableRow } from './PeopleTableRow/PeopleTableRow';
import {
  usePeopleTableSortCallback,
} from '../../services/hooks/usePeopleTableSortCallback';

interface Props {
  people: PersonFull[];
}

export const PeopleTable: FC<Props> = React.memo(({ people }) => {
  const history = useHistory();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // region nameFilter
  const query = searchParams.get('query') || '';

  const handleQueryChange = useCallback(
    (event) => {
      const { value } = event.target;

      searchParams.set('query', value);

      history.push({
        search: value
          ? searchParams.toString()
          : '',
      });
    },
    [],
  );

  const filteredPeople = useMemo(
    () => {
      const queryLowerCase = query.toLowerCase();

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
    [query],
  );
  // endregion nameFilter

  // region sortBy
  const sortBy = searchParams.get('sortBy');

  const sortCallback = usePeopleTableSortCallback(sortBy as SortByOptions);

  const handleSortByChange = useCallback(
    (event) => {
      const { value } = event.target;

      searchParams.set('sortBy', value);

      history.push({
        search: value
          ? searchParams.toString()
          : '',
      });
    },
    [],
  );

  const sortedPeople = sortBy
    ? [...filteredPeople].sort(sortCallback)
    : filteredPeople;
  // endregion sortBy

  return (
    <div className="container">
      <div className="field columns">
        <div className="container column is-one-fifth">
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

        <div className="container column is-one-fifth">
          <label className="label" htmlFor="sortBySelect">Sort By</label>
          <div className="select control">
            <select
              id="sortBySelect"
              onChange={handleSortByChange}
            >
              <option value="">Choose option</option>
              <option value={SortByOptions.Name}>Name</option>
              <option value={SortByOptions.Sex}>Sex</option>
              <option value={SortByOptions.Born}>Born</option>
              <option value={SortByOptions.Died}>Died</option>
            </select>
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
