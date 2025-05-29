import { Person } from '../types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Type } from '../components/PeopleTable';

export const handleSortClick = (
  column: string | null,
  currentSort: string | null,
  currentOrder: string | null,
) => {
  if (currentSort !== column) {
    return { sort: column, order: null };
  }

  if (!currentOrder) {
    return { sort: column, order: 'desc' };
  }

  return { sort: null, order: null };
};

export interface SortParams {
  sort: string | null;
  order: string | null;
}

export const getSortIcon = (field: SortParams) => {
  const sort = field['sort'];
  const order = field['order'];

  if (sort && !order) {
    return <i className="fas fa-sort" />;
  }

  return order === 'desc' ? (
    <i className="fas fa-sort-up" />
  ) : (
    <i className="fas fa-sort-down" />
  );
};

export const sortPersonList = (
  personList: Person[],
  currentSort: string | null,
  currentOrder: string,
): Person[] => {
  const copyList = [...personList];
  copyList.sort((firstPerson, secondPerson) => {
    if (currentSort === 'name') {
      return currentOrder === 'desc'
        ? secondPerson.name.localeCompare(firstPerson.name)
        : firstPerson.name.localeCompare(secondPerson.name);
    }

    if (currentSort === 'born') {
      return currentOrder === 'desc'
        ? secondPerson.born - firstPerson.born
        : firstPerson.born - secondPerson.born;
    }

    if (currentSort === 'sex') {
      return currentOrder === 'desc'
        ? secondPerson.sex.localeCompare(firstPerson.sex)
        : firstPerson.sex.localeCompare(secondPerson.sex);
    }

    if (currentSort === 'died') {
      return currentOrder === 'desc'
        ? secondPerson.died - firstPerson.died
        : firstPerson.died - secondPerson.died;
    }
    return 0;
  });
  return copyList;
};

export function filteringData(
  people: Person[],
  searchParams: URLSearchParams,
): Person[] {
  const sex = searchParams.get('sex');
  const searchQuery = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const getCentury = (year: number) => Math.ceil(year / 100).toString();
  return people.filter(person => {
    const matchesSex = !sex || person.sex === sex;
    const matchesName =
      !searchQuery ||
      person.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCenturies =
      !centuries.length || centuries.includes(getCentury(person.born));
    return matchesSex && matchesName && matchesCenturies;
  });
}

export const getParentLink = (
  name: string | null,
  people: Person[],
  type: Type,
) => {
  const parent = people.find(p => p.name === name);
  return parent ? (
    <NavLink
      to={`/people/${parent.slug}`}
      className={classNames(type === Type.mother ? 'has-text-danger' : '')}
    >
      {parent.name || '-'}
    </NavLink>
  ) : (
    name || '-'
  );
};
