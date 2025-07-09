import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort');
  const isDesc = searchParams.get('order') === 'desc';

  const getSortUrl = (field: string) => {
    const params = new URLSearchParams(searchParams);

    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('sort', field);
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    return `/people?${params.toString()}`;
  };

  const renderSortIcon = (field: string) => {
    const isThisSort = sortField === field;

    return (
      <span className="icon">
        <i
          className={classNames('fas', {
            'fa-sort': !isThisSort,
            'fa-sort-up': isThisSort && !isDesc,
            'fa-sort-down': isThisSort && isDesc,
          })}
        />
      </span>
    );
  };

  const getMotherSlug = (person: Person): string => {
    const slug = people.find(p => p.name === person.motherName)?.slug;

    return slug ?? '';
  };

  const getFatherSlug = (person: Person): string => {
    const slug = people.find(p => p.name === person.fatherName)?.slug;

    return slug ?? '';
  };

  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex');

  const filteredPeople = people.filter(p => {
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.fatherName?.toLowerCase().includes(query) ||
      p.motherName?.toLowerCase().includes(query);

    const bornCentury = Math.ceil(p.born / 100);
    const matchesCentury =
      centuries.length === 0 || centuries.includes(bornCentury);

    const matchesSex = !sex || p.sex === sex;

    return matchesQuery && matchesCentury && matchesSex;
  });

  if (sortField) {
    filteredPeople.sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return isDesc
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return isDesc ? bValue - aValue : aValue - bValue;
      }

      return 0;
    });
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            Name
            <Link to={getSortUrl('name')} className="has-text-dark">
              {renderSortIcon('name')}
            </Link>
          </th>
          <th>
            Sex
            <Link to={getSortUrl('sex')} className="has-text-dark">
              {renderSortIcon('sex')}
            </Link>
          </th>
          <th>
            Born
            <Link to={getSortUrl('born')} className="has-text-dark">
              {renderSortIcon('born')}
            </Link>
          </th>
          <th>
            Died
            <Link to={getSortUrl('died')} className="has-text-dark">
              {renderSortIcon('died')}
            </Link>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            getMotherSlug={getMotherSlug}
            getFatherSlug={getFatherSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
