import { FC } from 'react';
import { usePeopleParams } from '../hooks/usePeopleParams';
import { SearchLink } from './SearchLink';

interface Props {
  sortBy: string;
}

export const SortLink: FC<Props> = ({ sortBy }) => {
  const { sort, order } = usePeopleParams();

  const newSortValue = sort !== sortBy || (sort && !order) ? sortBy : null;
  const newOrderValue = sort === sortBy && !order ? 'desc' : null;

  const params = {
    sort: newSortValue,
    order: newOrderValue,
  };

  return (
    <SearchLink params={params}>
      <span className="icon">
        <i className="fas fa-sort" />
      </span>
    </SearchLink>
  );
};
