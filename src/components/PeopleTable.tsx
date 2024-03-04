import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PeopleTable: React.FC<Props> = ({ setIsLoaded }) => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isNoPeopleMessage = !isLoading && !people.length && !isError;
  const isPeopleTable = !isError && !isLoading;

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

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

  const getSortSearchParams = (sortField: string) => {
    if (sortField === sort) {
      return order === 'desc' ? { sort: null, order: null } : { order: 'desc' };
    }

    return { sort: sortField};
  };

  const filteredPeople = people.filter(person => {
    const passesSex = person.sex !== sex;
    let passesQuery = !query;
    let passesCentury = !centuries.length;

    if (query) {
      const queryLower = query.toLowerCase();
      const isInName = person.name.toLowerCase().includes(queryLower);
      const isInMotherName =
        person.motherName &&
        person.motherName.toLowerCase().includes(queryLower);
      const isInFatherName =
        person.fatherName &&
        person.fatherName.toLowerCase().includes(queryLower);

      passesQuery = !!(isInName || isInMotherName || isInFatherName);
    }

    if (centuries.length) {
      const birthYear = person.born;

      passesCentury = centuries.some(century => {
        const startYear = (+century - 1) * 100;
        const endYear = +century * 100 - 1;

        return birthYear >= startYear && birthYear <= endYear;
      });
    }

    return passesCentury && passesSex && passesQuery;
  });

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
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <Link
                    to={{
                      search: getSearchWith(
                        searchParams,
                        getSortSearchParams('name'),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link
                    to={{
                      search: getSearchWith(
                        searchParams,
                        getSortSearchParams('sex'),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link
                    to={{
                      search: getSearchWith(
                        searchParams,
                        getSortSearchParams('born'),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </Link>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link
                    to={{
                      search: getSearchWith(
                        searchParams,
                        getSortSearchParams('died'),
                      ),
                    }}
                  >
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </Link>
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
