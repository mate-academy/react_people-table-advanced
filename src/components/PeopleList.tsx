import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { SortKeys } from '../types/SortKeys';
import { getFilterdPeople } from '../utils/getFilterdPeople';
import { getSortedPeople } from '../utils/getSortedPeople';
import { SearchingParams } from '../types/SearchParams';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { PersonItem } from './PersonItem';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[],
};

export const PeopleList:React.FC<Props> = ({ people }) => {
  const { personId = '' } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchingParams.Sort) || '';
  const order = searchParams.get(SearchingParams.Order) || '';
  const selectedSex = searchParams.get(SearchingParams.Sex) || '';
  const query = searchParams.get(SearchingParams.Query) || '';
  const selectedCenturies = searchParams
    .getAll(SearchingParams.Centuries) || [];

  const getSortParams = (sortKey: SortKeys): SearchParams => {
    if (sort !== sortKey) {
      return {
        sort: sortKey,
        order: null,
      };
    }

    if (!order) {
      return { order: 'desc' };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const filteredPeople = getFilterdPeople(
    people,
    selectedSex,
    query,
    selectedCenturies,
  );

  const sortedPeople = getSortedPeople(
    filteredPeople,
    sort as SortKeys,
    order ? -1 : 1,
  );

  return sortedPeople.length ? (
    <table
      data-cy="peopleTable"
      className="
      table
      is-striped
      is-hoverable
      is-narrow
      is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortKeys).map(([key, value]) => {
            const isSortEqualValue = sort === value;

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink
                    params={getSortParams(value)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': !isSortEqualValue,
                          'fa-sort-up': isSortEqualValue && !order,
                          'fa-sort-down': isSortEqualValue,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
            selectedSlug={personId}
          />
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no people matching the current search criteria</p>
  );
};
