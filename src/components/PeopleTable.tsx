import { FC } from 'react';
import { Person } from '../types';
import { Link, NavLink } from 'react-router-dom';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: FC<Props> = ({ people }) => {
  console.log(people);

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
        {people.map(person => {
          const { name, sex, born, died, father, slug, mother } = person;
          const classSex = sex === 'f' ? 'has-text-danger' : '';

          return (
            <tr data-cy="person" key={slug}>
              <td>
                <NavLink to={`${slug}`} className={classSex}>
                  {name}
                </NavLink>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {mother ? (
                <td>
                  <NavLink className={classSex} to={`${mother.slug}`}>
                    {mother.name}
                  </NavLink>
                </td>
              ) : (
                <td>-</td>
              )}

              {father ? (
                <td>
                  <NavLink className={classSex} to={`${father.slug}`}>
                    {father.name}
                  </NavLink>
                </td>
              ) : (
                <td>-</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
