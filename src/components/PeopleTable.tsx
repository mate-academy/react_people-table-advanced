// /* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types/Person';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SearchLink } from '../components/SearchLink';
import cn from 'classnames';
import { useCallback } from 'react';

interface PeopleTableProps {
  persons: Person[];

  sortField: string | null;
  sortOrder: 'asc' | 'desc' | null;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  persons,
  sortField,
  sortOrder,
}) => {
  const findPersonByName = (name: string | null) => {
    return persons.find(p => p.name === name);
  };

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    const storedSlug = searchParams.get('selectedPerson');

    if (storedSlug) {
      const selectPerson = persons.find(person => person.slug === storedSlug);

      setSelectedPerson(selectPerson || null);
    }

    if (slug) {
      const selectedPersonSlug = persons.find(person => person.slug === slug);

      setSelectedPerson(selectedPersonSlug || null);
    }
  }, [persons, searchParams, slug]);

  const getSortParams = useCallback(
    (sortBy: string) => {
      if (sortBy === sortField) {
        if (!sortOrder) {
          return { sort: sortBy, order: 'desc' };
        }

        if (sortOrder === 'desc') {
          return { sort: null, order: null };
        }
      }

      return { sort: sortBy, order: null };
    },
    [sortField, sortOrder],
  );

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      { 'fa-sort': sortField !== 'name' },
                      {
                        'fa-sort-up':
                          sortField === 'name' && sortOrder === 'asc',
                      },
                      {
                        'fa-sort-down':
                          sortField === 'name' && sortOrder === 'desc',
                      },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i
                    className={cn(
                      'fas',
                      { 'fa-sort': sortField !== 'sex' },
                      {
                        'fa-sort-up':
                          sortField === 'sex' && sortOrder === 'asc',
                      },
                      {
                        'fa-sort-down':
                          sortField === 'sex' && sortOrder === 'desc',
                      },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortField !== 'born',
                      'fa-sort-up': sortField === 'born' && sortOrder === 'asc',
                      'fa-sort-down':
                        sortField === 'born' && sortOrder === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortField !== 'died',
                      'fa-sort-up': sortField === 'died' && sortOrder === 'asc',
                      'fa-sort-down':
                        sortField === 'died' && sortOrder === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons?.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              data-cy="person"
              className={
                selectedPerson?.slug === person.slug
                  ? 'has-background-warning'
                  : ''
              }
              key={person.slug}
            >
              <td>
                <Link
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  to={`/people/${person.slug}`}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    className={'has-text-danger'}
                    to={`/people/${mother.slug}`}
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  <p>{person.motherName || '-'}</p>
                )}
              </td>
              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
                ) : (
                  <p>{person.fatherName || '-'}</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
