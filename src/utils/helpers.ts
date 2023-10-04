import cn from 'classnames';
import { Person } from '../types/Person';

export const getNavLinkClass = ({ isActive }: { isActive: boolean }) => (
  cn('navbar-item', { 'has-background-grey-lighter': isActive })
);

export const findPersonByName = (people: Person[], name: string | null) => {
  return people.find(person => person.name === name) || null;
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
