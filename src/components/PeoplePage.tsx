import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

type Props = {
  people: Person[],
};

export const PeoplePage: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  let visiblePeople = [...people];

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => (
      centuries.includes(Math.ceil(person.born / 100).toString())
    ));
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person => (
      [person.name, person.motherName || '', person.fatherName || '']
        .join('\n')
        .toLowerCase()
        .includes(lowerQuery)
    ));
  }

  if (sortField) {
    visiblePeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visiblePeople.reverse();
  }

  return (
    <>
      <h1 className="subtitle is-3">People page</h1>
      <PeopleFilters />
      <PeopleTable people={visiblePeople} />
    </>
  );
};
