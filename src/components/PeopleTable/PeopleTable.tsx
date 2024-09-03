import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getSearchWith } from '../../utils/searchHelper';
import { getSortIconClass } from '../../utils/getSortIcon';

const FieldsToSort = ['name', 'sex', 'born', 'died'] as const;

type SortField = (typeof FieldsToSort)[number];
type SortOrder = 'asc' | 'desc';

type Props = {
  filteredPeople: Person[];
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ filteredPeople, people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortFieldParams = searchParams.get('sort') as SortField | null;
  const currentSortOrderParams = searchParams.get('order') as SortOrder | null;

  const handleSort = (field: SortField) => {
    let newOrder: SortOrder | null = 'asc';

    if (currentSortFieldParams === field) {
      newOrder =
        currentSortOrderParams === 'asc'
          ? 'desc'
          : currentSortOrderParams === 'desc'
            ? null
            : 'asc';
    }

    const newSearchParams = new URLSearchParams(searchParams);

    if (!newOrder) {
      newSearchParams.delete('sort');
      newSearchParams.delete('order');
    } else {
      newSearchParams.set('sort', field);
      newSearchParams.set('order', newOrder);
    }

    setSearchParams(newSearchParams, { replace: true });
  };

  const getLinkParams = (field: SortField) => {
    let newOrder: SortOrder | null = 'asc';

    if (currentSortFieldParams === field) {
      newOrder =
        currentSortOrderParams === 'asc'
          ? 'desc'
          : currentSortOrderParams === 'desc'
            ? null
            : 'asc';
    }

    return {
      sort: newOrder ? field : null,
      order: newOrder,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {FieldsToSort.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <Link
                  to={`?${getSearchWith(searchParams, getLinkParams(field))}`}
                  onClick={() => handleSort(field)}
                >
                  <span className="icon">
                    <i
                      className={`fas ${getSortIconClass(currentSortFieldParams, field, currentSortOrderParams)}`}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink key={person.slug} {...person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
