import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from './Loader';
import { Person } from '../types';
import {
  FEMAL_GENDER,
  NOT_SET_VALUE,
} from '../utils/constans';
import { SortType } from '../utils/SortType';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  visiblePeople: Person[];
  isError: boolean;
  isLoading: boolean;
  people: Person[];
  sort: string;
  order: string;
  getSortParams: (sortType: SortType) => SearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  visiblePeople,
  isError,
  isLoading,
  people,
  sort,
  order,
  getSortParams,
}) => {
  const { selectedPersonSlug } = useParams();

  if (isError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortType).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink params={getSortParams(value)}>
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== value,
                      'fa-sort-up': sort === value && !order,
                      'fa-sort-down': sort === value && order,
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
        {visiblePeople.map(({
          slug,
          sex,
          name,
          born,
          died,
          motherName,
          fatherName,
          mother,
          father,
        }) => (
          <tr
            data-cy="person"
            className={classNames(
              { 'has-background-warning': selectedPersonSlug === slug },
            )}
            key={slug}
          >
            <td>
              <a
                className={classNames(
                  { 'has-text-danger': sex === FEMAL_GENDER },
                )}
                href={`#/people/${slug}`}
              >
                {name}
              </a>
            </td>

            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>

            <td>
              {mother ? (
                <a
                  className="has-text-danger"
                  href={`#/people/${mother.slug}`}
                >
                  {motherName}
                </a>
              ) : (
                motherName || NOT_SET_VALUE
              )}
            </td>

            <td>
              {father ? (
                <a
                  href={`#/people/${father.slug}`}
                >
                  {fatherName}
                </a>
              ) : (
                fatherName || NOT_SET_VALUE
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
