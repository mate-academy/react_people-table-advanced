import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { PeopleTableRow } from './PeopleTableRow';
import { Person } from '../types';

const configureIcon = (isActive: boolean, isOrderDesc: boolean) =>
  classNames('fas', {
    'fa-sort': !isActive,
    'fa-sort-down': isActive && isOrderDesc,
    'fa-sort-up': isActive && !isOrderDesc,
  });

type ConfigureNewParamsReturnType =
  | { sort: string; order: null }
  | { order: string }
  | { order: null; sort: null };

const configureNewParams = (
  targetSortedBy: string,
  isOrderDesc: boolean,
  selectedSortedBy: null | string = '',
): ConfigureNewParamsReturnType => {
  if (selectedSortedBy !== targetSortedBy) {
    return { sort: targetSortedBy, order: null };
  }

  if (!isOrderDesc) {
    return { order: 'desc' };
  }

  return { order: null, sort: null };
};

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortedBy = searchParams.get('sort');

  const isOrderDesc = searchParams.get('order') === 'desc';

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
              <SearchLink
                params={configureNewParams('name', isOrderDesc, sortedBy)}
              >
                <span className="icon">
                  <i
                    className={configureIcon(sortedBy === 'name', isOrderDesc)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={configureNewParams('sex', isOrderDesc, sortedBy)}
              >
                <span className="icon">
                  <i
                    className={configureIcon(sortedBy === 'sex', isOrderDesc)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={configureNewParams('born', isOrderDesc, sortedBy)}
              >
                <span className="icon">
                  <i
                    className={configureIcon(sortedBy === 'born', isOrderDesc)}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={configureNewParams('died', isOrderDesc, sortedBy)}
              >
                <span className="icon">
                  <i
                    className={configureIcon(sortedBy === 'died', isOrderDesc)}
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
          <PeopleTableRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
