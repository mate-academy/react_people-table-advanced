import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
  selectedSlug?: string;
};
export const PeopleTable = ({ people, sort, order, selectedSlug }: Props) => {
  const [searchParams] = useSearchParams();
  const getSortParams = (fieldKey: string) => {
    let newSort: string | null = fieldKey;
    let newOrder: string | null = null;

    if (sort === fieldKey) {
      if (!order) {
        newOrder = 'desc';
      } else {
        newOrder = null;
        newSort = null;
      }
    } else {
      newOrder = null;
    }

    return {
      sort: newSort,
      order: newOrder,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SearchLink
              params={getSortParams('name')}
              className="is-flex is-flex-wrap-nowrap"
            >
              <span className="has-text-dark">Name</span>
              <span className="icon has-text-link">
                <i
                  className={`fas ${
                    sort !== 'name'
                      ? 'fa-sort'
                      : order === 'desc'
                        ? 'fa-sort-down'
                        : 'fa-sort-up'
                  }`}
                />
              </span>
            </SearchLink>
          </th>

          <th>
            <SearchLink
              params={getSortParams('sex')}
              className="is-flex is-flex-wrap-nowrap"
            >
              <span className="has-text-dark">Sex</span>
              <span className="icon has-text-link">
                <i
                  className={`fas ${
                    sort !== 'sex'
                      ? 'fa-sort'
                      : order === 'desc'
                        ? 'fa-sort-down'
                        : 'fa-sort-up'
                  }`}
                />
              </span>
            </SearchLink>
          </th>

          <th>
            <SearchLink
              params={getSortParams('born')}
              className="is-flex is-flex-wrap-nowrap"
            >
              <span className="has-text-dark">Born</span>
              <span className="icon has-text-link">
                <i
                  className={`fas ${
                    sort !== 'born'
                      ? 'fa-sort'
                      : order === 'desc'
                        ? 'fa-sort-down'
                        : 'fa-sort-up'
                  }`}
                />
              </span>
            </SearchLink>
          </th>

          <th>
            <SearchLink
              params={getSortParams('died')}
              className="is-flex is-flex-wrap-nowrap"
            >
              <span className="has-text-dark">Died</span>
              <span className="icon has-text-link">
                <i
                  className={`fas ${
                    sort !== 'died'
                      ? 'fa-sort'
                      : order === 'desc'
                        ? 'fa-sort-down'
                        : 'fa-sort-up'
                  }`}
                />
              </span>
            </SearchLink>
          </th>

          <th>
            <span className="has-text-dark">Mother</span>
          </th>
          <th>
            <span className="has-text-dark">Father</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <Link
                className={person.sex === 'f' ? 'has-text-danger' : ''}
                to={`/people/${person.slug}?${searchParams.toString()}`}
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
                    className={
                      person.mother?.sex === 'f' ? 'has-text-danger' : ''
                    }
                    to={`/people/${person.mother?.slug}?${searchParams.toString()}`}
                  >
                    {person.motherName}
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
                    to={`/people/${person.father?.slug}?${searchParams.toString()}`}
                  >
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName
                )
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
