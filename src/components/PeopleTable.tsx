import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonTR } from './PersonTR';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const NAME = 'name';
const SEX = 'sex';
const BORN = 'born';
const DIED = 'died';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const toggleSort = (sortBy: string) => {
    if (sortBy === sort && order) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sortBy === sort) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: sortBy,
      order: null,
    };
  };

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
              <SearchLink params={toggleSort(NAME)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== NAME,
                      'fa-sort-up': sort === NAME && !order,
                      'fa-sort-down': sort === NAME && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={toggleSort(SEX)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SEX,
                      'fa-sort-up': sort === SEX && !order,
                      'fa-sort-down': sort === SEX && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={toggleSort(BORN)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== BORN,
                      'fa-sort-up': sort === BORN && !order,
                      'fa-sort-down': sort === BORN && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={toggleSort(DIED)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== DIED,
                      'fa-sort-up': sort === DIED && !order,
                      'fa-sort-down': sort === DIED && order,
                    })}
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
        {people.map(person => (
          <PersonTR person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
