import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { SortType } from '../../types/SortType';

interface Props {
  itemKey: string;
  itemValue: string;
  sortType: string;
  sortDirection: string;
}

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

  const reverseDirection = 'desc';

  return (
    <th>
      {canAddIcon(itemValue) ? (
        <span className="is-flex is-flex-wrap-nowrap">
          {itemKey}
          <SearchLink
            params={{
              sort:
                sortDirection === reverseDirection && sortType === itemValue
                  ? null
                  : itemValue,
              order:
                itemValue === sortType && sortDirection !== reverseDirection
                  ? reverseDirection
                  : null,
            }}
            className="is-flex is-flex-wrap-nowrap"
          >
            <span className="icon">
              <i
                className={classNames('fas', {
                  'fa-sort': itemValue !== sortType,
                  'fa-sort-up': itemValue === sortType && !sortDirection,
                  'fa-sort-down': itemValue === sortType && sortDirection,
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
