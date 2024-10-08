import React, { useMemo } from 'react';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../../utils/getSearchWith';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
  const { slug } = useParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getContent = (
    person: Person | null | undefined,
    personName: string | null,
  ) => {
    if (person) {
      return <PersonLink person={person} />;
    }

    return personName ? personName : '-';
  };

  const columnNames = ['Name', 'Sex', 'Born', 'Died'];

  const getSearch = (columnName: string) => {
    if (columnName !== sort) {
      return getSearchWith(
        {
          sort: columnName,
          order: null,
        },
        searchParams,
      );
    }

    if (columnName === sort && !order) {
      return getSearchWith({ order: 'desc' }, searchParams);
    }

    return getSearchWith(
      {
        sort: null,
        order: null,
      },
      searchParams,
    );
  };

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return people;
    }

    return [...people].sort((person1, person2) => {
      if ((sort === 'name' || sort === 'sex') && !order) {
        return person1[sort].localeCompare(person2[sort]);
      }

      if ((sort === 'born' || sort === 'died') && !order) {
        return person1[sort] - person2[sort];
      }

      if ((sort === 'name' || sort === 'sex') && order) {
        return person2[sort].localeCompare(person1[sort]);
      }

      if ((sort === 'born' || sort === 'died') && order) {
        return person2[sort] - person1[sort];
      }

      return 0;
    });
  }, [people, sort, order]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnNames.map(item => {
            const normalizedItem = item.toLowerCase();

            return (
              <th key={item}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {item}
                  <Link to={{ search: getSearch(normalizedItem) }}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sort !== normalizedItem,
                          'fa-sort-up': sort === normalizedItem && !order,
                          'fa-sort-down': sort === normalizedItem && order,
                        })}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getContent(person.mother, person.motherName)}</td>
            <td>{getContent(person.father, person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
