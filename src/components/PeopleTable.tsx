import React, { useCallback, useMemo } from 'react';
import {
  NavLink, useLocation, useParams, useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';

import { generateNavLink } from '../utils/generateNavLink';

import { Person } from '../types';
import { SortOrder, SortQuery } from '../types/SortParams';

interface Props {
  peopleData: Person[];
  initialPeopleData: Person[];
  setSortQuery: React.Dispatch<React.SetStateAction<SortQuery>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortQuery: SortQuery;
  sortOrder: SortOrder;
}

const { ASC, DESC } = SortOrder;

const {
  INITIAL,
} = SortQuery;

const tableSortQueries = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({
  peopleData,
  initialPeopleData,
  setSortQuery,
  setSortOrder,
  sortQuery,
  sortOrder,
}) => {
  const { personID } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const currentPathName = location.pathname;

  const findPerson = useMemo(
    () => (personName: string | null) => {
      const parent = initialPeopleData.find(
        (personFromAPI) => personFromAPI.name === personName,
      );

      if (parent) {
        return generateNavLink(parent, searchParams);
      }

      return personName || '-';
    },
    [initialPeopleData],
  );

  const handleSortLinkClick = useCallback((query: SortQuery) => {
    if (sortQuery !== query) {
      setSortQuery(query);

      return;
    }

    if (sortQuery === query && sortOrder === ASC) {
      setSortOrder(DESC);

      return;
    }

    if (sortQuery === query && sortOrder === DESC) {
      setSortQuery(INITIAL);
      setSortOrder(ASC);

      return;
    }

    setSortQuery(query);
  }, [sortQuery, sortOrder]);

  const generateSortURL = useCallback((query: SortQuery) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const isOrdered = currentParams.has('order');
    const isSortedByCurrentQuery = currentParams.get('sort') === query;

    if (isOrdered && isSortedByCurrentQuery) {
      currentParams.delete('order');
      currentParams.delete('sort');

      return `${currentPathName}?${currentParams.toString()}`;
    }

    if (isSortedByCurrentQuery) {
      currentParams.append('order', DESC);
    } else {
      currentParams.set('sort', query);
      currentParams.delete('order');
    }

    return `${currentPathName}?${currentParams.toString()}`;
  }, [searchParams, currentPathName]);

  const iconClass = useMemo(() => (query: SortQuery) => {
    if (sortOrder === ASC && query === sortQuery) {
      return 'fas fa-sort-up';
    }

    if (sortOrder === DESC && query === sortQuery) {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  }, [sortQuery, sortOrder]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSortQueries.map(query => {
            const newSortQuery = query.toLowerCase() as SortQuery;

            return (
              <th key={query}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {query}
                  <NavLink
                    to={generateSortURL(newSortQuery)}
                    onClick={() => handleSortLinkClick(newSortQuery)}
                  >
                    <span className="icon">
                      <i className={iconClass(newSortQuery)} />
                    </span>
                  </NavLink>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleData?.map((person: Person) => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': personID === slug,
              })}
            >
              <td>{generateNavLink(person, searchParams)}</td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findPerson(motherName)}</td>
              <td>{findPerson(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
