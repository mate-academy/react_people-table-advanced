import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const currentSortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const getSortParams = (field: string) => {
    if (field === currentSortField && !isReversed) {
      return getSearchWith(searchParams, { sort: field, order: 'desc' });
    }

    if (field === currentSortField && isReversed) {
      return getSearchWith(searchParams, { sort: null, order: null });
    }

    return getSearchWith(searchParams, { sort: field, order: null });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            Name
            <span className="icon">
              <Link
                className="fas fa-sort"
                to={{
                  search: getSortParams('name'),
                }}
              />
            </span>
          </th>
          <th>
            Sex
            <span className="icon">
              <Link
                className="fas fa-sort"
                to={{
                  search: getSortParams('sex'),
                }}
              />
            </span>
          </th>
          <th>
            Born
            <span className="icon">
              <Link
                className="fas fa-sort"
                to={{
                  search: getSortParams('born'),
                }}
              />
            </span>
          </th>
          <th>
            Died
            <span className="icon">
              <Link
                className="fas fa-sort"
                to={{
                  search: getSortParams('died'),
                }}
              />
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            person={person}
            people={people}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
