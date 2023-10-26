import classNames from 'classnames';
import { useContext } from 'react';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';
import { appContext } from '../../storage/AppContext/AppContext';

type Props = {
  children: React.ReactNode;
  sortBy: string;
};

export const SortButton: React.FC<Props> = ({ children, sortBy }) => {
  const { sort, order } = useContext(appContext);

  const isSortMatch = sort === sortBy;
  const isOrderDesc = order === 'desc';
  const isOrderDescCount = isOrderDesc ? 2 : 1;

  const sortState = isSortMatch ? isOrderDescCount : 0;

  const params: SearchParams = {
    sort: sortState === 0 || sortState === 1 ? sortBy : null,
    order: sortState === 1 ? 'desc' : null,
  };

  const iconClass = classNames('fas', {
    'fa-sort': sortState === 0,
    'fa-sort-up': sortState === 1,
    'fa-sort-down': sortState === 2,
  });

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {children}
      <SearchLink params={params}>
        <span className="icon">
          <i className={iconClass} />
        </span>
      </SearchLink>
    </span>
  );
};
