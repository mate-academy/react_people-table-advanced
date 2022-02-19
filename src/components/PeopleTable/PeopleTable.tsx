import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
// Components
import { PersonRow } from '../PersonRow/PersonRow';
// Types
import { Person } from '../../types/Person/Person';

type Props = {
  people: Person[];
  getUpdatedPeople: (peopleArr: Person[]) => Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, getUpdatedPeople }) => {
  const [searchParams] = useSearchParams();
  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(appliedQuery);
  const history = useNavigate();
  const sortBy = searchParams.get('sortBy');
  const sortOrder = searchParams.get('sortOrder');
  const selectedPersonUrl = useParams().slug;
  let visiblePeople = [...people];

  if (appliedQuery) {
    visiblePeople = visiblePeople.filter(({ name, motherName, fatherName }) => {
      return name.toLowerCase().includes(appliedQuery)
        || motherName?.toLowerCase().includes(appliedQuery)
        || fatherName?.toLowerCase().includes(appliedQuery);
    });

    visiblePeople = getUpdatedPeople(visiblePeople);
  }

  if (sortBy) {
    visiblePeople = visiblePeople.sort((firstPerson, secondPerson) => {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return sortOrder === 'asc'
            ? firstPerson[sortBy].localeCompare(secondPerson[sortBy])
            : secondPerson[sortBy].localeCompare(firstPerson[sortBy]);

        case 'born':
        case 'died':
          return sortOrder === 'asc'
            ? +firstPerson[sortBy] - +secondPerson[sortBy]
            : +secondPerson[sortBy] - +firstPerson[sortBy];

        default:
          return 0;
      }
    });
  }

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

  const queryHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;

    setQuery(value);
    applyQuery(value);
  };

  const sortHandler: MouseEventHandler<HTMLTableHeaderCellElement> = (e) => {
    const value = e.currentTarget.textContent?.toLowerCase().replace('*', '');

    if (value) {
      searchParams.set('sortBy', value);
    }

    if (sortOrder === 'asc') {
      searchParams.set('sortOrder', 'desc');
    } else {
      searchParams.set('sortOrder', 'asc');
    }

    history(`?${searchParams.toString()}`);
  };

  return (
    <>
      <input
        type="search"
        name="searsh"
        value={query || ''}
        placeholder="Enter name"
        onChange={queryHandler}
      />

      <table className="PeopleTable">
        <thead>
          <tr className="PeopleTable__Header">
            <th
              className="PeopleTable__Title PeopleTable__Title--sort"
              onClick={sortHandler}
            >
              {sortBy === 'name' ? 'Name*' : 'Name'}
            </th>

            <th
              className="PeopleTable__Title PeopleTable__Title--sort"
              onClick={sortHandler}
            >
              {sortBy === 'sex' ? 'Sex*' : 'Sex'}
            </th>

            <th
              className="PeopleTable__Title PeopleTable__Title--sort"
              onClick={sortHandler}
            >
              {sortBy === 'born' ? 'Born*' : 'Born'}
            </th>

            <th
              className="PeopleTable__Title PeopleTable__Title--sort"
              onClick={sortHandler}
            >
              {sortBy === 'died' ? 'Died*' : 'Died'}
            </th>

            <th className="PeopleTable__Title">Mother</th>

            <th className="PeopleTable__Title">Father</th>
          </tr>
        </thead>

        <tbody>
          {visiblePeople.map(person => {
            const personUrl = `${person.name.toLowerCase().replace(/ /g, '-')}-${person.born}`;

            return (
              <tr
                key={person.name}
                className={classNames(
                  'PeopleTable__Person',
                  { 'PeopleTable__Person--selected': personUrl === selectedPersonUrl },
                )}
              >
                <PersonRow person={person} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
