import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SortingArrow } from './SortingArrow';

type PeopleTableProps = {
  people: Person[];
  getSortLinkProps: (field: string) => {};
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people, getSortLinkProps }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams<{ personSlug: string }>();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

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
                  search: getSearchWith(searchParams, {
                    ...getSortLinkProps('name'),
                  }),
                }}
                replace
              >
                <SortingArrow sort={sort} order={order} field={'name'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...getSortLinkProps('sex'),
                  }),
                }}
                replace
              >
                <SortingArrow sort={sort} order={order} field={'sex'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...getSortLinkProps('born'),
                  }),
                }}
                replace
              >
                <SortingArrow sort={sort} order={order} field={'born'} />
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  search: getSearchWith(searchParams, {
                    ...getSortLinkProps('died'),
                  }),
                }}
                replace
              >
                <SortingArrow sort={sort} order={order} field={'died'} />
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === personSlug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': isSelected })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: getSearchWith(searchParams, {}),
                  }}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  person.mother ? (
                    <Link
                      className="has-text-danger"
                      to={{
                        pathname: `/people/${person.mother.slug}`,
                        search: getSearchWith(searchParams, {}),
                      }}
                    >
                      {person.mother.name}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  person.father ? (
                    <Link
                      to={{
                        pathname: `/people/${person.father.slug}`,
                        search: getSearchWith(searchParams, {}),
                      }}
                    >
                      {person.father.name}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
