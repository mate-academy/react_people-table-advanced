import { SortOrderValue } from '../../constants/SortOrderValue';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';

interface Props {
  sortField: keyof Person;
  sortOrder: SortOrderValue | null;
}

export const PeopleSort: React.FC<Props> = ({ sortField, sortOrder }) => {
  const getSortIcon = () => {
    if (!sortOrder) {
      return 'fa-sort';
    }

    return sortOrder === SortOrderValue.ASC ? 'fa-sort-up' : 'fa-sort-down';
  };

  const getOrder = () => {
    switch (sortOrder) {
      case SortOrderValue.ASC:
        return SortOrderValue.DESC;
      case SortOrderValue.DESC:
        return null;
      default:
        return SortOrderValue.ASC;
    }
  };

  return (
    <SearchLink
      params={{
        sort: sortOrder === SortOrderValue.DESC ? null : sortField,
        order: getOrder(),
      }}
    >
      <span className="icon">
        <i className={`fas ${getSortIcon()}`} />
      </span>
    </SearchLink>
  );
};
