import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchParams } from '../../utils/searchHelper';
import { PersonInfo } from '../Person';
import { SearchLink } from '../SearchLink';

type Props = {
  currentPeopleList: Person[],
};

export const PeopleTable: React.FC<Props> = ({ currentPeopleList }) => {
  const [isActiveRow, setIsActiveRow] = useState('');
  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const getSortParams = (sortName: string): SearchParams => {
    if (sortParam === sortName
      && orderParam) {
      return { sort: null, order: null };
    }

    if (sortParam === sortName) {
      return { sort: sortName, order: 'desc' };
    }

    return { sort: sortName, order: null };
  };

  const isSortIconUp = (sortName: string) => (
    sortParam === sortName && !orderParam
  );

  const isSortIconDown = (sortName: string) => (
    sortParam === sortName && orderParam
  );

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={classNames(
                    'fas fa-sort',
                    {
                      'fa-sort-up': isSortIconUp('name'),
                    },
                    {
                      'fa-sort-down': isSortIconDown('name'),
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={classNames(
                    'fas fa-sort',
                    {
                      'fa-sort-up': isSortIconUp('sex'),
                    },
                    {
                      'fa-sort-down': isSortIconDown('sex'),
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={classNames(
                    'fas fa-sort',
                    {
                      'fa-sort-up': sortParam === 'born'
                        && !orderParam,
                    },
                    {
                      'fa-sort-down': sortParam === 'born'
                        && orderParam,
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={classNames(
                    'fas fa-sort',
                    {
                      'fa-sort-up': sortParam === 'died'
                        && !orderParam,
                    },
                    {
                      'fa-sort-down': sortParam === 'died'
                        && orderParam,
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {currentPeopleList.map((person: Person) => (
          <PersonInfo
            person={person}
            key={person.slug}
            setIsActiveRow={setIsActiveRow}
            isActiveRow={isActiveRow}
          />
        ))}
      </tbody>
    </table>
  );
};
