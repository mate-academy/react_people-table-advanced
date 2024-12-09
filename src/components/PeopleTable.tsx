/* eslint-disable jsx-a11y/control-has-associated-label */

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';
import { Loader } from './Loader';

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessageNoMatch, setErrorMessageNoMatch] = useState(false);
  const centuries = searchParams.getAll('centuries');
  const search = searchParams.get('search') || '';
  const sex = searchParams.getAll('sex');
  const { slug } = useParams();

  const filteredPeople = people.filter(person => {
    const matchesSex = !sex.length || sex.includes(person.sex);

    const matchesCentury =
      !centuries.length ||
      centuries.includes(Math.floor(person.born / 100 + 1).toString());

    const matchesSearch =
      !search ||
      person.name.toLowerCase().includes(search.toLowerCase()) ||
      person.motherName?.toLowerCase().includes(search.toLowerCase()) ||
      person.fatherName?.toLowerCase().includes(search.toLowerCase());

    return matchesSex && matchesCentury && matchesSearch;
  });

  const chosenPerson = people.find(p => slug === p.slug);

  useEffect(() => {
    if (!isLoading && people.length > 0 && filteredPeople.length === 0) {
      setErrorMessageNoMatch(true);
    } else {
      setErrorMessageNoMatch(false);
    }
  }, [people, filteredPeople, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading && <Loader />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {errorMessageNoMatch && (
        <p data-cy="noMatchingPeople">
          There are no people matching the current search criteria
        </p>
      )}

      {people.length === 0 && !isLoading ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        !isLoading &&
        !errorMessageNoMatch && (
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
              {filteredPeople.map(person => (
                <tr
                  data-cy="person"
                  key={person.slug}
                  className={
                    chosenPerson === person ? `has-background-warning` : ''
                  }
                >
                  <td>
                    <PersonLink
                      person={person}
                      people={people}
                      name={person.name}
                    />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    <PersonLink
                      person={people.find(p => p.name === person.motherName)}
                      people={people}
                      name={person.motherName}
                    />
                  </td>
                  <td>
                    <PersonLink
                      person={people.find(p => p.name === person.fatherName)}
                      people={people}
                      name={person.fatherName}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};
