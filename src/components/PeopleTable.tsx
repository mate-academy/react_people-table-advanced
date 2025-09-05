import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

// wstaw tutaj swoje obecne dane osób
const peopleData: Person[] = [
  {
    name: 'Pieter Haverbeke',
    sex: 'm',
    born: 1602,
    died: 1642,
    fatherName: 'Lieven van Haverbeke',
    motherName: null,
    slug: 'pieter-haverbeke-1602',
  },
  {
    name: 'Anna van Hecke',
    sex: 'f',
    born: 1607,
    died: 1670,
    fatherName: 'Paschasius van Hecke',
    motherName: 'Martijntken Beelaert',
    slug: 'anna-van-hecke-1607',
  },
  // ... dodaj resztę osób analogicznie
];

export const PeopleTable: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedPeople = [...peopleData].sort((a: Person, b: Person) => {
    if (!sortField) {
      return 0;
    }

    const aValue = a[sortField as keyof Person];
    const bValue = b[sortField as keyof Person];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    return 0;
  });

  if (order === 'desc') {
    sortedPeople.reverse();
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
              <SearchLink
                params={{
                  sort: 'name',
                  order: order === 'asc' ? 'desc' : 'asc',
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: 'sex',
                  order: order === 'asc' ? 'desc' : 'asc',
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: 'born',
                  order: order === 'asc' ? 'desc' : 'asc',
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: 'died',
                  order: order === 'asc' ? 'desc' : 'asc',
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map((person: Person) => (
          <tr key={person.slug} data-cy="person">
            <td>
              <a href={`#/people/${person.slug}`}>{person.name}</a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName}</td>
            <td>{person.fatherName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
