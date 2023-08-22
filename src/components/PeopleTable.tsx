import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props{
  people: Person[],
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const { slug } = useParams();

  const sortOrderIcon = (field: string) => (
    classNames('fas', {
      'fa-sort': sort !== `${field}`,
      'fa-sort-up': sort === `${field}` && order !== 'desc',
      'fa-sort-down': sort === `${field}` && order === 'desc',
    })
  );

  const handleSort = (field: string) => {
    if (!order && sort === field) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    if (order && sort === field) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: field,
      order: null,
    };
  };

  const getParent = useMemo(() => {
    return (parentName: string | null) => {
      const parent = people.find(person => person.name === parentName);

      return parent
        ? (
          <Link
            to={parent.slug}
            className={classNames({
              'has-text-danger': parent.sex === 'f',
              'has-text-link': parent.sex === 'm',
            })}
          >
            {parent.name}
          </Link>
        )
        : parentName || '-';
    };
  }, [people, slug]);

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
                params={handleSort('name')}
              >
                <span className="icon">
                  <i className={sortOrderIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSort('sex')}>
                <span className="icon">
                  <i className={sortOrderIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSort('born')}>
                <span className="icon">
                  <i className={sortOrderIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSort('died')}>
                <span className="icon">
                  <i className={sortOrderIcon('died')} />
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
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {getParent(person.motherName)}
            </td>
            <td>
              {getParent(person.fatherName)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
