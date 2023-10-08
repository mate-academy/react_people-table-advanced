import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { OrderControl } from '../../utils/OrderControl';

const getPreparedPeople = (people: Person[]) => {
  return people.map(person => {
    const father = people.find(fath => fath.name === person.fatherName);
    const mother = people.find(moth => moth.name === person.motherName);

    return {
      ...person,
      father,
      mother,
    };
  });
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(getPreparedPeople(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const displayedPeople = () => {
    let filteredPeople = [...people];

    const centuries = searchParams.getAll('centuries') || [];
    const gender = searchParams.get('sex') || '';
    const query = searchParams.get('query') || '';

    filteredPeople = centuries.length > 0
      ? filteredPeople.filter(person => centuries
        .includes((Math.ceil(Number(person.born) / 100)).toString()))
      : filteredPeople;

    filteredPeople = gender
      ? filteredPeople.filter(person => person.sex === gender)
      : filteredPeople;

    filteredPeople = query
      ? filteredPeople.filter(person => (
        person.name.toLowerCase().includes(query.toLowerCase()))
        || person.motherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
        || person.fatherName?.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()))
      : filteredPeople;

    const sort = searchParams.get('sort');

    if (sort) {
      if (sort === 'born' || sort === 'died') {
        filteredPeople.sort((a, b) => {
          return a[sort] - b[sort];
        });
      }

      if (sort === 'name' || sort === 'sex') {
        filteredPeople.sort((a, b) => {
          return a[sort].localeCompare(b[sort]);
        });
      }
    }

    const order = searchParams.get('order');

    if (order) {
      filteredPeople.reverse();
    }

    return filteredPeople;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!displayedPeople() && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!people.length && (
                <table
                  data-cy="peopleTable"
                  className="
                    table is-striped is-hoverable is-narrow is-fullwidth
                  "
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name
                          <OrderControl sort="name" />
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex
                          <OrderControl sort="sex" />

                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born
                          <OrderControl sort="born" />
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died
                          <OrderControl sort="died" />
                        </span>
                      </th>

                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {displayedPeople().map(person => (
                      <PeopleTable
                        key={person.slug}
                        person={person}
                      />
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
