import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [getpeople, setGetPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        if (!people.length) {
          setError('There are no people on the server');
        }

        setGetPeople(people);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Something went wrong');
        setIsLoading(false);
      });
  }, []);

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
              {isLoading && (
                <Loader />
              )}
              {!!error && (
                <>
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    {error}
                  </p>
                  {getpeople.length <= 0 && (
                    <p data-cy="noPeopleMessage">
                      {error}
                    </p>
                  )}
                </>
              )}

              <p>There are no people matching the current search criteria</p>
              {/* {getpeople.length > 0 && !isLoading && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Sex</th>
                      <th>Born</th>
                      <th>Died</th>
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getpeople.map((person) => (
                      <tr
                        key={person.slug}
                        data-cy="person"
                        className={cn({
                          'has-background-warning': person.slug === slug,
                        })}
                      >
                        <td>
                          <PersonLink person={person} />
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>{getParent(person.motherName)}</td>
                        <td>{getParent(person.fatherName)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )} */}
              {getpeople.length > 0 && !isLoading && (
                <PeopleTable
                  getpeople={getpeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
