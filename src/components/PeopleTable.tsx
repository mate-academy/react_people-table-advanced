import { Link, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { usePeople } from '../hooks/usePeople';
import { PeopleItem } from './PeopleItem';
import { Person } from '../types';
import { sortByKey } from '../utils/sortByKey';
import { filterBy } from '../utils/filterBy';

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();

  const sort: keyof Person | null = searchParams.get('sort') as keyof Person;
  const order: 'desc' | null = searchParams.get('order') as 'desc' | null;
  const sex = searchParams.get('sex') as 'f' | 'm' | null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries');

  const { people } = usePeople();

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
              <Link to="?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to="?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to="?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to="?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
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
