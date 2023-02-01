import { Link, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import cn from 'classnames';
import { usePeople } from '../hooks/usePeople';
import { PeopleItem } from './PeopleItem';
import { Person } from '../types';
import { sortByKey } from '../utils/sortByKey';
import { filterBy } from '../utils/filterBy';
import { Loader } from './Loader';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();

  const sort: keyof Person | null = searchParams.get('sort') as keyof Person;
  const order: 'desc' | null = searchParams.get('order') as 'desc' | null;
  const sex = searchParams.get('sex') as 'f' | 'm' | null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries');

  const {
    // prettier-ignore
    people,
    isLoading,
    isFetching,
    isError,
  } = usePeople();

  const noPeople = !isLoading && !isFetching && !isError && people.length < 1;

  const sortBy = (sortWith: keyof Person) => {
    if (sort !== sortWith) {
      return { sort: sortWith, order: null };
    }

    if (sort === sortWith && order !== 'desc') {
      return { sort: sortWith, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortedPeople = useMemo(
    () => sortByKey(people, sort, order),
    [people, sort, order],
  );

  const filteredPeople = useMemo(() => {
    return filterBy({
      people: sortedPeople,
      query,
      sex,
      centuries,
    });
  }, [people, query, sex, centuries]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  }

  if (noPeople) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (filteredPeople.length < 1) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
                to={{
                  search: getSearchWith(searchParams, sortBy('name')),
                }}
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
                to={{
                  search: getSearchWith(searchParams, sortBy('sex')),
                }}
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
                to={{
                  search: getSearchWith(searchParams, sortBy('born')),
                }}
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
                to={{
                  search: getSearchWith(searchParams, sortBy('died')),
                }}
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
        {filteredPeople.map(person => (
          <PeopleItem
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
