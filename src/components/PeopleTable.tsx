import classNames from 'classnames';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const location = useLocation();

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
        {people.map((
          {
            sex,
            born,
            died,
            name,
            mother,
            slug,
            father,
            motherName,
            fatherName,
          },
        ) => (
          <tr
            data-cy="person"
            key={slug}
            className={
              classNames({ 'has-background-warning': `/people/${slug}` === location.pathname })
            }
          >
            <td>
              <PersonLink name={name} slug={slug} sex={sex} />
            </td>
            <td>{sex}</td>
            <td>{born}</td>
            <td>{died}</td>
            <td>
              {
                mother
                  ? (
                    <PersonLink
                      name={mother.name}
                      slug={mother.slug}
                      sex={mother.sex}
                    />
                  )
                  : motherName || '-'
              }
            </td>
            <td>
              {
                father
                  ? (
                    <PersonLink
                      name={father.name}
                      slug={father.slug}
                      sex={father.sex}
                    />
                  )
                  : fatherName || '-'
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
