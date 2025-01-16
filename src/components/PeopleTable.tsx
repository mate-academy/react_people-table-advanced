import React from 'react';
import { PersonComponent } from './PersonComponent';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = (props: Props) => {
  const { people } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetParams = (newParams: SearchParams) => {
    const updatedParams = getSearchWith(searchParams, newParams);

    setSearchParams(updatedParams);
  };

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSortLink = (typeOfSort: string) => {
    if (currentSort !== typeOfSort) {
      handleSetParams({ sort: typeOfSort, order: null });
    } else if (!currentOrder) {
      handleSetParams({ order: 'desc' });
    } else {
      handleSetParams({ sort: null, order: null });
    }
  };

  const renderPersonLink = (name: string | null): React.ReactNode => {
    if (!name) {
      return '-';
    }

    const neededPerson = people.find(person => person.name === name);

    if (neededPerson) {
      return <PersonLink person={neededPerson} />;
    }

    return name;
  };

  return (
    <>
      {people.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a onClick={() => handleSortLink('name')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSort !== 'name',
                          'fa-sort-up': currentSort === 'name' && !currentOrder,
                          'fa-sort-down':
                            currentSort === 'name' && currentOrder,
                        })}
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a onClick={() => handleSortLink('sex')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSort !== 'sex',
                          'fa-sort-up': currentSort === 'sex' && !currentOrder,
                          'fa-sort-down': currentSort === 'sex' && currentOrder,
                        })}
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a onClick={() => handleSortLink('born')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSort !== 'born',
                          'fa-sort-up': currentSort === 'born' && !currentOrder,
                          'fa-sort-down':
                            currentSort === 'born' && currentOrder,
                        })}
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a onClick={() => handleSortLink('died')}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': currentSort !== 'died',
                          'fa-sort-up': currentSort === 'died' && !currentOrder,
                          'fa-sort-down':
                            currentSort === 'died' && currentOrder,
                        })}
                      />
                    </span>
                  </a>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map(person => {
              return (
                <PersonComponent
                  renderPersonLink={renderPersonLink}
                  person={person}
                  key={person.slug}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>There are no people matching the current search criteria</p>
      )}
    </>
  );
};
