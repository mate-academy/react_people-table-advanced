// import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink';
import { SortBy } from '../../types/Filters';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getParams = (sortBy: string) => {
    if (currentSort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (currentSort && order) {
      return { sort: null, order: null };
    }

    return { sort: sortBy, order: 'desc' };
  };

  const faSortClass = (sortBy: string) => {
    return cn('fas', {
      'fa-sort': currentSort !== sortBy,
      'fa-sort-up': currentSort === sortBy && !order,
      'fa-sort-down': currentSort === sortBy && order,
    });
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
            <SearchLink params={getParams(SortBy.Name)}>
              <span className="icon">
                <i className={faSortClass(SortBy.Name)} />
              </span>
            </SearchLink>
          </th>
          <th>
            Sex
            <SearchLink params={getParams(SortBy.Sex)}>
              <span className="icon">
                <i className={faSortClass(SortBy.Sex)} />
              </span>
            </SearchLink>
          </th>
          <th>
            Born
            <SearchLink params={getParams(SortBy.Born)}>
              <span className="icon">
                <i className={faSortClass(SortBy.Born)} />
              </span>
            </SearchLink>
          </th>
          <th>
            Died
            <SearchLink params={getParams(SortBy.Died)}>
              <span className="icon">
                <i className={faSortClass(SortBy.Died)} />
              </span>
            </SearchLink>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {!people.length ? (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        ) : (
          people.map((person) => (
            <PersonLink person={person} key={person.slug} />
          ))
        )}
      </tbody>
    </table>
  );
};
