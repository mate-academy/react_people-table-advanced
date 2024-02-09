/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useCallback } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order') || '';

  const getSortLink = useCallback((property: string) => {
    if (sortBy === property && order === 'desc') {
      return getSearchWith(searchParams, { sort: null, order: null });
    }

    if (sortBy === property && !order) {
      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: property, order: null });
  }, [order, searchParams, sortBy]);

  const getSortLinkClass = useCallback((property: string) => classNames('fas', {
    'fa-sort': sortBy !== property,
    'fa-sort-up': !order && sortBy === property,
    'fa-sort-down': order && sortBy === property,
  }), [order, sortBy]);

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
              <Link to={{
                search: getSortLink('name'),
              }}
              >
                <span className="icon">
                  <i className={getSortLinkClass('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{
                search: getSortLink('sex'),
              }}
              >
                <span className="icon">
                  <i className={getSortLinkClass('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{
                search: getSortLink('born'),
              }}
              >
                <span className="icon">
                  <i className={getSortLinkClass('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{
                search: getSortLink('died'),
              }}
              >
                <span className="icon">
                  <i className={getSortLinkClass('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(({
          name,
          sex,
          born,
          died,
          slug,
          father,
          mother,
          motherName,
          fatherName,
        }) => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': selectedSlug === slug,
            })}
          >
            <td>
              <PersonLink name={name} sex={sex} slug={slug} />
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {mother ? (
                <PersonLink name={mother.name} sex="f" slug={mother.slug} />
              ) : motherName || '-'}
            </td>
            <td>
              {father ? (
                <PersonLink name={father.name} sex="m" slug={father.slug} />
              ) : fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
