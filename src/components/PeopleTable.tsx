/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types/Person';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import { SortFields } from '../types/SortFields';
import { SortOrder } from '../types/SortOrder';

type Props = {
  people: Person[];
  sortField: SortFields;
  handleSort: (field: SortFields) => void;
  sortOrder: SortOrder;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  sortField,
  handleSort,
  sortOrder,
}) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th
            onClick={() => {
              handleSort('name');
            }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': !(
                          (sortOrder === 'asc' || sortOrder === 'desc') &&
                          sortField === 'name'
                        ),
                      },
                      {
                        'fa-sort-up':
                          sortOrder === 'asc' && sortField === 'name',
                      },
                      {
                        'fa-sort-down':
                          sortOrder === 'desc' && sortField === 'name',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th
            onClick={() => {
              handleSort('sex');
            }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': !(
                          (sortOrder === 'asc' || sortOrder === 'desc') &&
                          sortField === 'sex'
                        ),
                      },
                      {
                        'fa-sort-up':
                          sortOrder === 'asc' && sortField === 'sex',
                      },
                      {
                        'fa-sort-down':
                          sortOrder === 'desc' && sortField === 'sex',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th
            onClick={() => {
              handleSort('born');
            }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': !(
                          (sortOrder === 'asc' || sortOrder === 'desc') &&
                          sortField === 'born'
                        ),
                      },
                      {
                        'fa-sort-up':
                          sortOrder === 'asc' && sortField === 'born',
                      },
                      {
                        'fa-sort-down':
                          sortOrder === 'desc' && sortField === 'born',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th
            onClick={() => {
              handleSort('died');
            }}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': !(
                          (sortOrder === 'asc' || sortOrder === 'desc') &&
                          sortField === 'died'
                        ),
                      },
                      {
                        'fa-sort-up':
                          sortOrder === 'asc' && sortField === 'died',
                      },
                      {
                        'fa-sort-down':
                          sortOrder === 'desc' && sortField === 'died',
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                ></PersonLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} className="has-text-danger" />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
