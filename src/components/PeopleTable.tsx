import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';

type Props = {
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PeopleTable: React.FC<Props> = ({ setIsLoaded }) => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        const preparedPeople = data.map(person => {
          let mother: Person | undefined;
          let father: Person | undefined;

          if (person.motherName) {
            mother = data.find(human => human.name === person.motherName);
          }

          if (person.fatherName) {
            father = data.find(human => human.name === person.fatherName);
          }

          return {
            ...person,
            mother,
            father,
          };
        });

        setIsLoaded(true);
        setPeople(preparedPeople);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  function renderParentContent(
    name: string | null,
    person: Person | undefined,
  ) {
    if (!name) {
      return '-';
    }

    if (person) {
      return (
        <Link
          to={person.slug}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {name}
        </Link>
      );
    }

    return name;
  }

  const isNoPeopleMessage = !isLoading && !people.length && !isError;
  const isPeopleTable = !isError && !isLoading;

  return (
    <>
      {isLoading && <Loader />}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isNoPeopleMessage && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {isPeopleTable && (
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
            {people.map(person => (
              <tr
                data-cy="person"
                className={classNames({
                  'has-background-warning': person.slug === slug,
                })}
                key={person.name}
              >
                <td>
                  <Link
                    to={person.slug}
                    className={classNames({
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </Link>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>{renderParentContent(person.motherName, person.mother)}</td>
                <td>{renderParentContent(person.fatherName, person.father)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
