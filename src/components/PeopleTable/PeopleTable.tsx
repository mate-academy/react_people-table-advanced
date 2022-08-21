import {
  ChangeEvent, FC, useCallback, useMemo, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { Person } from '../../types';
import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const navigation = useNavigate();
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  // const [sortedBy, setSortedBy] = useState('');
  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      navigation(`?${searchParams}`, { replace: true });
    }, 500),
    [pathname],
  );

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const visiblePeople = useMemo(() => {
    const lowerQuery = appliedQuery.toLowerCase();

    return people.filter(({ name, motherName, fatherName }) => (
      (name + motherName + fatherName).toLowerCase().includes(lowerQuery)
    ));
  }, [appliedQuery]);

  return (
    <>
      <div className="is-flex is-align-items-center">
        Filter:
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
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
