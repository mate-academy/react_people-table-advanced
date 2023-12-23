/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortType } from '../types/SortType';
import { getSortSearchString } from '../utils/getSortSearchString';
import { getClassNames } from '../utils/getClassNames';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

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
                  search: getSortSearchString(searchParams, SortType.Name),
                }}
              >
                <span className="icon">
                  <i
                    className={getClassNames(searchParams, SortType.Name)}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSortSearchString(searchParams, SortType.Sex),
                }}
              >
                <span className="icon">
                  <i
                    className={getClassNames(searchParams, SortType.Sex)}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSortSearchString(searchParams, SortType.Born),
                }}
              >
                <span className="icon">
                  <i
                    className={getClassNames(searchParams, SortType.Born)}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSortSearchString(searchParams, SortType.Died),
                }}
              >
                <span className="icon">
                  <i
                    className={getClassNames(searchParams, SortType.Died)}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {
          people.map(person => {
            const {
              born,
              died,
              fatherName,
              motherName,
              name,
              sex,
              father,
              mother,
              slug: personSlug,
            } = person;

            return (
              <tr
                data-cy="person"
                className={cn(
                  { 'has-background-warning': slug === personSlug },
                )}
                key={name}
              >
                <td>
                  <PersonLink person={person}>
                    {name}
                  </PersonLink>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  <PersonLink person={mother}>
                    {motherName ?? '-'}
                  </PersonLink>
                </td>
                <td>
                  <PersonLink person={father}>
                    {fatherName ?? '-'}
                  </PersonLink>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
