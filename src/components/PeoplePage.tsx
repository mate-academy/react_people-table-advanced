import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useFilter } from '../utils/useFilter';

import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const { slug } = useParams();
  const [filteredPeople, filter] = useFilter(people);
  const findParent = (parentName: string | null) =>
    people.find(person => person.name === parentName);

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    filter(searchParams);
  }, [filteredPeople, searchParams, filter]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isError && !isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && people.length !== 0 && (
                <table
                  data-cy="peopleTable"
                  className="
                  table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth
                  "
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name
                          <a href="#/people?sort=name">
                            <span className="icon">
                              <i className="fas fa-sort" />
                            </span>
                          </a>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex
                          <a href="#/people?sort=sex">
                            <span className="icon">
                              <i className="fas fa-sort" />
                            </span>
                          </a>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born
                          <a href="#/people?sort=born&amp;order=desc">
                            <span className="icon">
                              <i className="fas fa-sort-up" />
                            </span>
                          </a>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died
                          <a href="#/people?sort=died">
                            <span className="icon">
                              <i className="fas fa-sort" />
                            </span>
                          </a>
                        </span>
                      </th>

                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPeople.map((person: Person) => (
                      <PeopleTable
                        key={person.slug}
                        person={person}
                        slug={slug}
                        isParentInList={findParent}
                      />
                    ))}
                  </tbody>
                </table>
              )}

              <p>There are no people matching the current search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
