/* eslint-disable @typescript-eslint/indent */
import { useContext, useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import { StatesContext } from '../store/Store';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types';
import classname from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people } = useContext(StatesContext);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>(people);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const findPersonByName = (name: string) => {
    return people.find(person => person.name === name);
  };

  const handleSortChange = () => {
    const sortedPeople = [...visiblePeople];

    switch (sort) {
      case 'name':
        setVisiblePeople(
          sortedPeople.sort((a, b) =>
            order === 'desc'
              ? b.name.localeCompare(a.name)
              : a.name.localeCompare(b.name),
          ),
        );
        break;
      case 'sex':
        setVisiblePeople(
          sortedPeople.sort((a, b) =>
            order === 'desc'
              ? b.sex.localeCompare(a.sex)
              : a.sex.localeCompare(b.sex),
          ),
        );
        break;
      case 'born':
        setVisiblePeople(
          sortedPeople.sort((a, b) =>
            order === 'desc' ? b.born - a.born : a.born - b.born,
          ),
        );
        break;
      case 'died':
        setVisiblePeople(
          sortedPeople.sort((a, b) =>
            order === 'desc' ? b.died - a.died : a.died - b.died,
          ),
        );
        break;
    }

    return sortedPeople;
  };

  useEffect(() => {
    handleSortChange();
  }, [sort, order]);

  return (
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
                  search:
                    order === ''
                      ? getSearchWith(searchParams, {
                          sort: 'name',
                          order: 'desc',
                        })
                      : getSearchWith(searchParams, {
                          sort: 'name',
                          order: null,
                        }),
                }}
              >
                <span className="icon">
                  <i
                    className={classname('fas', {
                      ['fa-sort']: sort !== 'name',
                      ['fa-sort-up']: sort === 'name' && order === '',
                      ['fa-sort-down']: sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search:
                    order === ''
                      ? getSearchWith(searchParams, {
                          sort: 'sex',
                          order: 'desc',
                        })
                      : getSearchWith(searchParams, {
                          sort: 'sex',
                          order: null,
                        }),
                }}
              >
                <span className="icon">
                  <i
                    className={classname('fas', {
                      ['fa-sort']: sort !== 'sex',
                      ['fa-sort-up']: sort === 'sex' && order === '',
                      ['fa-sort-down']: sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search:
                    order === ''
                      ? getSearchWith(searchParams, {
                          sort: 'born',
                          order: 'desc',
                        })
                      : getSearchWith(searchParams, {
                          sort: 'born',
                          order: null,
                        }),
                }}
              >
                <span className="icon">
                  <i
                    className={classname('fas', {
                      ['fa-sort']: sort !== 'born',
                      ['fa-sort-up']: sort === 'born' && order === '',
                      ['fa-sort-down']: sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search:
                    order === ''
                      ? getSearchWith(searchParams, {
                          sort: 'died',
                          order: 'desc',
                        })
                      : getSearchWith(searchParams, {
                          sort: 'died',
                          order: null,
                        }),
                }}
              >
                <span className="icon">
                  <i
                    className={classname('fas', {
                      ['fa-sort']: sort !== 'died',
                      ['fa-sort-up']: sort === 'died' && order === '',
                      ['fa-sort-down']: sort === 'died' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          return (
            <PersonLink
              findPersonByName={findPersonByName}
              person={person}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
