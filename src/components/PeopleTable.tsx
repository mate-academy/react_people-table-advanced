import { Link, useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  people: Person[];
  preparedPeople: Person[];
};

const columns = [
  { columnName: 'Name', sortURL: 'name' },
  { columnName: 'Sex', sortURL: 'sex' },
  { columnName: 'Born', sortURL: 'born' },
  { columnName: 'Died', sortURL: 'died' },
  { columnName: 'Mother', sortURL: null },
  { columnName: 'Father', sortURL: null },
];

export const PeopleTable: React.FC<Props> = ({ people, preparedPeople }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const arrowSort = searchParams.get('sort') || '';
  const orderSort = searchParams.get('order') || '';

  function getSortURL(sortURL: string) {
    let newSortParams = getSearchWith(searchParams, {
      sort: sortURL,
    });

    if (arrowSort !== sortURL) {
      newSortParams = getSearchWith(newSortParams, {
        order: null,
      });
    }

    if (arrowSort === sortURL) {
      newSortParams = getSearchWith(newSortParams, {
        order: 'desc',
      });
    }

    if (orderSort && arrowSort === sortURL) {
      newSortParams = getSearchWith(newSortParams, {
        order: null,
        sort: null,
      });
    }

    return newSortParams;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ columnName, sortURL }) =>
            sortURL ? (
              <th key={sortURL}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  <Link to={{ search: getSortURL(sortURL) }}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': arrowSort !== sortURL,
                          'fa-sort-up': arrowSort === sortURL && !orderSort,
                          'fa-sort-down': arrowSort === sortURL && orderSort,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            ) : (
              <th key={columnName}>{columnName}</th>
            ),
          )}
        </tr>
      </thead>

      <tbody>
        {preparedPeople?.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: personSlug,
          } = person;

          const mother = people.find(
            parent => parent.name === person.motherName,
          );
          const father = people.find(
            parent => parent.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={personSlug}
              className={classNames({
                'has-background-warning': personSlug === slug,
              })}
            >
              <td>{person && <PersonLink person={person} />}</td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
