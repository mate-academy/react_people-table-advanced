import { FC } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { HeaderTable } from './HeaderTable';

type Props = {
  peoples: Person[],
  sort: string | null,
  order: string | null,
};

export const PeopleTable: FC<Props> = ({ peoples, sort, order }) => {
  const { user } = useParams();
  const location = useLocation();

  const isIncleded = (nameParents: string | null) => {
    return peoples.some(people => people.name === nameParents);
  };

  const linkToChild = (nameParents: string | null) => {
    return peoples.find(people => people.name === nameParents)?.slug;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <HeaderTable
              sort={sort}
              order={order}
              name="Name"
            />
          </th>

          <th>
            <HeaderTable
              sort={sort}
              order={order}
              name="Sex"
            />
          </th>

          <th>
            <HeaderTable
              sort={sort}
              order={order}
              name="Born"
            />
          </th>

          <th>
            <HeaderTable
              sort={sort}
              order={order}
              name="Died"
            />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(people => (
          <tr
            data-cy="person"
            className={classNames('',
              { 'has-background-warning': user === people.slug })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${people.slug}`,
                  search: location.search,
                }}
                className={classNames('',
                  { 'has-text-danger': people.sex === 'f' })}
              >
                {people.name}
              </Link>
            </td>
            <td>{people.sex}</td>
            <td>{people.born}</td>
            <td>{people.died}</td>
            <td>
              {isIncleded(people.motherName) ? (
                <Link
                  to={`/people/${linkToChild(people.motherName)}`}
                  className="has-text-danger"
                >
                  {people.motherName || '-'}
                </Link>
              ) : (
                <p>{people.motherName || '-'}</p>
              )}
            </td>
            <td>
              {isIncleded(people.fatherName) ? (
                <Link to={`/people/${linkToChild(people.fatherName)}`}>
                  {people.fatherName || '-'}
                </Link>
              ) : (
                <p>{people.fatherName || '-'}</p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
