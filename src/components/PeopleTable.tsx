import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchParams } from '../utils/searchHelper';
import { SortParams } from '../types/SortParams';
import { SearchLink } from './SearchLink';
import { FilterParams } from '../types/FilterParams';
import { getRelatives } from '../utils/getRelatives';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slugId } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get(FilterParams.Sort) || '';
  const currentOrder = searchParams.get(FilterParams.Order) || '';

  const handleSorting = (selectedSort: SortParams): SearchParams => {
    switch (true) {
      case !currentSort || currentSort !== selectedSort:
        return { sort: selectedSort, order: null };

      case !currentOrder:
        return { sort: selectedSort, order: 'desc' };

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
          {Object.values(SortParams).map((sortType) => (
            <th key={sortType}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortType.slice(0, 1).toUpperCase() + sortType.slice(1)}
                <SearchLink
                  params={handleSorting(sortType)}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': currentSort !== sortType,
                      'fa-sort-up': currentSort === sortType && !currentOrder,
                      'fa-sort-down': currentSort === sortType && currentOrder,
                    })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': slugId === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getRelatives(person, 'mother')}</td>
            <td>{getRelatives(person, 'father')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
