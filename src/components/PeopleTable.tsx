import React, { useCallback, useMemo } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
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
  NAME,
  SEX,
  BORN,
  DIED,
  INITIAL,
} = SortQuery;

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

  const findPerson = useMemo(
    () => (personName: string | null) => {
      const parent = initialPeopleData.find(
        (personFromAPI) => personFromAPI.name === personName,
      );

      if (parent) {
        return generateNavLink(parent);
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

      return `/people?${currentParams.toString()}`;
    }

    if (isSortedByCurrentQuery) {
      currentParams.append('order', DESC);
    } else {
      currentParams.set('sort', query);
      currentParams.delete('order');
    }

    return `/people?${currentParams.toString()}`;
  }, [searchParams]);

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
              <NavLink
                to={generateSortURL(NAME)}
                onClick={() => handleSortLinkClick(NAME)}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <NavLink
                to={generateSortURL(SEX)}
                onClick={() => handleSortLinkClick(SEX)}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <NavLink
                to={generateSortURL(BORN)}
                onClick={() => handleSortLinkClick(BORN)}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <NavLink
                to={generateSortURL(DIED)}
                onClick={() => handleSortLinkClick(DIED)}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </NavLink>
            </span>
          </th>

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
              <td>{generateNavLink(person)}</td>

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
