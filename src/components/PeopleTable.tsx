import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  preparedPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, preparedPeople }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const currSort = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  function getSortURL(sortURL: string) {
    let newSortParams = getSearchWith(searchParams, {
      sort: sortURL,
    });

    if (currSort !== sortURL) {
      newSortParams = getSearchWith(newSortParams, {
        order: null,
      });
    }

    if (sortURL === currSort) {
      newSortParams = getSearchWith(newSortParams, {
        order: 'desc',
      });
    }

    if (sortOrder && currSort === sortURL) {
      newSortParams = getSearchWith(newSortParams, {
        order: null,
        sort: null,
      });
    }

    return newSortParams;
  }

  const columns = [
    { columnName: 'Name', sortURL: 'name' },
    { columnName: 'Sex', sortURL: 'sex' },
    { columnName: 'Born', sortURL: 'born' },
    { columnName: 'Died', sortURL: 'died' },
    { columnName: 'Mother', sortURL: null },
    { columnName: 'Father', sortURL: null },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ columnName, sortURL }) => (
            sortURL
              ? (
                <th key={columnName}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {columnName}
                    <Link to={{ search: getSortURL(sortURL) }}>
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort': currSort !== sortURL,
                            'fa-sort-up': currSort === sortURL && !sortOrder,
                            'fa-sort-down': currSort === sortURL && sortOrder,
                          })}
                        />
                      </span>
                    </Link>
                  </span>
                </th>
              )
              : <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {preparedPeople?.map((person) => {
          const {
            sex, born, died, motherName, fatherName, slug: personSlug,
          } = person;

          const mother = people.find(
            parent => parent.name === motherName,
          );
          const father = people.find(
            parent => parent.name === fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={personSlug}
              className={cn({
                'has-background-warning': personSlug === slug,
              })}
            >
              <td>
                {person && <PersonLink person={person} />}
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
