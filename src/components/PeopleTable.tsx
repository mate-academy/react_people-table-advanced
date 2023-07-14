import { FC } from 'react';
import classnames from 'classnames';
import { useMatch } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable:FC<Props> = ({
  people,
}) => {
  const match = useMatch('/people/:slug');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              <SearchLink
                params={{ sort: 'name' }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
              {/* Name
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a> */}
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
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classnames({
              'has-background-warning': (
                match?.params.slug === person.slug
              ),
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : `${person.motherName}`}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : `${person.fatherName}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
