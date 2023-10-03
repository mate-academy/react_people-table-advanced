import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[],
};

export const PeopleTable = (
  {
    people,
  }: PeopleTableProps,
) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sortFilter = searchParams.get('sort');
  const orderFilter = searchParams.get('order');

  const handleSortFilter = (param: string) => {
    if (sortFilter === null && orderFilter === null) {
      return param;
    }

    if (sortFilter === param && orderFilter === null) {
      return param;
    }

    return null;
  };

  const handleOrderFilter = (param: string) => {
    if (sortFilter === null && orderFilter === null) {
      return null;
    }

    if (sortFilter === param && orderFilter === null) {
      return 'desc';
    }

    return null;
  };

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
              <SearchLink
                params={{
                  sort: handleSortFilter('name'),
                  order: handleOrderFilter('name'),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': orderFilter === 'desc'
                      && sortFilter === 'name',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: handleSortFilter('sex'),
                  order: handleOrderFilter('sex'),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': orderFilter === 'desc'
                      && sortFilter === 'sex',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: handleSortFilter('born'),
                  order: handleOrderFilter('born'),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': orderFilter === 'desc'
                      && sortFilter === 'born',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: handleSortFilter('died'),
                  order: handleOrderFilter('died'),
                }}
              >
                <span className="icon">
                  <i className={classNames('fas fa-sort', {
                    'fa-sort-up': orderFilter === 'desc'
                      && sortFilter === 'died',
                  })}
                  />
                </span>
              </SearchLink>
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
            className={person.slug === personSlug
              ? 'has-background-warning' : undefined}
          >
            <PersonLink
              person={person}
            />

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.mother
              ? (
                <PersonLink
                  person={person.mother}
                />
              )
              : (
                <td>
                  {person.motherName !== null
                    ? person.motherName : '-'}
                </td>
              )}
            {person.father
              ? (
                <PersonLink
                  person={person.father}
                />
              )
              : (
                <td>
                  {person.fatherName !== null
                    ? person.fatherName : '-'}
                </td>
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
