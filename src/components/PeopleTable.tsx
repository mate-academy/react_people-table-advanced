import { useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { Sort } from '../types/Sort';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (field: Sort) => {
    if (field === sort && !order) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    if (field === sort && order) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: field,
      order: null,
    };
  };

  function getStyleSortIcon(sortParams: Sort) {
    return classNames(
      'fas',
      { 'fa-sort': !sort || sort !== sortParams },
      { 'fa-sort-up': sort === sortParams && !order },
      { 'fa-sort-down': sort === sortParams && order },
    );
  }

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
                params={getSortParams(Sort.Name)}
              >
                <span className="icon">
                  <i className={getStyleSortIcon(Sort.Name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortParams(Sort.Sex)}
              >
                <span className="icon">
                  <i className={getStyleSortIcon(Sort.Sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortParams(Sort.Born)}
              >
                <span className="icon">
                  <i className={getStyleSortIcon(Sort.Born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortParams(Sort.Died)}
              >
                <span className="icon">
                  <i className={getStyleSortIcon(Sort.Died)} />
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
          <tr
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
            data-cy="person"
            key={person.slug}
          >
            <td
              aria-label={`${person.name}`}
            >
              <PersonLink
                person={person}
              />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
