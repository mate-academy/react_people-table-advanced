import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  fieldName: string,
  currentSort: string | null,
  currentOrder: string | null,
};

export const SortLink: React.FC<Props> = ({
  fieldName,
  currentSort,
  currentOrder,
}) => {
  return (
    <SearchLink
      params={{
        sort: currentSort && currentOrder ? null : fieldName,
        order: currentSort && !currentOrder ? 'desc' : null,
      }}
    >
      <span className="icon">
        <i className={classNames('fas',
          {
            'fa-sort': !currentSort && !currentOrder,
            'fa-sort-up': currentSort && !currentOrder,
            'fa-sort-down': currentOrder === 'desc',
          })}
        />
      </span>
    </SearchLink>
  );
};
