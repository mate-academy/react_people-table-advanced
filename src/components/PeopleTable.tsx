import { useSearchParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { Person } from '../types';

type Props = {
  people: Person[];
  Slug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, Slug }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortParams = (param: string) => {
    if (sort !== param) {
      return {
        sort: param,
        order: null,
      };
    }

    if (sort === param && order !== 'desc') {
      return { order: 'desc' };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const personLink = (person: Person) => {
    const { name, sex, slug } = person;

    return (
      <Link
        to={`/people/${slug}`}
        className={cn({ 'has-text-danger': sex === 'f' })}
      >
        {name}
      </Link>
    );
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
                params={sortParams('name') as SearchParams}
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
                params={sortParams('sex') as SearchParams}
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
                params={sortParams('born') as SearchParams}
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
                params={sortParams('died') as SearchParams}
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
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === Slug,
              })}
            >
              <td>
                {personLink(person)}
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? personLink(person.mother)
                  : person.motherName || '-'}
              </td>
              <td>
                {person.father
                  ? personLink(person.father)
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
