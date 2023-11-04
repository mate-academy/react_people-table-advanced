import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const { slug } = useParams();
  const currentSlug = slug || '';

  const setSortOrder = (sortQuery: string) => {
    if (sort !== sortQuery) {
      return { sort: sortQuery, order: null };
    }

    if (!order) {
      return { sort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getLinkClass = (value: string) => classNames(
    'fas',
    {
      'fa-sort': sort !== value,
    },
    {
      'fa-sort-up': sort === value && !order,
    },
    {
      'fa-sort-down': sort === value && order,
    },
  );

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
                params={setSortOrder('name')}
              >
                <span className="icon">
                  <i className={getLinkClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={setSortOrder('sex')}
              >
                <span className="icon">
                  <i className={getLinkClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={setSortOrder('born')}
              >
                <span className="icon">
                  <i className={getLinkClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={setSortOrder('died')}
              >
                <span className="icon">
                  <i className={getLinkClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === currentSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {
                person.mother
                  ? <PersonLink person={person.mother} />
                  : person.motherName || '-'
              }
            </td>
            <td>
              {
                person.father
                  ? <PersonLink person={person.father} />
                  : person.fatherName || '-'
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
