import {
  ascendingSortIcon,
  descendingSortIcon,
  noSortIcon,
} from '../../consts/icons';
import { SortableField, SortOrder } from '../../types/types';
import { SearchLink } from '../SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  title: string;
  field: SortableField;
};

export const SortableTableField: React.FC<Props> = ({ title, field }) => {
  const [searchParams] = useSearchParams();
  const selectedField = searchParams.get('sort') as SortableField | null;
  const order =
    selectedField === field
      ? (searchParams.get('order') as SortOrder.Descending | null) ||
        SortOrder.Ascending
      : SortOrder.None;
  let sortIcon = noSortIcon;

  switch (order) {
    case SortOrder.None:
      sortIcon = noSortIcon;
      break;
    case SortOrder.Ascending:
      sortIcon = ascendingSortIcon;
      break;
    case SortOrder.Descending:
      sortIcon = descendingSortIcon;
      break;
    default:
      throw new Error('Sort order is not valid!!!');
  }

  return (
    <span className="is-flex is-flex-wrap-nowrap">
      {title}
      <SearchLink
        params={{
          sort: order === SortOrder.Descending ? null : field,
          order: order === SortOrder.Ascending ? SortOrder.Descending : null,
        }}
      >
        <span className="icon">
          <i className={`fas ${sortIcon}`} />
        </span>
      </SearchLink>
    </span>
  );
};
