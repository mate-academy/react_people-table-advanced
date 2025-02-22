import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};
export const PeopleTable: FC<Props> = ({ people }) => {
  const { peopleId } = useParams();

  const womanNames = useMemo(
    () => people.filter(({ sex }) => sex === 'f').map(({ name }) => name),
    [people],
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
        {people.map(
          ({
            slug,
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            mother,
            father,
          }) => (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === peopleId,
              })}
            >
              <td>
                <PersonLink
                  to={`${slug}`}
                  className={classNames({
                    'has-text-danger': womanNames.includes(name),
                  })}
                >
                  {name}
                </PersonLink>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? (
                  <PersonLink
                    to={mother.slug}
                    className={classNames({
                      'has-text-danger': womanNames.includes(mother.name),
                    })}
                  >
                    {mother.name}
                  </PersonLink>
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink to={father.slug}>{father.name}</PersonLink>
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
