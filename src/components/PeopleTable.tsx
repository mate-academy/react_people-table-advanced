import classNames from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Person } from '../types';
import { PersonNav } from './PersonNav';
import { SearchLink } from './SearchLink';

enum TypeSort {
  'Name' = 'name',
  'Sex' = 'sex',
  'Born' = 'born',
  'Died' = 'died',
}

enum SearchParams {
  'Sex' = 'sex',
  'Query' = 'query',
  'Sort' = 'sort',
  'Order' = 'order',
  'Centuries' = 'centuries',
}

type Props = {
  listPeople: Person[] | [],
  setNotFound: (empty: boolean) => void
};

const filterPeople = (array: Person[], filter: {
  sex: string | null,
  query: string | null,
  centuries: string[] | null
}) => {
  let copy = [...array];

  const filterQuery = filter.query?.toLowerCase();

  if (filter.sex) {
    copy = copy.filter((person: Person) => person.sex === filter.sex);
  }

  if (filterQuery) {
    copy = copy.filter((person: Person) => {
      return person.name.toLowerCase().includes(filterQuery)
        || person.motherName?.toLowerCase().includes(filterQuery)
        || person.fatherName?.toLowerCase().includes(filterQuery);
    });
  }

  if (filter.centuries?.length) {
    copy = copy.filter((person: Person) => filter.centuries?.includes(`${1 + Math.trunc(person.born / 100)}`));
  }

  return copy;
};

export const PeopleTable: React.FC<Props> = ({
  listPeople,
  setNotFound,
}) => {
  const [searchParams] = useSearchParams();
  const { slug = '' } = useParams();
  const { search } = useLocation();
  const sex = searchParams.get(SearchParams.Sex);
  const query = searchParams.get(SearchParams.Query);
  const centuries = searchParams.getAll(SearchParams.Centuries);

  const sortBy = useCallback((type: string) => {
    return {
      order: searchParams.get(SearchParams.Sort) === type
        && !searchParams.get(SearchParams.Order)
        ? 'desc' : null,
      sort: searchParams.get(SearchParams.Sort) !== type
        || (searchParams.get(SearchParams.Sort) === type
          && !searchParams.get(SearchParams.Order))
        ? type : null,
    };
  }, [searchParams]);

  const renderArrows = (type: string) => {
    return {
      'fa-sort-up': searchParams.get(SearchParams.Sort) === type
        && !searchParams.get(SearchParams.Order),
      'fa-sort-down': searchParams.get(SearchParams.Order)
        && searchParams.get(SearchParams.Sort) === type,
    };
  };

  const sortUp = (type: TypeSort,
    array: Person[], desc: boolean) => {
    const copy = [...array];

    if (!desc) {
      if (type === TypeSort.Name || type === TypeSort.Sex) {
        return copy.sort((a, b) => a[type].localeCompare(b[type]));
      }

      return copy.sort((a, b) => a[type] - b[type]);
    }

    if (type === TypeSort.Name || type === TypeSort.Sex) {
      return copy.sort((a, b) => b[type].localeCompare(a[type]));
    }

    return copy.sort((a, b) => b[type] - a[type]);
  };

  const renderList = useMemo(() => {
    const typeSort = searchParams.get(SearchParams.Sort) as TypeSort;
    const order = searchParams.get(SearchParams.Order);

    if (typeSort && !order) {
      return sortUp(typeSort,
        listPeople,
        false);
    }

    if (typeSort && order) {
      return sortUp(typeSort,
        listPeople,
        true);
    }

    return listPeople;
  }, [
    search,
    searchParams.get(SearchParams.Sort),
    searchParams.get(SearchParams.Order),
  ]);

  const getParent = (person: Person) => {
    return listPeople
      .find(
        (element: Person) => element.name === person.fatherName
          || element.name === person.motherName,
      );
  };

  const isActive = (name: string) => {
    return slug.replaceAll('-', ' ').toLowerCase().includes(name.toLowerCase());
  };

  const createSlug = (name: string) => {
    const parent = listPeople.filter((element: Person) => (
      element.name === name))[0];

    return parent
      ? `/people/${parent.name.replaceAll(' ', '-')}-${parent.born}${search}`
      : '';
  };

  useEffect(() => {
    if (!filterPeople(renderList, { sex, query, centuries }).length) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [search]);

  return (
    filterPeople(renderList, { sex, query, centuries }).length ? (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink params={sortBy(TypeSort.Name)}>
                  <span className="icon">
                    <i className={classNames('fas fa-sort',
                      renderArrows(TypeSort.Name))}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink params={sortBy(TypeSort.Sex)}>
                  <span className="icon">
                    <i className={classNames('fas fa-sort',
                      renderArrows(TypeSort.Sex))}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink params={sortBy(TypeSort.Born)}>
                  <span className="icon">
                    <i className={classNames('fas fa-sort',
                      renderArrows(TypeSort.Born))}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>

            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink params={sortBy(TypeSort.Died)}>
                  <span className="icon">
                    <i className={classNames('fas fa-sort',
                      renderArrows(TypeSort.Died))}
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
          {filterPeople(renderList, { sex, query, centuries })
            .map((person: Person) => (
              <tr
                data-cy="person"
                className={classNames('', {
                  'has-background-warning': isActive(person.name),
                })}
                key={person.slug}
              >
                <PersonNav person={person} />

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {getParent(person) && person.motherName ? (
                    <Link
                      className={classNames('', {
                        'has-text-danger': person.motherName,
                      })}
                      to={
                        createSlug(
                          person.motherName as string,
                        )
                      }
                    >
                      {person.motherName || '-'}
                    </Link>
                  ) : person.motherName || '-'}

                </td>
                <td>
                  {getParent(person) && person.fatherName ? (
                    <Link to={
                      createSlug(
                        person.fatherName as string,
                      )
                    }
                    >
                      {person.fatherName || '-'}
                    </Link>
                  ) : person.fatherName || '-'}

                </td>
              </tr>
            ))}
        </tbody>
      </table>
    ) : <></>
  );
};
