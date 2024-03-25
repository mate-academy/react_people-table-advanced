import { useState } from 'react';
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
  const [clickCounter, setClickCounter] = useState(0);

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
            onBlur={() => setClickCounter(0)}
            onClick={() => {
              setClickCounter(prevCount =>
                prevCount === 2 ? 0 : prevCount + 1,
              );
            }}
            params={{
              sort: clickCounter === 0 || clickCounter === 1 ? itemValue : null,
              order: clickCounter === 1 ? reverseDirection : null,
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
