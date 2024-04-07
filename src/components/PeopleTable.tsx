import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  const toggleByParams = (param: string): SearchParams => {
    if (param === sort) {
      if (order === 'desc') {
        return { sort: null, order: null };
      }

      return { sort: param, order: 'desc' };
    }

    return { sort: param };
  };

  const getClassParams = (param: string) => {
    if (param === sort) {
      if (order === 'desc') {
        return 'fas fa-sort-up';
      }

      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  const getCentury = (year: number) => Math.floor(year / 100) + 1;

  const preparePeopleList = [...people]
    .sort((p1, p2) => {
      let res = 0;

      switch (sort) {
        case 'name':
          res = p1.name.localeCompare(p2.name);
          break;
        case 'sex':
          res = p1.sex.localeCompare(p2.sex);
          break;

        case 'born':
          res = p2.born - p1.born;
          break;

        case 'died':
          res = p2.died - p1.died;
          break;

        default:
          res = 0;
          break;
      }

      return order ? -res : res;
    })
    .filter(person => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) &&
        person.sex.includes(sex) &&
        (centuries.length
          ? centuries.includes(`${getCentury(person.born)}`)
          : true)
      );
    });

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
              <SearchLink params={toggleByParams('name')}>
                <span className="icon">
                  <i className={getClassParams('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={toggleByParams('sex')}>
                <span className="icon">
                  <i className={getClassParams('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={toggleByParams('born')}>
                <span className="icon">
                  <i className={getClassParams('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={toggleByParams('died')}>
                <span className="icon">
                  <i className={getClassParams('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {preparePeopleList.map(person => (
          <PersonLink people={people} person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
