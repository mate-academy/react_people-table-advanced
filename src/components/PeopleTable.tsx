import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug: string | undefined;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
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
        {people.map((person: Person) => {
          const {
            sex,
            born,
            died,
            slug,
            fatherName,
            motherName,
            father,
            mother,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === selectedSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : (motherName ?? '-')}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : (fatherName ?? '-')}
              </td>
            </tr>
          );
        })}
      </tbody>{' '}
    </table>
  );
};
