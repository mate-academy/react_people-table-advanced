import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParam] = useSearchParams();

  const sort = searchParam.get('sort');
  const order = searchParam.get('order');

  const getClassNameChosePerson = (slug: string) => {
    return slug === personSlug ? 'has-background-warning' : '';
  };

  const getPerson = (personName: string) => {
    const person = people.find(({ name }) => name === personName);

    return person ? <PersonLink person={person} /> : personName;
  };

  const getIconClass = (newSort: string | null) =>
    classNames('fas', {
      'fa-sort': sort !== newSort,
      'fa-sort-up': sort === newSort && !order,
      'fa-sort-down': sort === newSort && order,
    });

  const getSortPeopleParams = (newSort: string) => {
    if (!sort || sort !== newSort) {
      return {
        sort: newSort,
        order: null,
      };
    }

    if (sort && !order) {
      return {
        sort: newSort,
        order: 'desk',
      };
    }

    return {
      sort: null,
      order: null,
    };
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
              <Link
                to={{
                  search: getSearchWith(
                    searchParam,
                    getSortPeopleParams('name'),
                  ),
                }}
              >
                <span className="icon">
                  <i className={getIconClass('name')}></i>
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(
                    searchParam,
                    getSortPeopleParams('sex'),
                  ),
                }}
              >
                <span className="icon">
                  <i className={getIconClass('sex')}></i>
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(
                    searchParam,
                    getSortPeopleParams('born'),
                  ),
                }}
              >
                <span className="icon">
                  <i className={getIconClass('born')}></i>
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(
                    searchParam,
                    getSortPeopleParams('died'),
                  ),
                }}
              >
                <span className="icon">
                  <i className={getIconClass('died')}></i>
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
          const { name, sex, born, died, motherName, fatherName, slug } =
            person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={getClassNameChosePerson(slug)}
            >
              <td>{getPerson(name)}</td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{motherName ? getPerson(motherName) : '-'}</td>
              <td>{fatherName ? getPerson(fatherName) : '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
