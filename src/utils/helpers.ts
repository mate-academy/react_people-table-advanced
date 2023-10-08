import cn from 'classnames';
import { Person } from '../types/Person';
import { YEARS_IN_CENTURY } from './constants';

export const getNavLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn('navbar-item', { 'has-background-grey-lighter': isActive })
);

export const findPersonParent = (
  people: Person[],
  personName: string | null,
) => {
  return people.find(({ name }) => name === personName);
};

export function normalizeString(str: string | null) {
  return str?.toLowerCase().trim() || null;
}

export function getSortOptionClass(
  sortOption: string | null,
  sortOrder: string | null,
  header: string,
) {
  const headerNorm = normalizeString(header);
  const sortClassByOrder = !sortOrder
    ? 'fa-sort-down'
    : 'fa-sort-up';

  const faSortIcon = sortOption !== headerNorm
    ? 'fa-sort'
    : sortClassByOrder;

  return cn(
    'fas',
    faSortIcon,
  );
}

export const convertToCentury = (year: number) => {
  return Math.ceil(year / YEARS_IN_CENTURY);
};
