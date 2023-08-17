/* eslint-disable max-len */
import React from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { generateNavLink } from '../utils/generateNavLink';
import { Person } from '../types';
import { SortOrder, SortQuery } from '../types/SortQuery';

interface Props {
  peopleData: Person[];
  initialPeopleData: Person[];
  setSortQuery: React.Dispatch<React.SetStateAction<SortQuery>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
  sortQuery: SortQuery;
  sortOrder: SortOrder;
}

const { ASC, DESC } = SortOrder;

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

  const findPerson = React.useMemo(
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

  const handleSortLinkClick = (query: SortQuery) => {
    if (sortQuery === query && sortOrder && DESC) {
      setSortQuery(SortQuery.INITIAL);

      return;
    }

    setSortQuery(query);
    setSortOrder((prevOrder) => {
      if (prevOrder === ASC) {
        return DESC;
      }

      return ASC;
    });
  };

  const generateSortURL = (query: SortQuery) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (currentParams.has('order')) {
      currentParams.delete('order');
      currentParams.delete('sort');

      return `/people?${currentParams.toString()}`;
    }

    if (currentParams.has('sort')) {
      currentParams.append('order', DESC);
    } else {
      currentParams.set('sort', query);
    }

    return `/people?${currentParams.toString()}`;
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
              <NavLink
                to={generateSortURL(SortQuery.NAME)}
                onClick={() => handleSortLinkClick(SortQuery.NAME)}
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
                to={generateSortURL(SortQuery.SEX)}
                onClick={() => handleSortLinkClick(SortQuery.SEX)}
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
                to={generateSortURL(SortQuery.BORN)}
                onClick={() => handleSortLinkClick(SortQuery.BORN)}
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
                to={generateSortURL(SortQuery.DIED)}
                onClick={() => handleSortLinkClick(SortQuery.DIED)}
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
