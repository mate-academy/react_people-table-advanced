/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { SortType } from '../types/sortType';

type Props = {
  people: Person[];
  sort: string | null;
  order: string;
};

export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { persSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        {Object.values(SortType).map((field) => (
          <th key={field}>
            <span className="is-flex is-flex-wrap-nowrap">
              {String(field)}
              <SearchLink
                params={{
                  sort: order === 'desc' && sort === field ? null : field,
                  order: sort === field && !order ? 'desc' : null,
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', 'fa-sort', {
                      'fa-sort-up': sort === field && !order,
                      'fa-sort-down': sort === field && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
        ))}
        <th>Mother</th>
        <th>Father</th>
      </thead>

      <tbody>
        <>
          {people.map(({
            born,
            died,
            name,
            sex: gender,
            slug,
            fatherName,
            motherName,
            mother = people.find(el => el.name === motherName),
            father = people.find(el => el.name === fatherName),
          }) => (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': persSlug === slug,
              })}
            >
              <td>
                <Link
                  to={`../${slug}`}
                  className={classNames({ 'has-text-danger': gender === 'f' })}
                >
                  {name}
                </Link>
              </td>
              <td>{gender}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <Link to={`../${mother.slug}`} className="has-text-danger">
                    {mother.name}
                  </Link>
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link to={`../${father.slug}`}>
                    {father.name}
                  </Link>
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
};
