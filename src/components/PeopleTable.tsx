/* eslint-disable jsx-a11y/control-has-associated-label */
// import { useState } from 'react';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';
import { SortLink } from './SortLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  // const [sortColumn, setSortColumn] = useState('');
  // const sortColumn = searchParams.get('name') || '';
  // const [isReversed, setIsReversed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const preparedPeople = people.map(person => ({
    ...person,
    mother: people.find(
      personElement => personElement.name === person.motherName,
    ),
    father: people.find(
      personElement => personElement.name === person.fatherName,
    ),
  }));

  const sortBy = (columnName: string) => {
    const firstClick = columnName !== sortColumn;
    const secondClick = columnName === sortColumn && !isReversed;
    const thirdClick = columnName === sortColumn && isReversed;

    if (firstClick) {
      const params = new URLSearchParams(searchParams);

      params.set('sort', columnName);
      // params.delete('order');
      setSearchParams(params);
      sortBy(columnName);
    }

    if (secondClick) {
      const params = new URLSearchParams(searchParams);

      params.set('order', 'desc');
      setSearchParams(params);
      sortBy(columnName);
    }

    if (thirdClick) {
      const params = new URLSearchParams(searchParams);

      params.delete('sort');
      params.delete('order');

      setSearchParams(params);
      sortBy(columnName);
    }
  };

  if (sortColumn) {
    preparedPeople.sort((personA, personB) => {
      switch (sortColumn) {
        case 'Name':
          return personA.name.localeCompare(personB.name);
        case 'Sex':
          return personA.sex.localeCompare(personB.sex);
        case 'Born':
          return personA.born - personB.born;
        case 'Died':
          return personA.died - personB.died;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedPeople.reverse();
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={{ sort: 'name' }}>
                <SortLink
                  isActive={sortColumn === 'Name'}
                  isReversed={isReversed}
                  onClick={() => sortBy('Name')}
                />
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ sort: 'sex' }}>
                <SortLink
                  isActive={sortColumn === 'Sex'}
                  isReversed={isReversed}
                  onClick={() => sortBy('Sex')}
                />
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ sort: 'born' }}>
                <SortLink
                  isActive={sortColumn === 'Born'}
                  isReversed={isReversed}
                  onClick={() => sortBy('Born')}
                />
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={{ sort: 'died' }}>
                <SortLink
                  isActive={sortColumn === 'Died'}
                  isReversed={isReversed}
                  onClick={() => sortBy('Died')}
                />
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
