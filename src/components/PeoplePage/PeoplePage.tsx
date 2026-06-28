import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../Loader';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../../types/Person';
import classNames from 'classnames';
import { PeopleFilters } from '../PeopleFilters';
import { getSearchWith } from '../../utils/searchHelper';
import { filterPeople, sortPeople } from '../../utils/peopleManager';

type Field = `name` | `sex` | `born` | `died`;

export const PersonLink = ({ person }: { person: Person }) => {
  const location = useLocation();

  return (
    <Link
      to={{ pathname: `/people/${person.slug}`, search: location.search }}
      className={classNames({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    const loadPeople = async () => {
      setIsError(false);
      setIsLoaded(false);
      

      setTimeout(async () => {
        try {
          const response = await fetch(
            'https://mate-academy.github.io/react_people-table/api/people.json',
          );

          if (!response.ok) {
            throw new Error('Server error');
          }

          const data = await response.json().catch(() => []);

          setPeople(Array.isArray(data) ? data : []);
          setIsLoaded(true);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }, 0);
    };

    loadPeople();
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  function handleSortField(field: Field) {
    let order = searchParams.get('order');

    if (field === searchParams.get('sort')) {
      if (order === 'asc') {
        order = 'desc';
      } else if (order === 'desc') {
        order = null;
      }
    } else {
      order = 'asc';
    }

    const newParams = getSearchWith(searchParams, {
      sort: order ? field : null,
      order,
    });

    setSearchParams(newParams);
  }

  let preparedPeople = filterPeople(people, searchParams);

  preparedPeople = sortPeople(preparedPeople, searchParams);

  const centuries = useMemo(
    () =>
      Array.from(
        new Set(people.map(person => Math.ceil(person.born / 100).toString())),
      ).sort(),
    [people],
  );

  const showFilters = !isLoading && isLoaded && !isError && people.length > 0;
  const showLoader = isLoading;
  const showError = !isLoading && isError;
  const showNoPeopleMessage =
    !isLoading && isLoaded && !isError && preparedPeople.length === 0;
  const showPeopleTable =
    !isLoading && isLoaded && !isError && preparedPeople.length > 0;

  return (
    <main className="section">
      <h1 className="title">People Page</h1>

      <div className="container">
        <div className="block">
          {showFilters && <PeopleFilters centuries={centuries} />}

          <div className="box table-container">
            {showLoader && <Loader />}

            {showError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {showNoPeopleMessage && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {showPeopleTable && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th
                      onClick={() => {
                        handleSortField('name');
                      }}
                    >
                      Name
                    </th>
                    <th
                      onClick={() => {
                        handleSortField('sex');
                      }}
                    >
                      Sex
                    </th>
                    <th
                      onClick={() => {
                        handleSortField('born');
                      }}
                    >
                      Born
                    </th>
                    <th
                      onClick={() => {
                        handleSortField('died');
                      }}
                    >
                      Died
                    </th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  {preparedPeople.map(person => {
                    const father = people.find(
                      toFind => toFind.name === person.fatherName,
                    );
                    const mother = people.find(
                      toFind => toFind.name === person.motherName,
                    );

                    return (
                      <tr
                        data-cy="person"
                        key={person.slug}
                        className={classNames({
                          'has-background-warning': person.slug === slug,
                        })}
                      >
                        <td>
                          <PersonLink person={person}></PersonLink>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {mother ? (
                            <PersonLink person={mother}></PersonLink>
                          ) : person.motherName ? (
                            person.motherName
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          {father ? (
                            <PersonLink person={father}></PersonLink>
                          ) : person.fatherName ? (
                            person.fatherName
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
