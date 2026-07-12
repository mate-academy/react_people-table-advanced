import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortLink = (field: string) => {
    if (sort !== field) {
      return {
        search: getSearchWith(searchParams, {
          sort: field,
          order: null,
        }),
      };
    }

    if (order !== 'desc') {
      return {
        search: getSearchWith(searchParams, {
          order: 'desc',
        }),
      };
    }

    return {
      search: getSearchWith(searchParams, {
        sort: null,
        order: null,
      }),
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
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link
                to={getSortLink('name')}
                // to={{
                //   search: getSearchWith(searchParams, {
                //     sort: 'name',
                //     order: sort === 'name' && order !== 'desc' ? 'desc' : null,
                //   }),
                // }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order !== 'desc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={getSortLink('sex')}
                // to={{
                //   search: getSearchWith(searchParams, {
                //     sort: 'sex',
                //     order: sort === 'sex' && order !== 'desc' ? 'desc' : null,
                //   }),
                // }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order !== 'desc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={getSortLink('born')}
                // to={{
                //   search: getSearchWith(searchParams, {
                //     sort: 'born',
                //     order: sort === 'born' && order !== 'desc' ? 'desc' : null,
                //   }),
                // }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order !== 'desc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={getSortLink('died')}
                // to={{
                //   search: getSearchWith(searchParams, {
                //     sort: 'died',
                //     order: sort === 'died' && order !== 'desc' ? 'desc' : null,
                //   }),
                // }}
              >
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order !== 'desc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
                    })}
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
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  (person.motherName ?? '-')
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  (person.fatherName ?? '-')
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
