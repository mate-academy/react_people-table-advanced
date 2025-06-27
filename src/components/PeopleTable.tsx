import cn from 'classnames';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { SortField } from '../types/SortField';

type PeopleTableProps = {
  visiblePeople: Person[];
  currentSort: string | null;
  currentOrder: string | null;
};

export const PeopleTable = ({
  visiblePeople,
  currentSort,
  currentOrder,
}: PeopleTableProps) => {
  const renderParentCell = (parentName?: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = visiblePeople.find(person => person.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
  };

  const { slug } = useParams();

  const getNextSortParams = (field: string): SearchParams => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentSort === field && currentOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  if (visiblePeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortField).map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink params={getNextSortParams(`${value}`)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': currentSort !== value,
                        'fa-sort-up':
                          currentSort === value && currentOrder !== 'desc',
                        'fa-sort-down':
                          currentSort === value && currentOrder === 'desc',
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParentCell(person.motherName)}</td>
            <td>{renderParentCell(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
