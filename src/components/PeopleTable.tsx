import React, { useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortSearchParams = (sortField: string) => {
    if (sortField === sort) {
      return order === 'desc'
        ? { sort: null, order: null }
        : { sort: sortField, order: 'desc' };
    }

    return { sort: sortField, order: null };
  };

  const getArrowDirection = (sortField: string) => {
    if (sortField === sort) {
      return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
    }

    return 'fa-sort';
  };

  const sortPeople = useMemo(() => {
    const preparedPeople = [...people].sort((person1, person2) => {
      switch (sort) {
        case 'name':
          return order
            ? person2.name.localeCompare(person1.name)
            : person1.name.localeCompare(person2.name);
        case 'sex':
          return order
            ? person2.sex.localeCompare(person2.sex)
            : person1.sex.localeCompare(person2.sex);
        case 'born':
          return order
            ? person2.born - person1.born
            : person1.born - person2.born;
        case 'died':
          return order
            ? person2.died - person1.died
            : person1.died - person2.died;
        default:
          return 0;
      }
    });

    return preparedPeople;
  }, [sort, order, people]);

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
              <SearchLink params={getSortSearchParams('name')} className="icon">
                <span className="icon">
                  <i className={classNames('fas', getArrowDirection('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortSearchParams('sex')} className="icon">
                <span className="icon">
                  <i className={classNames('fas', getArrowDirection('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortSearchParams('born')} className="icon">
                <span className="icon">
                  <i className={classNames('fas', getArrowDirection('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortSearchParams('died')} className="icon">
                <span className="icon">
                  <i className={classNames('fas', getArrowDirection('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortPeople.map(person => {
          return <PersonLink person={person} key={person.name} />;
        })}
      </tbody>
    </table>
  );
};
