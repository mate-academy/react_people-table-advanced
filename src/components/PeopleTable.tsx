import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonSort } from '../types/PersonSort';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[],
  personSort: (value: string) => void,
  sortFild: string,
  order: string,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  personSort,
  sortFild,
  order,
}) => {
  const { search } = useLocation();

  const findFather = (name: string | null) => {
    const father = people.find(person => person.name === name);

    return father;
  };

  const findMother = (name: string | null) => {
    const mother = people.find(person => person.name === name);

    return mother;
  };

  const { slug } = useParams();

  const sortWithName = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    personSort(PersonSort.Name);
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
              <a
                href="?sort=name"
                onClick={sortWithName}
              >
                <span className="icon">
                  <i
                    className={classNames('fas ', {
                      'fa-sort': sortFild !== PersonSort.Name,
                      'fa-sort-up': sortFild === PersonSort.Name && !order,
                      'fa-sort-down': sortFild === PersonSort.Name && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={(e) => {
                  e.preventDefault();
                  personSort(PersonSort.Sex);
                }}
                href="#/people?sort=sex"
              >
                <span className="icon">
                  <i
                    className={classNames('fas ', {
                      'fa-sort': sortFild !== PersonSort.Sex,
                      'fa-sort-up': sortFild === PersonSort.Sex && !order,
                      'fa-sort-down': sortFild === PersonSort.Sex && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={(e) => {
                  e.preventDefault();
                  personSort(PersonSort.Born);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas ', {
                      'fa-sort': sortFild !== PersonSort.Born,
                      'fa-sort-up': sortFild === PersonSort.Born && !order,
                      'fa-sort-down': sortFild === PersonSort.Born && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={(e) => {
                  e.preventDefault();
                  personSort(PersonSort.Died);
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortFild !== PersonSort.Died,
                      'fa-sort-up': sortFild === PersonSort.Died && !order,
                      'fa-sort-down': sortFild === PersonSort.Died && order,
                    })}
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link
                to={{ pathname: `/people/${person.slug}`, search }}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>
            <td>
              {person.sex}
            </td>
            <td>
              {person.born}
            </td>
            <td>
              {person.died}
            </td>
            <td>
              {findMother(person.motherName)
                ? (
                  <Link
                    to={
                      {
                        pathname: `/people/${findFather(person.motherName)?.slug}`,
                        search,
                      }
                    }
                    className="has-text-danger"
                  >
                    {person.motherName || '-'}
                  </Link>
                )
                : person.motherName || '-'}
            </td>
            <td>
              {findFather(person.fatherName)
                ? (
                  <Link
                    to={
                      {
                        pathname: `/people/${findFather(person.fatherName)?.slug}`,
                        search,
                      }
                    }
                  >
                    {person.fatherName || '-'}
                  </Link>
                )
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
