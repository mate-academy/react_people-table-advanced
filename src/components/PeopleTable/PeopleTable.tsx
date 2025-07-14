import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { NavigateOptions, URLSearchParamsInit } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  sort: string;
  order: string;
  filteredPeople: Person[];
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOpts?: NavigateOptions,
  ) => void;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  sort,
  order,
  filteredPeople,
  searchParams,
  setSearchParams,
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    type: string,
  ) => {
    e.preventDefault();
    searchParams.delete('order');

    let newSort = '';
    let newOrder = '';
    let newParams = '';

    if (sort !== type) {
      newSort = type;
      newParams = getSearchWith(searchParams, {
        sort: newSort,
      });
    } else if (sort === type && order !== 'desc') {
      newOrder = 'desc';

      newParams = getSearchWith(searchParams, {
        sort,
        order: newOrder,
      });
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const handleClassName = (type: string): string => {
    if (sort === type && order !== 'desc') {
      return 'fa-sort-up';
    }

    if (sort === type && order === 'desc') {
      return 'fa-sort-down';
    }

    return 'fa-sort';
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
              <a onClick={e => handleClick(e, 'name')}>
                <span className="icon">
                  <i className={classNames('fas', handleClassName('name'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={e => handleClick(e, 'sex')}>
                <span className="icon">
                  <i className={classNames('fas', handleClassName('sex'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={e => handleClick(e, 'born')}>
                <span className="icon">
                  <i className={classNames('fas', handleClassName('born'))} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={e => handleClick(e, 'died')}>
                <span className="icon">
                  <i className={classNames('fas', handleClassName('died'))} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople &&
          filteredPeople.length > 0 &&
          filteredPeople.map((person, index) => (
            <PersonLink key={index} person={person} people={filteredPeople} />
          ))}
      </tbody>
    </table>
  );
};
