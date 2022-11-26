import React, { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchParams } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

const tableHeaders = ['Name', 'Sex', 'Born', 'Died'];

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
  sortPeople: (
    people: Person[],
    sortKey: string | null,
    order: string | null,
  ) => Person[];
};

export const PeopleTable: React.FC<Props> = ({
  people,
  searchParams,
  sortPeople,
}) => {
  const { personSlug = '' } = useParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || null;

  const checkNameInPeople = useCallback((parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const foundPerson = people.find(parent => parent.name === parentName);

    return foundPerson ? <PersonLink person={foundPerson} /> : parentName;
  }, [people]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return people;
    }

    return sortPeople(people, sort, order);
  }, [sort, order, people]);

  const getCorrectSearchParams: (tableHeader: string) =>
  SearchParams = (tableHeader) => {
    if (!sort) {
      return { sort: tableHeader, order: null };
    }

    if (sort !== tableHeader) {
      return { sort: tableHeader, order: null };
    }

    if (sort === tableHeader && !order) {
      return { order: 'desc', sort: tableHeader };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>

          {tableHeaders.map(tableHeader => (
            <th key={tableHeader}>
              <span className="is-flex is-flex-wrap-nowrap">
                {tableHeader}
                <SearchLink
                  params={getCorrectSearchParams(tableHeader.toLowerCase())}
                >
                  <span className="icon">
                    <i className={classNames('fas',
                      { 'fa-sort': !sort || sort !== tableHeader }, {
                        'fa-sort-up': sort === tableHeader.toLowerCase()
                        && order,
                      }, {
                        'fa-sort-down': sort === tableHeader.toLowerCase()
                      && !order,
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
        {sortedPeople.map(person => {
          const {
            sex, born, died, fatherName, motherName, slug,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': personSlug === person.slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{checkNameInPeople(motherName)}</td>
              <td>{checkNameInPeople(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
