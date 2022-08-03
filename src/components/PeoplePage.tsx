import { useEffect, useState } from 'react';
import {
  createSearchParams, Link, useParams, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';

import { PersonLink } from './PersonLink';
import { getPeople } from '../api';
import { Person } from '../types/Person';

function getMother(people: Person[], { motherName }: Person): Person | null {
  const mother = people.find(person => person.name === motherName);

  return mother || null;
}

function getFather(people: Person[], { fatherName }: Person): Person | null {
  const mother = people.find(person => person.name === fatherName);

  return mother || null;
}

type Params = {
  [key: string]: string | string[];
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  // const sortBy = searchParams.get('sortBy') || '';
  const centuries = searchParams.getAll('century') || [];

  function getSearchWith(params: Params) {
    const newParams = createSearchParams(searchParams);

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in params) {
      const value = params[key];

      if (value.length === 0) {
        newParams.delete(key);
      } else if (!Array.isArray(value)) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);

        value.forEach(part => {
          newParams.append(key, part);
        });
      }
    }

    return newParams.toString();
  }

  const lowerQuery = query.toLocaleLowerCase();
  const getCentury = (person: Person) => Math.ceil(person.born / 100);

  const visiblePeople = people.filter(person => {
    if (sex && person.sex !== sex) {
      return false;
    }

    if (centuries.length > 0
       && !centuries.includes(getCentury(person).toString())
    ) {
      return false;
    }

    if (!query) {
      return true;
    }

    if (person.name.toLocaleLowerCase().includes(lowerQuery)) {
      return true;
    }

    if (person.motherName
      && person.motherName.toLocaleLowerCase().includes(lowerQuery)
    ) {
      return true;
    }

    if (person.fatherName
      && person.fatherName.toLocaleLowerCase().includes(lowerQuery)
    ) {
      return true;
    }

    return false;
  });

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const normalizedPeople = peopleFromServer.map(
          person => ({ ...person }),
        );

        normalizedPeople.forEach(person => {
          Object.assign(person, {
            mother: getMother(normalizedPeople, person),
            father: getFather(normalizedPeople, person),
          });
        });

        setPeople(normalizedPeople);
      });
  }, []);

  return (
    <>
      <h1 className="title">People page</h1>
      {visiblePeople.length}

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-4-desktop">
            <nav className="panel">
              <p className="panel-heading">
                Filters
              </p>

              <p className="panel-tabs">
                <Link
                  className={classNames({ 'is-active': !sex })}
                  to={{
                    search: getSearchWith({ sex: '' }),
                  }}
                >
                  All
                </Link>

                <Link
                  className={classNames({ 'is-active': sex === 'm' })}
                  to={{
                    search: getSearchWith({ sex: 'm' }),
                  }}
                >
                  Male
                </Link>

                <Link
                  className={classNames({ 'is-active': sex === 'f' })}
                  to={{
                    search: getSearchWith({ sex: 'f' }),
                  }}
                >
                  Female
                </Link>
              </p>

              <div className="panel-block">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={event => setSearchParams(
                      getSearchWith({ query: event.target.value }),
                    )}
                  />
                  <span className="icon is-left">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                </p>
              </div>

              <div className="panel-block is-flex-direction-column">
                <div className="buttons is-justify-content-center">
                  {['15', '16', '17', '18', '19'].map(century => (
                    <button
                      key={century}
                      type="button"
                      className={classNames('button', {
                        'is-info': centuries.includes(century),
                      })}
                      onClick={() => setSearchParams(
                        getSearchWith({
                          century: centuries.includes(century)
                            ? centuries.filter(c => c !== century)
                            : [...centuries, century],
                        }),
                      )}
                    >
                      {century}
                    </button>
                  ))}

                  <button
                    type="button"
                    className={classNames('button', 'is-success', {
                      'is-outlined': centuries.length > 0,
                    })}
                    onClick={() => setSearchParams(
                      getSearchWith({ century: [] }),
                    )}
                  >
                    Show All
                  </button>
                </div>
              </div>

              <div className="panel-block">
                <button
                  type="button"
                  className="button is-link is-outlined is-fullwidth"
                  onClick={() => setSearchParams(
                    getSearchWith({ query: '', sex: '', century: [] }),
                  )}
                >
                  Reset all filters
                </button>
              </div>
            </nav>
          </div>

          <div className="column">
            <table className="table is-striped is-narrow box">
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
                {visiblePeople.map(person => (
                  <tr
                    key={person.slug}
                    className={classNames('person', {
                      'has-background-warning': person.slug === slug,
                    })}
                  >
                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.mother ? (
                        <PersonLink person={person.mother} />
                      ) : person.motherName}
                    </td>
                    <td>
                      {person.father ? (
                        <PersonLink person={person.father} />
                      ) : person.fatherName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>

  );
};
