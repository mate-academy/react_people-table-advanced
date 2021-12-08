import React, { FC, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PersonFull } from '../../services/types';
import { PeopleTableHeaders } from './PeopleTableHeaders';
import { PeopleTableRow } from './PeopleTableRow/PeopleTableRow';

interface Props {
  people: PersonFull[];
}

export const PeopleTable: FC<Props> = React.memo(({ people }) => {
  const history = useHistory();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

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

  const handleQueryChange = useCallback(
    (event) => {
      searchParams.set('query', event.target.value);
      history.push({
        search: searchParams.toString(),
      });
    },
    [],
  );

  return (
    <div className="container">
      <div className="columns">
        <input
          type="text"
          className="input column"
          placeholder="Type person name"
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <table className="table people-table">
        <PeopleTableHeaders />

        <tbody>
          {filteredPeople.map(person => (
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
