import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slugId } = useParams();
  const sortType = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getParentLink = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = people.find(par => par.name === name);

    if (parent) {
      return (
        <PersonLink
          person={parent}
        />
      );
    }

    return name;
  };

  const getSortParams = (changeSort: string) => {
    const newSort = sortType === changeSort && order === 'desc'
      ? null
      : changeSort;

    let newOrder = null;

    if (sortType === changeSort) {
      newOrder = order
        ? null
        : 'desc';
    }

    const newParams = {
      sort: newSort,
      order: newOrder,
    };

    return newParams;
  };

  const getSortClass = (changeSort: string) => {
    return classNames(
      'fas',
      { 'fa-sort': sortType !== changeSort },
      { 'fa-sort-up': sortType === changeSort && order !== 'desc' },
      { 'fa-sort-down': sortType === changeSort && order === 'desc' },
    );
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
              <SearchLink
                params={getSortParams('name')}
              >
                <span className="icon">
                  <i
                    className={getSortClass('name')}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortParams('sex')}
              >
                <span className="icon">
                  <i
                    className={getSortClass('sex')}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortParams('born')}
              >
                <span className="icon">
                  <i
                    className={getSortClass('born')}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortParams('died')}
              >
                <span className="icon">
                  <i
                    className={getSortClass('died')}
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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
          } = person;

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={classNames({
                'has-background-warning': person.slug === slugId,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getParentLink(motherName)}</td>
              <td>{getParentLink(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
