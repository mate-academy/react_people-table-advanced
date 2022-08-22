import {
  ChangeEvent, FC, useCallback, useMemo, useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow';
import { SortBy } from '../../types/SortBy';

import './PeopleTable.scss';
import { filterPeople, sortPeople } from '../../helpers';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';
  const [inputQuery, setInputQuery] = useState(appliedQuery);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const applyQuery = useCallback(
    debounce((query: string) => {
      if (query || sortBy || sortOrder) {
        setSearchParams({ query, sortBy, sortOrder });
      } else {
        setSearchParams({});
      }
    }, 500),
    [],
  );

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSortChange = (sortByQuery: SortBy | '') => {
    let appliedSortOrder = sortOrder;

    if (sortBy !== sortByQuery) {
      appliedSortOrder = 'desc';
    }

    setSearchParams({
      query: appliedQuery,
      sortBy: sortByQuery,
      sortOrder: appliedSortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  const visiblePeople = useMemo(() => {
    const filtered = filterPeople(people, appliedQuery);

    return sortPeople(filtered, sortOrder, sortBy);
  }, [appliedQuery, sortBy, sortOrder]);

  return (
    <>
      <div className="is-flex is-align-items-center">
        Filter:
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={inputQuery}
          onChange={handleQueryChange}
        />
      </div>

      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {['Name', 'Sex', 'Born', 'Died'].map(head => (
              <th
                key={head}
                className={classNames(
                  'PeopleTable__header-row sort-arrow', {
                    [`sort-arrow--${sortOrder}`]: sortBy === head.toLowerCase(),
                  },
                )}
                onClick={() => handleSortChange(head.toLowerCase() as SortBy)}
              >
                {head}
              </th>
            ))}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => (
            <PersonRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </>
  );
};
