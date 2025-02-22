import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { SortType } from '../../types/SortType';

interface Props {
  itemKey: string;
  itemValue: string;
  sortType: string;
  sortDirection: string;
}

const reverseDirection = 'desc';

export const TableHeadItem: React.FC<Props> = ({
  itemKey,
  itemValue,
  sortType,
  sortDirection,
}) => {
  const parents = [SortType.Mother, SortType.Father];

  const canAddIcon = (value: string): boolean => {
    return !parents.includes(value as SortType);
  };

  const isItemValueEqualToSortType = itemValue === sortType;

  return (
    <th>
      {canAddIcon(itemValue) ? (
        <span className="is-flex is-flex-wrap-nowrap">
          {itemKey}
          <SearchLink
            params={{
              sort:
                sortDirection === reverseDirection && isItemValueEqualToSortType
                  ? null
                  : itemValue,
              order:
                isItemValueEqualToSortType && sortDirection !== reverseDirection
                  ? reverseDirection
                  : null,
            }}
            className="is-flex is-flex-wrap-nowrap"
          >
            <span className="icon">
              <i
                className={classNames('fas', {
                  'fa-sort': !isItemValueEqualToSortType,
                  'fa-sort-up': isItemValueEqualToSortType && !sortDirection,
                  'fa-sort-down': isItemValueEqualToSortType && sortDirection,
                })}
              />
            </span>
          </SearchLink>
        </span>
      ) : (
        itemKey
      )}
    </th>
  );
};
