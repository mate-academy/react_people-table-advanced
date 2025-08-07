import { FC, useCallback, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};
export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { peopleId } = useParams();

  const womanNames = useMemo(
    () => people.filter(({ sex }) => sex === 'f').map(({ name }) => name),
    [people],
  );

  const handlePath = useCallback(
    (params: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (searchParams.has('sort', params)) {
        if (searchParams.has('order', 'desc')) {
          ['sort', 'order'].forEach(i => newParams.delete(i));
        } else {
          newParams.append('order', 'desc');
        }
      } else {
        newParams.set('sort', params);
      }

      return { search: newParams.toString() };
    },
    [searchParams],
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
              <Link to={handlePath('name')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={handlePath('sex')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={handlePath('born')}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={handlePath('died')}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
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
