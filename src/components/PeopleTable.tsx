import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FILTER_KEYS } from '../constants/filters';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get(FILTER_KEYS.sort);
  const order = searchParams.get(FILTER_KEYS.order);

  const renderSortHeader = (label: string, field: string) => {
    const isSorted = sort === field;
    const isDesc = isSorted && order === 'desc';

    let nextParams: SearchParams;

    if (!isSorted) {
      nextParams = { [FILTER_KEYS.sort]: field, [FILTER_KEYS.order]: null };
    } else if (!isDesc) {
      nextParams = { [FILTER_KEYS.sort]: field, [FILTER_KEYS.order]: 'desc' };
    } else {
      nextParams = { [FILTER_KEYS.sort]: null, [FILTER_KEYS.order]: null };
    }

    return (
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <SearchLink params={nextParams}>
          <span className="icon">
            <i
              className={classNames('fas', {
                'fa-sort': !isSorted,
                'fa-sort-up': isSorted && !isDesc,
                'fa-sort-down': isSorted && isDesc,
              })}
            />
          </span>
        </SearchLink>
      </span>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>{renderSortHeader('Name', 'name')}</th>
          <th>{renderSortHeader('Sex', 'sex')}</th>
          <th>{renderSortHeader('Born', 'born')}</th>
          <th>{renderSortHeader('Died', 'died')}</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother?.slug}`,
                      search: searchParams.toString(),
                    }}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  <span>{person.motherName ? person.motherName : '-'}</span>
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {person.fatherName}
                  </Link>
                ) : (
                  <span>{person.fatherName ? person.fatherName : '-'}</span>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
