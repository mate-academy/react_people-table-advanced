import { Person } from '../../../types';
import { PersonItem } from '../PersonItem';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleSort } from '../../PeopleSort';
import { PeopleSortParams } from '../../../types/SortParams';
import { useEffect, useState } from 'react';
import { SortOrderValue } from '../../../constants/SortOrderValue';

interface Props {
  peopleList: Person[];
}

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [sortParams, setSortParams] = useState<PeopleSortParams>();

  const getCurrentOrder = (key: keyof Person) => {
    if (sortParams?.sortField === key) {
      return sortParams.sortOrder;
    }

    return null;
  };

  const sortedPeople = [...peopleList].sort((a, b) => {
    if (!sortParams?.sortField) {
      return 0;
    }

    const valueA = a[sortParams.sortField];
    const valueB = b[sortParams.sortField];

    if (valueA === undefined || valueB === undefined) {
      return 0;
    }

    let comparison = 0;

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      comparison = valueA.localeCompare(valueB);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      comparison = valueA - valueB;
    }

    return sortParams.sortOrder === SortOrderValue.ASC
      ? comparison
      : -comparison;
  });

  useEffect(() => {
    const newSortParams: PeopleSortParams = {
      sortField: searchParams.get('sort') as keyof Person,
      sortOrder: searchParams.get('order') as SortOrderValue,
    };

    setSortParams(newSortParams);
  }, [searchParams]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            Name
            <PeopleSort sortField="name" sortOrder={getCurrentOrder('name')} />
          </th>
          <th>
            Sex
            <PeopleSort sortField="sex" sortOrder={getCurrentOrder('sex')} />
          </th>
          <th>
            Born
            <PeopleSort sortField="born" sortOrder={getCurrentOrder('born')} />
          </th>
          <th>
            Died
            <PeopleSort sortField="died" sortOrder={getCurrentOrder('died')} />
          </th>
          <th>
            Mother
            <PeopleSort
              sortField="motherName"
              sortOrder={getCurrentOrder('motherName')}
            />
          </th>
          <th>
            Father
            <PeopleSort
              sortField="fatherName"
              sortOrder={getCurrentOrder('fatherName')}
            />
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            isActive={slug === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
