import React from 'react';
import { Person } from '../../types';
import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getVisiblePeople } from '../../utils/getVisiblePeople';
import { SearchLink } from '../SearchLink';

type PeopleTableProps = {
  peopleList: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ peopleList }) => {
  const { slug: selectedSlug } = useParams();

  const COLUMNS = [
    { label: 'Name', value: 'name' },
    { label: 'Sex', value: 'sex' },
    { label: 'Born', value: 'born' },
    { label: 'Died', value: 'died' },
  ];

  const [searchParams] = useSearchParams();
  const visiblePeople = getVisiblePeople(peopleList, searchParams);

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(column => {
            const isSorted = column.value === sort;
            let nextOrder;

            if (!isSorted) {
              nextOrder = 'asc';
            } else if (order === 'asc') {
              nextOrder = 'desc';
            } else {
              nextOrder = '';
            }

            return (
              <th key={column.value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column.label}
                  <SearchLink
                    params={
                      nextOrder
                        ? { sort: column.value, order: nextOrder }
                        : { sort: null, order: null }
                    }
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !isSorted,
                          'fa-sort-up': isSorted && order === 'asc',
                          'fa-sort-down': isSorted && order === 'desc',
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
        {visiblePeople.map(person => {
          const mother = peopleList.find(p => p.name === person.motherName);
          const father = peopleList.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': selectedSlug === person.slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <Link
                    to={`/people/${mother.slug}`}
                    className={cn('has-text-danger')}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName
                )}
              </td>

              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <Link to={`/people/${father.slug}`}>{father.name}</Link>
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
