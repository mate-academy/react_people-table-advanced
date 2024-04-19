import { Person } from '../types';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { Gender } from '../enums/Filter';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { TableFilter } from '../enums/TableFilter';
import { SearchParams } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  persons: Person[];
};

export const PeopleTable: React.FC<Props> = ({ persons }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { slug } = useParams();

  const tableSort = (sortBy: string): SearchParams => {
    switch (true) {
      case sort !== sortBy || (!sort.trim() && !order?.trim()):
        return { sort: sortBy, order: null };

      case sort === sortBy && !order:
        return { sort: sortBy, order: TableFilter.DescOrder };

      default:
        return { sort: null, order: null };
    }
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
              <SearchLink params={tableSort(TableFilter.Name)}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sort !== TableFilter.Name,
                      },
                      { 'fa-sort-up': sort === TableFilter.Name && !order },
                      {
                        'fa-sort-down':
                          sort === TableFilter.Name &&
                          order === TableFilter.DescOrder,
                      },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={tableSort(TableFilter.Sex)}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sort !== TableFilter.Sex,
                      },
                      { 'fa-sort-up': sort === TableFilter.Sex && !order },
                      {
                        'fa-sort-down':
                          sort === TableFilter.Sex &&
                          order === TableFilter.DescOrder,
                      },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={tableSort(TableFilter.Born)}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sort !== TableFilter.Born,
                      },
                      { 'fa-sort-up': sort === TableFilter.Born && !order },
                      {
                        'fa-sort-down':
                          sort === TableFilter.Born &&
                          order === TableFilter.DescOrder,
                      },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={tableSort(TableFilter.Died)}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      {
                        'fa-sort': sort !== TableFilter.Died,
                      },
                      { 'fa-sort-up': sort === TableFilter.Died && !order },
                      {
                        'fa-sort-down':
                          sort === TableFilter.Died &&
                          order === TableFilter.DescOrder,
                      },
                    )}
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
        {persons &&
          persons.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={classNames({
                    'has-text-danger': person.sex === Gender.Female,
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother ? (
                  <Link
                    to={{
                      pathname: `/people/${person.mother.slug}`,
                      search: searchParams.toString(),
                    }}
                    className={classNames({
                      'has-text-danger': person.mother.sex === Gender.Female,
                    })}
                  >
                    {person.motherName}
                  </Link>
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.father ? (
                  <Link
                    to={{
                      pathname: `/people/${person.father.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {person.fatherName}
                  </Link>
                ) : person.fatherName ? (
                  person.fatherName
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
