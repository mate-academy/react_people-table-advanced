import { useEffect, useState } from 'react';
import cn from 'classnames';

import { useSortParams } from '../../../hooks/useSortParams';
import { TableHeader } from '../../../types/TableHeader';
import { setSortParams } from '../../../utils/setSortParams';
import { SearchLink } from '../../SearchLink';

interface Props {
  title: TableHeader;
}

const TableHeaderInfo: React.FC<Props> = ({ title }) => {
  const [isIconVisible, setIsIconVisible] = useState(true);

  const { sortParam, orderParam } = useSortParams();

  useEffect(() => {
    if (title === 'Mother' || title === 'Father') {
      setIsIconVisible(false);
    }
  }, [title]);

  const isSortVisible = sortParam === title.toLowerCase();

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}

        {isIconVisible && (
          <SearchLink
            params={setSortParams(title.toLowerCase(), sortParam, orderParam)}
          >
            <span className="icon">
              <i
                className={cn('fas', {
                  'fa-sort': !isSortVisible,
                  'fa-sort-up': isSortVisible && !orderParam,
                  'fa-sort-down': isSortVisible && orderParam,
                })}
              />
            </span>
          </SearchLink>
        )}
      </span>
    </th>
  );
};

export default TableHeaderInfo;
