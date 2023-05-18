import { FC } from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getParams = (searchParam: string) => {
    if (sort === null && order === null) {
      return { sort: searchParam, order: null };
    }

    if (sort !== null && order === null) {
      return { sort: searchParam, order: 'desc' };
    }

    return { sort: null, order: null };
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
              <SearchLink params={getParams('name')}>
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': (!sort && !order) || sort !== 'name',
                    'fa-sort-up': sort && !order && sort === 'name',
                    'fa-sort-down': sort && order && sort === 'name',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getParams('sex')}>
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': (!sort && !order) || sort !== 'sex',
                    'fa-sort-up': sort && !order && sort === 'sex',
                    'fa-sort-down': sort && order && sort === 'sex',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getParams('born')}>
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': (!sort && !order) || sort !== 'born',
                    'fa-sort-up': sort && !order && sort === 'born',
                    'fa-sort-down': sort && order && sort === 'born',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getParams('died')}>
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': (!sort && !order) || sort !== 'died',
                    'fa-sort-up': sort && !order && sort === 'died',
                    'fa-sort-down': sort && order && sort === 'died',
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
        {people.map((person: Person) => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            mother,
            father,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              className={cn({ 'has-background-warning': personSlug === slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
