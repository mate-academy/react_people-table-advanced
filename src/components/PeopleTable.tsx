/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonType } from '../types';
import { Person } from './Person';
import { ORDER_PARAM, SORT_PARAM } from '../types/Sort';
import { getSearchWith } from '../utils/searchHelper';

const colWithSortValues = ['Name', 'Sex', 'Born', 'Died'];

type Props = {
  people: PersonType[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SORT_PARAM) || null;
  const order = searchParams.get(ORDER_PARAM) || null;

  function setParams(param: string) {
    let params;

    if (sort !== param) {
      params = { sort: param, order: null };
    } else if (sort === param && order !== 'desc') {
      params = { order: 'desc' };
    } else if (sort === param && order === 'desc') {
      params = { order: null, sort: null };
    } else {
      params = { order: null, sort: null };
    }

    const search = getSearchWith(params, searchParams);

    return search;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {colWithSortValues.map(item => (
            <th key={item}>
              <span className="is-flex is-flex-wrap-nowrap">
                {item}
                <Link to={{ search: setParams(item.toLowerCase()) }}>
                  <span className="icon">
                    <i className={classNames('fa', {
                      'fa-sort': sort !== item.toLowerCase(),
                      'fa-sort-up': sort === item.toLowerCase() && !order,
                      'fa-sort-down': sort === item.toLowerCase() && order === 'desc',
                    })}
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
        {people?.map(person => {
          if (person.motherName) {
            person.mother = people.find(pers => pers.name === person.motherName);
          }

          if (person.fatherName) {
            person.father = people.find(pers => pers.name === person.fatherName);
          }

          return (
            <Person person={person} key={person.slug} />
          );
        })}
      </tbody>
    </table>
  );
};
