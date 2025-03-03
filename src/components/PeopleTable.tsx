import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

const getLinkClass = (sex: string) =>
  classNames({
    'has-text-danger': sex === 'f',
  });

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedUserSlug = slug;

  const [searchParams] = useSearchParams();
  const currentOrder = searchParams.get('order') || '';
  const currentSort = searchParams.get('sort') || '';

  function getSortAndOrder(sortField: string) {
    let sort = null;
    let order = null;

    if (!currentSort && !currentOrder) {
      sort = sortField;
      order = null;
    } else if (currentSort && !currentOrder) {
      sort = sortField;
      if (currentSort === sortField) {
        order = 'desc';
      } else {
        order = null;
      }
    } else if (currentSort && currentOrder) {
      if (currentSort === sortField) {
        sort = null;
        order = null;
      } else {
        sort = sortField;
        order = null;
      }
    }

    return { sort: sort, order: order };
  }

  const getIconClass = (sortField: string) =>
    classNames(
      currentSort === sortField
        ? !currentOrder && !currentSort
          ? 'fas fa-sort'
          : currentOrder
            ? 'fas fa-sort-down'
            : 'fas fa-sort-up'
        : 'fas fa-sort',
    );

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
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortAndOrder('name')),
                }}
              >
                <span className="icon">
                  <i className={getIconClass('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortAndOrder('sex')),
                }}
              >
                <span className="icon">
                  <i className={getIconClass('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortAndOrder('born')),
                }}
              >
                <span className="icon">
                  <i className={getIconClass('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(searchParams, getSortAndOrder('died')),
                }}
              >
                <span className="icon">
                  <i className={getIconClass('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const motherSlug = people.find(
            personMother => personMother.name === person.motherName,
          )?.slug;
          const fatherSlug = people.find(
            personFather => personFather.name === person.fatherName,
          )?.slug;

          return (
            <tr
              data-cy="person"
              key={person.name + person.born}
              className={classNames(
                selectedUserSlug === person.slug && 'has-background-warning',
              )}
            >
              <td>
                <Link
                  to={`../${person.slug}`}
                  className={getLinkClass(person.sex)}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName !== null ? (
                  motherSlug ? (
                    <Link to={`../${motherSlug}`} className="has-text-danger">
                      {person.motherName}
                    </Link>
                  ) : (
                    <p>{person.motherName}</p>
                  )
                ) : (
                  <p>-</p>
                )}
              </td>
              <td>
                {person.fatherName !== null ? (
                  fatherSlug ? (
                    <Link to={`../${fatherSlug}`}>{person.fatherName}</Link>
                  ) : (
                    <p>{person.fatherName}</p>
                  )
                ) : (
                  <p>-</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
