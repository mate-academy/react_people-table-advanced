import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { SortField, SortOrder } from '../../enums';
import { cycleSortOrder } from '../../utils/cycleSortOrder';
import { normalizeSortField } from '../../utils/normalizeFilterField';
import { ORDER_QUERY, SORT_QUERY } from '../../utils/searchParamConstants';

export const PeopleTableHead = () => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get(SORT_QUERY) as SortField | null;
  const sortOrder = (searchParams.get(ORDER_QUERY) ??
    (sortField ? SortOrder.Ascending : null)) as SortOrder | null;

  function getSearchParams(newSortField: SortField) {
    if (sortField !== newSortField) {
      return {
        [SORT_QUERY]: newSortField as string,
        [ORDER_QUERY]: null,
      };
    }

    return {
      [SORT_QUERY]: normalizeSortField(sortField, sortOrder),
      [ORDER_QUERY]: cycleSortOrder(sortOrder) as string,
    };
  }

  function getSortArrows(target: SortField) {
    if (sortField !== target) {
      return 'fas fa-sort';
    }

    switch (sortOrder) {
      case null:
        return 'fas fa-sort';
      case SortOrder.Ascending:
        return 'fas fa-sort-up';
      case SortOrder.Descending:
        return 'fas fa-sort-down';
    }
  }

  return (
    <thead>
      <tr>
        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Name
            <SearchLink params={getSearchParams(SortField.Name)}>
              <span className="icon">
                <i className={getSortArrows(SortField.Name)} />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Sex
            <SearchLink params={getSearchParams(SortField.Sex)}>
              <span className="icon">
                <i className={getSortArrows(SortField.Sex)} />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Born
            <SearchLink params={getSearchParams(SortField.Born)}>
              <span className="icon">
                <i className={getSortArrows(SortField.Born)} />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>
          <span className="is-flex is-flex-wrap-nowrap">
            Died
            <SearchLink params={getSearchParams(SortField.Died)}>
              <span className="icon">
                <i className={getSortArrows(SortField.Died)} />
              </span>
            </SearchLink>
          </span>
        </th>

        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
