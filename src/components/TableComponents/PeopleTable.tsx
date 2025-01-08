/* eslint-disable jsx-a11y/control-has-associated-label */

import { FC } from 'react';
import { Person } from '../../types';
import { PersonComponent } from './PersonComponent';
import { SearchLink } from '../SearchLink';
import classNames from 'classnames';

const TABLEHEAD = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

type Props = {
  peopleList: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: FC<Props> = ({ peopleList, searchParams }) => {
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const isPeopleListEmpty = peopleList.length === 0;

  return (
    <>
      {isPeopleListEmpty ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              {TABLEHEAD.map(head => {
                const sortEn = (!order && head.toLowerCase()) || null;
                const sortDec =
                  (sort === head.toLowerCase() && sortEn && 'dec') || null;

                const isShowIcon = head === 'Mother' || head === 'Father';

                return (
                  <th key={head}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {head}
                      <SearchLink params={{ sort: sortEn, order: sortDec }}>
                        {!isShowIcon && (
                          <span className="icon">
                            <i
                              className={classNames('fas', {
                                'fa-sort': sort !== head.toLowerCase(),
                                'fa-sort-up':
                                  sort === head.toLowerCase() && sortDec,
                                'fa-sort-down':
                                  sort === head.toLowerCase() && !sortDec,
                              })}
                            />
                          </span>
                        )}
                      </SearchLink>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {peopleList.map(person => (
              <PersonComponent key={person.name} person={person} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
