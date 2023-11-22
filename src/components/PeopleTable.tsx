import React, { } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortParams } from '../types/SortParams';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setUrlName = (columnName: string) => {
    if (sort !== columnName) {
      return { sort: columnName, order: null };
    }

    if (!order) {
      return { sort: columnName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getPersonLink = (
    person: Person | undefined,
    parent?: string | null,
  ) => {
    return person
      ? (
        <PersonLink
          person={person}
        />
      )
      : parent || '-';
  };

  const getParent = (name: string | null) => {
    return people.find(person => person.name === name);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortParams).map(param => {
            const normalizeParam = param
              .replace(param[0], param[0].toUpperCase());

            return (
              <th key={param}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {normalizeParam}
                  <SearchLink
                    params={setUrlName(param)}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas fa-sort', {
                          'fa-sort-up': sort === param && !order,
                          'fa-sort-down': sort === param && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({ 'has-background-warning': slug === personSlug })}
            >
              <td>
                {getPersonLink(person)}
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {getPersonLink(getParent(motherName), motherName)}
              </td>

              <td>
                {getPersonLink(getParent(fatherName), fatherName)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
