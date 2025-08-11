import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from './links/PersonLink';
import { Person } from '../types';
import { SearchLink } from './links/SearchLink';

interface Props {
  people: Person[];
  isLoading: boolean;
  isErrorShown: boolean;
}

type SortBy = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  isErrorShown,
}) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries: string[] = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getFiltered = () => {
    let shownPeople = [...people];

    shownPeople = shownPeople.filter(person => {
      const { name, motherName: mother, fatherName: father } = person;

      /* eslint-disable */
      return (
        name.toLowerCase().includes(query) ||
        mother?.toLowerCase().includes(query) ||
        father?.toLowerCase().includes(query)
      );
      /* eslint-enable */
    });

    if (sex) {
      shownPeople = shownPeople.filter(person => person.sex === sex);
    }

    if (centuries?.length) {
      shownPeople = shownPeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    return shownPeople;
  };

  const getSorted = (arr: Person[]) => {
    let sorted = [...arr];

    if (sort) {
      sorted = sorted.sort((person1, person2) => {
        switch (sort) {
          case 'name':
            return person1.name.localeCompare(person2.name);
          case 'sex':
            return person1.sex.localeCompare(person2.sex);
          case 'born':
            return person1.born - person2.born;
          case 'died':
            return person1.died - person2.died;
          default:
            return 0;
        }
      });
    }

    return order ? sorted.reverse() : sorted;
  };

  const filtered = useMemo(() => {
    return getSorted(getFiltered());
  }, [people, searchParams]);

  const getSortingParams = (sortType: SortBy) => {
    let toReturn = null;

    if (sort === sortType) {
      toReturn = {
        sort: order ? null : sortType,
        order: order ? null : 'desc',
      };
    } else {
      toReturn = { sort: sortType, order: null };
    }

    return toReturn;
  };

  const getSortingClasses = (sortType: SortBy) => {
    return cn('fas', {
      'fa-sort': sort !== sortType,
      'fa-sort-up': sort === sortType && !order,
      'fa-sort-down': sort === sortType && order,
    });
  };

  /* eslint-disable */
  return (
    <>
      {isErrorShown && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {people?.length ? (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SearchLink params={getSortingParams('name')}>
                    <span className="icon">
                      <i className={getSortingClasses('name')} />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink params={getSortingParams('sex')}>
                    <span className="icon">
                      <i className={getSortingClasses('sex')} />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink params={getSortingParams('born')}>
                    <span className="icon">
                      <i className={getSortingClasses('born')} />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink params={getSortingParams('died')}>
                    <span className="icon">
                      <i className={getSortingClasses('died')} />
                    </span>
                  </SearchLink>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(person => (
              <tr
                key={person.slug}
                data-cy="person"
                className={cn({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td>
                  <PersonLink
                    person={person}
                    aria-label={`Link to ${person.slug}`}
                  />
                </td>

                <td>{person.sex}</td>

                <td>{person.born}</td>

                <td>{person.died}</td>

                <td>
                  {person.motherName &&
                  people.some(p => p.name === person.motherName) ? (
                    <Link
                      to={{
                        pathname: `/people/${
                          people.find(p => p.name === person.motherName)?.slug
                        }`,
                        search: searchParams.toString(),
                      }}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td>
                  {person.fatherName &&
                  people.some(p => p.name === person.fatherName) ? (
                    <Link
                      to={`/people/${
                        people.find(p => p.name === person.fatherName)?.slug
                      }`}
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )
      )}
    </>
  );
};
