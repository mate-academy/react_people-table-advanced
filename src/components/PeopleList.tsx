import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonRow } from './PersonRow';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingError, setLoadingError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getPreparedPeople = (loadedPeople: Person[]) => {
    return loadedPeople.map(person => {
      return {
        ...person,
        mother: people
          .find(person1 => person1.name === person.motherName),
        father: people
          .find(person1 => person1.name === person.fatherName),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch (error) {
        setLoadingError(true);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, []);

  const preparedPeople = getPreparedPeople(people);

  const emptyData = isLoaded && people.length < 1 && !loadingError;
  const failedFetch = loadingError;

  return (
    <div className="block">
      <div className="box table-container">

        {failedFetch && (
          <p
            data-cy="peopleLoadingError"
            className="has-text-danger"
          >
            Something went wrong
          </p>
        )}

        {emptyData && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
        {!isLoaded ? <Loader /> : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
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
                        <i className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {preparedPeople.map(person => (
                <PersonRow
                  key={person.slug}
                  person={person}
                />
              ))}

            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};
