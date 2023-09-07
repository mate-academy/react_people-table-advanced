import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { PeopleFilters } from './PeopleFilters';
import { SortBy } from '../types/SortBy';
import { preparedPeople } from '../utils/preparetPeople';
import { SortLink } from './SortLink';

const sortFields = ['Name', 'Sex', 'Born', 'Died'];

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { personSlug } = useParams();

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortBy || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    const peopleWithParents = people.map(person => {
      const mother = people.find(({ name }) => name === person.motherName);
      const father = people.find(({ name }) => name === person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    });

    return preparedPeople(peopleWithParents,
      { query, sex, centuries }, sort, order);
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!hasError && !isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && visiblePeople?.length === 0 && (
                <p
                  data-cy="noPeopleMessage"
                >
                  There are no people on the server
                </p>
              )}
              {!hasError && visiblePeople?.length > 0 && (
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      {sortFields.map(field => (
                        <th key={field}>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {field}
                            <SortLink
                              sortField={sort}
                              field={field}
                              order={order}
                            />
                          </span>
                        </th>
                      ))}
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {visiblePeople.map((person) => (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={cn({
                          'has-background-warning': personSlug === person.slug,
                        })}
                      >
                        <td>
                          <PersonLink
                            person={person}
                          />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.mother
                            ? <PersonLink person={person.mother} />
                            : person.motherName || '-'}
                        </td>
                        <td>
                          {person.father
                            ? <PersonLink person={person.father} />
                            : person.fatherName || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
