import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortType } from '../types/SortType';
import { getParams } from '../utils/getParams';
import { getThead } from '../utils/getThead';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const { selectedSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort' || '');
  const order = searchParams.get('order' || '');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortType).map(thead => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {getThead(thead)}
                <SearchLink
                  params={getParams(sort, order, thead)}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== thead,
                      'fa-sort-up': sort === thead && !order,
                      'fa-sort-down': order && sort === thead,
                    })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => {
          const {
            sex,
            born,
            died,
            slug,
            motherName,
            fatherName,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother ? (
                <td>
                  <PersonLink person={mother} />
                </td>
              ) : (
                <td>
                  {motherName || '-'}
                </td>
              )}
              {father ? (
                <td>
                  <PersonLink person={father} />
                </td>
              ) : (
                <td>
                  {fatherName || '-'}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
