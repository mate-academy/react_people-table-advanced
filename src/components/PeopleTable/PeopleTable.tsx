import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { SearchLink } from '../SearchLink/SearchLink';
import { SortKeys } from '../../types/SortKeys';
import { SearchParams } from '../../utils/searchHelper';
import { SearchingParams } from '../../types/SearchingParams';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { chosenUserSlug = '' } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get(SearchingParams.Sort) || '';
  const order = searchParams.get(SearchingParams.Order) || '';

  const getSortParams = (sortKey: SortKeys): SearchParams => {
    if (sort !== sortKey) {
      return {
        sort: sortKey,
        order: null,
      };
    }

    if (sort === sortKey && !order) {
      return { order: 'desc' };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const getPeopleSorted = (peopleToSort: Person[]) => {
    const sortedPeople = [...peopleToSort];
    const ord = order ? -1 : 1;

    switch (sort) {
      case SortKeys.Born:
      case SortKeys.Died: {
        return sortedPeople.sort((a, b) => (a[sort] - b[sort]) * ord);
      }

      case SortKeys.Name:
      case SortKeys.Sex:
        return sortedPeople.sort(
          ((a, b) => a[sort].localeCompare(b[sort]) * ord),
        );

      default:
        return sortedPeople;
    }
  };

  const sortedPeople = getPeopleSorted(people);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortKeys).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={getSortParams(value)}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': sort === value && !order,
                        'fa-sort-down': sort === value,
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
        {sortedPeople.map(person => (
          <PersonItem
            person={person}
            chosenUserSlug={chosenUserSlug}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
