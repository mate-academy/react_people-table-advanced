import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { SinglePerson } from './Person';
import { PeopleFilters } from './PeopleFilters';
import { SearchLink } from './SearchLink';

export const People = () => {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const longClassName = 'table is-striped is-hoverable is-narrow is-fullwidth';

  function getPreparedPeople() {
    let result = [...people];

    if (sex) {
      result = result.filter((person) => {
        switch (sex) {
          case 'm':
            return person.sex === 'm';

          case 'f':
            return person.sex === 'f';

          default:
            return true;
        }
      });
    }

    if (query) {
      result = result.filter((person) => {
        return person.name.toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())
          || person.motherName?.toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
            || person.fatherName?.toLocaleLowerCase()
              .includes(query.toLocaleLowerCase());
      });
    }

    if (centuries.length) {
      let newpeople: Person[] = [];

      for (let i = 16; i < 21; i += 1) {
        if (centuries.includes(`${i}`)) {
          newpeople = [
            ...newpeople,
            ...result.filter(
              (person: Person) => Math.ceil(person.born / 100) === i,
            ),
          ];
        }
      }

      result = newpeople;
    }

    if (sort) {
      result.sort((p1, p2) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return p1[sort].localeCompare(p2[sort]);
          case 'born':
          case 'died':
            return p1[sort] - p2[sort];
          default:
            return 1;
        }
      });
    }

    if (order) {
      return result.reverse();
    }

    return result;
  }

  const getLinkParams = (
    param: string,
  ):
  | { sort: string }
  | {
    sort: null;
    order: null;
  }
  | { order: string } => {
    if (!sort) {
      return { sort: param };
    }

    if (sort === param) {
      return order ? { sort: null, order: null } : { order: 'desc' };
    }

    return { sort: param };
  };

  const getLinkClass = (param: string) => classNames(
    'fas',
    { 'fa-sort': param !== sort },
    { 'fa-sort-up': sort && sort === param && !order },
    { 'fa-sort-down': sort && sort === param && order === 'desc' },
  );

  const preparedPeople = getPreparedPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error !== '' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && (
                <table
                  data-cy="peopleTable"
                  className={longClassName}
                >
                  <thead>
                    <tr>
                      <th>
                        Name
                        <SearchLink params={getLinkParams('name')}>
                          <span className="icon">
                            <i className={getLinkClass('name')} />
                          </span>
                        </SearchLink>
                      </th>
                      <th>
                        Sex
                        <SearchLink params={getLinkParams('sex')}>
                          <span className="icon">
                            <i className={getLinkClass('sex')} />
                          </span>
                        </SearchLink>
                      </th>
                      <th>
                        Born
                        <SearchLink params={getLinkParams('born')}>
                          <span className="icon">
                            <i className={getLinkClass('born')} />
                          </span>
                        </SearchLink>
                      </th>
                      <th>
                        Died
                        <SearchLink params={getLinkParams('died')}>
                          <span className="icon">
                            <i className={getLinkClass('died')} />
                          </span>
                        </SearchLink>
                      </th>
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>

                  <tbody>
                    {preparedPeople.map(person => {
                      return (
                        <SinglePerson
                          people={preparedPeople}
                          person={person}
                          key={person.slug}
                        />
                      );
                    })}

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
