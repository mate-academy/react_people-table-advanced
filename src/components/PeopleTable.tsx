/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { sortList } from '../utils/filterAndSort';

const NONAME = '-';

type Props = {
  personInfo: string | undefined;
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ personInfo, people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const findParent = (nameParent: string | null) => {
    return people.find(person => nameParent === person.name);
  };

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortedPeople = sortList(people, { sort, order });

  const setSearchWith = (paramToUpdate: SearchParams) => {
    const newParams = getSearchWith(searchParams, paramToUpdate);

    setSearchParams(newParams);
  };

  const handleSort = (
    field: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (sort === field) {
      if (order) {
        setSearchWith({
          sort: null,
          order: null,
        });

        return;
      }

      setSearchWith({ order: 'desc' });

      return;
    }

    setSearchWith({ sort: field });
  };

  const addClassBySort = (field: string) => {
    if (sort === field) {
      if (order) {
        return 'fa-sort-down';
      }

      return 'fa-sort-up';
    }

    return 'fa-sort';
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
              <a href="#/people?sort=name" onClick={e => handleSort('name', e)}>
                <span className="icon">
                  <i className={`fas ${addClassBySort('name')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex" onClick={e => handleSort('sex', e)}>
                <span className="icon">
                  <i className={`fas ${addClassBySort('sex')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={e => handleSort('born', e)}
              >
                <span className="icon">
                  <i className={`fas ${addClassBySort('born')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died" onClick={e => handleSort('died', e)}>
                <span className="icon">
                  <i className={`fas ${addClassBySort('died')}`} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(
          ({ name, sex, born, died, fatherName, motherName, slug }) => {
            const father = findParent(fatherName);
            const mother = findParent(motherName);

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': personInfo === slug,
                })}
              >
                <td>
                  <PersonLink
                    person={{
                      name,
                      sex,
                      born,
                      died,
                      fatherName,
                      motherName,
                      slug,
                    }}
                  />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {!mother ? (
                    motherName || NONAME
                  ) : (
                    <PersonLink person={mother} />
                  )}
                </td>
                <td>
                  {!father ? (
                    fatherName || NONAME
                  ) : (
                    <PersonLink person={father} />
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
