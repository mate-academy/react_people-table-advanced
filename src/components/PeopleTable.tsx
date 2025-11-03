/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint no-console: ["error", { allow: ["warn", "log"] }] */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { FC } from 'react';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const getParent = (name: string | null | undefined) => {
    if (!name) {
      return '-';
    }

    const parent = people.find(person => person.name === name);

    if (!parent) {
      return name;
    }

    return <PersonLink person={parent} />;
  };

  const getSortParams = (sort: string) => {
    if (searchParams.get('sort') === sort && !searchParams.get('order')) {
      return { sort, order: 'desc' };
    }

    if (
      searchParams.get('sort') === sort &&
      searchParams.get('order') === 'desc'
    ) {
      return { sort: null, order: null };
    }

    return { sort, order: null };
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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'name',
                      'fa-sort-up':
                        searchParams.get('sort') === 'name' &&
                        !searchParams.get('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === 'name' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'sex',
                      'fa-sort-up':
                        searchParams.get('sort') === 'sex' &&
                        !searchParams.get('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === 'sex' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'born',
                      'fa-sort-up':
                        searchParams.get('sort') === 'born' &&
                        !searchParams.get('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === 'born' &&
                        searchParams.get('order') === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': searchParams.get('sort') !== 'died',
                      'fa-sort-up':
                        searchParams.get('sort') === 'died' &&
                        !searchParams.get('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === 'died' &&
                        searchParams.get('order') === 'desc',
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
        {people?.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{getParent(person.motherName)}</td>
              <td>{getParent(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
