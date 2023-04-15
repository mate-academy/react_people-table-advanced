import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { getPeople } from '../api';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const sortingColumns = [
  'Name',
  'Sex',
  'Born',
  'Died',
];

function getSortProps(
  currentSort: string | null,
  selectedSort: string,
  sortOrder: string | null,
): SearchParams {
  if (currentSort === selectedSort) {
    if (sortOrder !== null) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      order: 'desc',
    };
  }

  return {
    sort: selectedSort,
    order: null,
  };
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();
  const SPquery = searchParams.get('query');
  const SPsex = searchParams.get('sex');
  const SPcenturies = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as keyof Person;
  const order = searchParams.get('order');

  const getPeopleFromServer = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const result = await getPeople();

      const modifiedPeople = result.map(person => {
        const {
          motherName,
          fatherName,
        } = person;
        const modifieedPerson = { ...person };

        if (!motherName) {
          modifieedPerson.motherName = '-';
        }

        if (!fatherName) {
          modifieedPerson.fatherName = '-';
        }

        modifieedPerson.mother = result.find(({ name }) => name === motherName);
        modifieedPerson.father = result.find(({ name }) => name === fatherName);

        return modifieedPerson;
      });

      setPeople(modifiedPeople);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const filteredPeople = useMemo(
    () => people.filter(({
      name,
      fatherName,
      motherName,
      sex,
      born,
    }) => {
      const nameQuery = SPquery !== null
        ? SPquery.trim().toLowerCase()
        : null;

      const nameFilter = nameQuery === null
        || name.toLowerCase().includes(nameQuery)
        || fatherName?.toLowerCase().includes(nameQuery)
        || motherName?.toLowerCase().includes(nameQuery);

      const sexFilter = SPsex === null
        || sex === SPsex;

      const bornFilter = !SPcenturies.length
        || SPcenturies.includes(Math.floor(born / 100 + 1).toString());

      return nameFilter && sexFilter && bornFilter;
    }),
    [people, SPquery, SPsex, SPcenturies],
  );

  if (sort !== null) {
    filteredPeople.sort((personOne, personTwo) => {
      const valueOne = personOne[sort];
      const valueTwo = personTwo[sort];
      let diffrence = 0;

      switch (typeof valueOne) {
        case 'number':
          if (typeof valueTwo === 'number') {
            diffrence = valueOne - valueTwo;
          }

          break;
        case 'string':
          if (typeof valueTwo === 'string') {
            diffrence = valueOne.localeCompare(valueTwo);
          }

          break;
        default: return 0;
      }

      return order ? -diffrence : diffrence;
    });
  }

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
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

              {!isLoading && !isError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && people.length && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped
                    is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      {sortingColumns.map(column => (
                        <th key={column}>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {column}
                            <Link
                              to={{
                                search: getSearchWith(
                                  getSortProps(
                                    sort,
                                    column.toLowerCase(),
                                    order,
                                  ),
                                  searchParams,
                                ),
                              }}
                            >
                              <span className="icon">
                                <i
                                  className={classNames(
                                    'fas',
                                    {
                                      'fa-sort': sort !== column.toLowerCase(),
                                      'fa-sort-up': sort === column
                                        .toLowerCase() && order === null,
                                      'fa-sort-down': sort === column
                                        .toLowerCase() && order,
                                    },
                                  )}
                                />
                              </span>
                            </Link>
                          </span>
                        </th>
                      ))}

                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPeople.map(person => {
                      const {
                        slug,
                        sex,
                        born,
                        died,
                        fatherName,
                        motherName,
                        father,
                        mother,
                      } = person;

                      return (
                        <tr
                          key={person.slug}
                          data-cy="person"
                          className={classNames({
                            'has-background-warning': selectedSlug === slug,
                          })}
                        >
                          <td>
                            <PersonLink person={person} />
                          </td>

                          <td>{sex}</td>
                          <td>{born}</td>
                          <td>{died}</td>
                          <td>
                            {mother
                              ? <PersonLink person={mother} />
                              : motherName}
                          </td>
                          <td>
                            {father
                              ? <PersonLink person={father} />
                              : fatherName}
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
      </div>
    </div>
  );
};
