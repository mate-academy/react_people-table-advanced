import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortLink } from '../SortLink';
import { PersonItem } from '../PersonItem';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortColumn = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const getSortedList = (
    peopleList: Person[],
    sortParam: string,
    sortType: string | null,
  ) => {
    return peopleList.sort((a: Person, b: Person) => {
      switch (sortParam) {
        case 'name':
        case 'sex':
          return sortType
            ? b[sortParam].localeCompare(a[sortParam])
            : a[sortParam].localeCompare(b[sortParam]);

        case 'born':
        case 'died':
          return sortType
            ? b[sortParam] - a[sortParam]
            : a[sortParam] - b[sortParam];

        default:
          return 0;
      }
    });
  };

  const sortedPeople = () => {
    const sortedList = [...people];

    getSortedList(sortedList, sortColumn, sortOrder);

    return sortedList;
  };

  return (
    <table
      data-cy="peopleTable"
      className="
      table
      is-striped
      is-hoverable
      is-narrow
      is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortLink
              column="Name"
            />
          </th>

          <th>
            <SortLink
              column="Sex"
            />
          </th>

          <th>
            <SortLink
              column="Born"
            />
          </th>

          <th>
            <SortLink
              column="Died"
            />
          </th>

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople().map(person => (
          <PersonItem
            people={people}
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
