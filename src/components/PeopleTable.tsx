import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug: urlSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const tableSort = (field: string) => {
    if (!sort || sort !== field) {
      return {
        sort: field,
      };
    }

    if (sort === field && !order) {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
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
              <SearchLink
                params={tableSort('name') as SearchParams}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === 'name' && !order,
                    'fa-sort-down': sort === 'name' && order,
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
                params={tableSort('sex') as SearchParams}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === 'sex' && !order,
                    'fa-sort-down': sort === 'sex' && order,
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
                params={tableSort('born') as SearchParams}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === 'born' && !order,
                    'fa-sort-down': sort === 'born' && order,
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
                params={tableSort('died') as SearchParams}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === 'died' && !order,
                    'fa-sort-down': sort === 'died' && order,
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
        {people.map(person => {
          const {
            name,
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const findMother = people.find(p => p.name === motherName);
          const findFather = people.find(p => p.name === fatherName);

          const mother = findMother ? (
            <PersonLink
              name={motherName}
              sex={findMother.sex}
              slug={findMother.slug}
            />
          ) : motherName;

          const father = findFather ? (
            <PersonLink
              name={fatherName}
              sex={findFather.sex}
              slug={findFather.slug}
            />
          ) : fatherName;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': slug === urlSlug,
              })}
            >
              <td>
                <Link
                  to={`${slug}`}
                  className={cn({
                    'has-text-danger': sex === 'f',
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{mother || '-'}</td>
              <td>{father || '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
