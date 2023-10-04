import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { People } from './People';
import {
  FATHER_THEAD_TITLE,
  MOTHER_THEAD_TITLE,
  THEAD_TITLES,
} from '../utils/constants';
import { SearchLink } from './SearchLink';
import { getSortedParams } from '../helpers/getSortedParams';

type Props = {
  sort: string,
  order: string,
  persons: Person[],
};

export const PeopleList: React.FC<Props> = ({
  sort,
  order,
  persons,
}) => {
  const isParentsExist = (title: string) => {
    return (MOTHER_THEAD_TITLE === title || FATHER_THEAD_TITLE === title);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {THEAD_TITLES.map(title => {
            const normalizedTitle = title.toLowerCase();

            return (
              <th key={title}>
                {isParentsExist(title)
                  ? (
                    <span className="is-flex is-flex-wrap-nowrap">
                      {title}
                    </span>
                  ) : (
                    <span className="is-flex is-flex-wrap-nowrap">
                      {title}
                      <SearchLink params={getSortedParams(
                        normalizedTitle,
                        sort,
                        order,
                      )}
                      >
                        <span className="icon">
                          <i
                            className={classNames('fas', {
                              'fa-sort': sort !== normalizedTitle,
                              'fa-sort-up': sort === normalizedTitle && !order,
                              'fa-sort-down': sort === normalizedTitle && order,
                            })}
                          />
                        </span>
                      </SearchLink>
                    </span>
                  )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {persons.map(person => (
          <People key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
