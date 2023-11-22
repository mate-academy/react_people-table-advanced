/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import { Person } from '../types';

import { getPeople } from '../api';

import { PeopleFilters } from './PeopleFilters';
import { TableRow } from './TableRow';
import { Loader } from './Loader';
import { SearchLink } from './SearchLink';
import { SortTypes } from '../helpers/sortTypes';


export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage('Something went wrong');
        throw error;
      })
      .finally(() => setIsLoading(false));
  }, []);

  const peopleFromServer = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
    century: String(Number(person.born.toString().slice(0, 2)) + 1),
  }));

  const { slug } = useParams();

  const normalizedQuery = query.toLowerCase().trim();

  const isIncludesNormalizedQuery = (name: string) => {
    return name.toLowerCase().includes(normalizedQuery)
  }

  let filteredPeople = peopleFromServer.filter(p => {
    let personName = isIncludesNormalizedQuery(p.name);
    let personFatherName =  isIncludesNormalizedQuery(p.fatherName ?? '');
    let personMotherName = isIncludesNormalizedQuery(p.motherName ?? '');

    return personName || personFatherName || personMotherName
  });

  if (sex) {
    filteredPeople = filteredPeople.filter(p => p.sex === sex);
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(p => (
      centuries.includes(p.century)
    ));
  }

  switch (sort) {
    case SortTypes.name:
      filteredPeople.sort((value1, value2) => {
        return value1.name.localeCompare(value2.name);
      });
      break;

    case SortTypes.sex:
      filteredPeople.sort((value1, value2) => {
        return value1.sex.localeCompare(value2.sex);
      });
      break;

    case SortTypes.born:
      filteredPeople.sort((value1, value2) => {
        return value1.born - value2.born;
      });
      break;

    case SortTypes.died:
      filteredPeople.sort((value1, value2) => {
        return value1.born - value2.born;
      });
      break;
  }

  switch (order) {
    case 'desc':
      filteredPeople = filteredPeople.reverse();
      break;
  }

  const allCategories = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <>
      <h1 className="title">People Page</h1>

      {people.length !== 0 ? (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                setSearchParams={setSearchParams}
                searchParams={searchParams}
                centuries={centuries}
                query={query}
                sex={sex}
              />
            </div>

            <div className="column">
              <div className="box table-container">
                <table
                  data-cy="peopleTable"
                  className="table is-striped
                  is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      {allCategories.map(name => (
                        <th key={name}>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {name}
                            <SearchLink
                              params={{
                                sort: sort === name && order ? null : name,
                                order: sort === name && order
                                ? null
                                : (sort === name ? 'desc' : null),
                              }}
                            >
                              <span className="icon">
                                <i className={cn('fas', {
                                  'fa-sort': sort !== name,

                                  'fa-sort-up': sort === name
                                  && order !== 'desc',

                                  'fa-sort-down': sort === name
                                  && order === 'desc',
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
                    {filteredPeople.map(person => (
                      <TableRow
                        key={person.slug}
                        person={person}
                        slug={slug}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="box table-container">
          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading && people.length === 0 && !errorMessage && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoading && <Loader />}
        </div>
      )}
    </>
  );
};
