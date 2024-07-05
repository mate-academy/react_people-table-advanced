/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';

interface Props {
  filteredPeopleList: Person[];
}
export const PeopleTable: React.FC<Props> = ({ filteredPeopleList }) => {
  const { personSlug } = useParams();

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeopleList.map(
          ({
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            fatherSlug,
            motherSlug,
          }) => {
            return (
              <tr
                key={slug}
                data-cy="person"
                className={`${slug === personSlug && 'has-background-warning'}`}
              >
                <td>
                  <a
                    href={`#/people/${slug}`}
                    className={`${sex === 'f' && 'has-text-danger'}`}
                  >
                    {name}
                  </a>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {motherSlug ? (
                    <a
                      href={`#/people/${motherSlug}`}
                      className={'has-text-danger'}
                    >
                      {motherName}
                    </a>
                  ) : (
                    <span>{motherName || '-'}</span>
                  )}
                </td>
                <td>
                  {fatherSlug ? (
                    <a href={`#/people/${fatherSlug}`}>{fatherName}</a>
                  ) : (
                    <span>{fatherName || '-'}</span>
                  )}
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
