/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink/PersonLink';
import { PeopleFilters } from '../components/PeopleFilters';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from '../components/SearchLink';
import { SortIcon } from '../components/SortIcon';

const sortFields: Array<'name' | 'sex' | 'born' | 'died'> = [
  'name',
  'sex',
  'born',
  'died',
];

export function PeoplePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const search = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  function getPersonSlug(userName: string | null) {
    return people.find(person => person.name === userName)?.slug;
  }

  function getVisiblePeople() {
    let result = [...people];

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (search) {
      const lowerSearch = search.toLowerCase().trim();

      result = result.filter(person => {
        const nameMatch = person.name.toLowerCase().includes(lowerSearch);
        const motherMatch =
          person.motherName?.toLowerCase().includes(lowerSearch) || false;
        const fatherMatch =
          person.fatherName?.toLowerCase().includes(lowerSearch) || false;

        return nameMatch || motherMatch || fatherMatch;
      });
    }

    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (sort) {
      result.sort((a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          case 'born':
          case 'died':
            return a[sort] - b[sort];
          default:
            return 0;
        }
      });

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  }

  const visiblePeople = getVisiblePeople();

  function getNextSortParams(field: string) {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (sort === field && order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length > 0 && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && people.length > 0 && (
                <>
                  {visiblePeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  {visiblePeople.length > 0 && (
                    <table
                      data-cy="peopleTable"
                      className="table is-striped is-hoverable is-narrow is-fullwidth"
                    >
                      <thead>
                        <tr>
                          {sortFields.map(field => (
                            <th key={field}>
                              <span className="is-flex is-flex-wrap-nowrap">
                                {field[0].toUpperCase() + field.slice(1)}
                                <SearchLink params={getNextSortParams(field)}>
                                  <SortIcon
                                    sortField={field}
                                    currentSort={sort}
                                    currentOrder={order}
                                  />
                                </SearchLink>
                              </span>
                            </th>
                          ))}
                          <th>Mother</th>
                          <th>Father</th>
                        </tr>
                      </thead>

                      <tbody>
                        {visiblePeople.map(person => {
                          const motherSlug = getPersonSlug(person.motherName);
                          const fatherSlug = getPersonSlug(person.fatherName);

                          return (
                            <tr
                              data-cy="person"
                              key={person.slug}
                              className={cn({
                                'has-background-warning': person.slug === slug,
                              })}
                            >
                              <td>
                                <PersonLink
                                  name={person.name}
                                  slug={person.slug}
                                  isRed={person.sex === 'f'}
                                />
                              </td>

                              <td>{person.sex}</td>
                              <td>{person.born}</td>
                              <td>{person.died}</td>
                              <td>
                                {person.motherName === null ? (
                                  '-'
                                ) : (
                                  <PersonLink
                                    name={person.motherName}
                                    slug={motherSlug}
                                    isRed={true}
                                  />
                                )}
                              </td>
                              <td>
                                {person.fatherName === null ? (
                                  '-'
                                ) : (
                                  <PersonLink
                                    name={person.fatherName}
                                    slug={fatherSlug}
                                    isRed={false}
                                  />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
