/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { getSortParams, toggleSortArrows } from '../utils/Actions';

export const PeopleTable = ({ people }: { people: Person[] | null }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const order = searchParams.get('order');
  const sort = searchParams.get('sort');

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
              <NavLink
                to={{
                  pathname: `/people/${slug ? slug : ''}`,
                  search: `?${getSearchWith(searchParams, getSortParams(sort, order, 'name'))}`,
                }}
              >
                <span className="icon">
                  <i className={toggleSortArrows(sort, order, 'name')} />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <NavLink
                to={{
                  pathname: `/people/${slug ? slug : ''}`,
                  search: `?${getSearchWith(searchParams, getSortParams(sort, order, 'sex'))}`,
                }}
              >
                <span className="icon">
                  <i className={toggleSortArrows(sort, order, 'sex')} />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <NavLink
                to={{
                  pathname: `/people/${slug ? slug : ''}`,
                  search: `?${getSearchWith(searchParams, getSortParams(sort, order, 'born'))}`,
                }}
              >
                <span className="icon">
                  <i className={toggleSortArrows(sort, order, 'born')} />
                </span>
              </NavLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <NavLink
                to={{
                  pathname: `/people/${slug ? slug : ''}`,
                  search: `?${getSearchWith(searchParams, getSortParams(sort, order, 'died'))}`,
                }}
              >
                <span className="icon">
                  <i className={toggleSortArrows(sort, order, 'died')} />
                </span>
              </NavLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : person.fatherName ? (
                person.fatherName
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
