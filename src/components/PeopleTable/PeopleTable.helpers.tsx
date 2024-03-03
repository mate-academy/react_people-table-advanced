import { Person } from '../../types';
import { getSearchWith } from '../../utils/searchHelper';
import { PersonLink } from '../PersonLink';

type Params = {
  searchParams: URLSearchParams;
  sortBy: string;
  currentSort: string | null;
  order: string | null;
};

export const getSearchQuery = ({
  currentSort,
  searchParams,
  sortBy,
  order,
}: Params) => {
  if (sortBy !== currentSort) {
    return getSearchWith(searchParams, {
      sort: sortBy,
      order: null,
    });
  }

  if (order !== 'desc') {
    return getSearchWith(searchParams, {
      order: 'desc',
    });
  }

  return getSearchWith(searchParams, {
    sort: null,
    order: null,
  });
};

export const getLink = (person?: Person, name?: string | null) => {
  return (person && <PersonLink person={person} />) || name || '-';
};
