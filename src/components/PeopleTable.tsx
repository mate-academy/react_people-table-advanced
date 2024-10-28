import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useMemo } from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const gender = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedOptions = ['Name', 'Sex', 'Born', 'Died'];

  const filteredPeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      filtered = filtered.filter(({ name, motherName, fatherName }) =>
        [name, motherName, fatherName].some(field =>
          field?.toLowerCase().includes(query)
        )
      );
    }

    if (gender) {
      filtered = filtered.filter(person => person.sex === gender);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => {
        const century = Math.floor(person.born / 100) + 1;
        return centuries.includes(century.toString());
      });
    }

    return filtered;
  }, [query, gender, centuries, people]);

  const sortedPeople = useMemo(() => {
    const sorted = [...filteredPeople].sort((personA, personB) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return personA[sort].localeCompare(personB[sort]);
        case 'born':
        case 'died':
          return personA[sort] - personB[sort];
        default:
          return 0;
      }
    });

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [filteredPeople, sort, order]);

  const toggleOrder = (sortName: string) => {
    if (sort === sortName) {
      return { sort: sortName, order: order === 'asc' ? 'desc' : 'asc' };
    }
    return { sort: sortName, order: 'asc' };
  };

  return !sortedPeople.length ? (
    <p>There are no people matching the current search criteria</p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortedOptions.map(option => (
            <th key={option}>
              <span className="is-flex is-flex-wrap-nowrap">
                {option}
                <SearchLink params={toggleOrder(option.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== option.toLowerCase(),
                        'fa-sort-up': sort === option.toLowerCase() && order === 'asc',
                        'fa-sort-down': sort === option.toLowerCase() && order === 'desc',
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            mother,
            fatherName,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  className={classNames({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </PersonLink>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink className="has-text-danger" person={mother}>
                    {motherName}
                  </PersonLink>
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father}>{fatherName}</PersonLink>
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
