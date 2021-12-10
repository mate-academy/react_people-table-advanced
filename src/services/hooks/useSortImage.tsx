import { useLocation } from 'react-router-dom';
import { SortByOptions, SortType } from '../types';
import sortBothImage from '../../images/sort_both.png';
import sortAscImage from '../../images/sort_asc.png';
import sortDescImage from '../../images/sort_desc.png';

export const useSortImage = (columnName: SortByOptions) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  if (columnName !== sortBy) {
    return sortBothImage;
  }

  return sortOrder === SortType.Asc
    ? sortAscImage
    : sortDescImage;
};
