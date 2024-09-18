import React from 'react';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { useSearchParams, Link } from 'react-router-dom';
import { SortOrder } from '../types/Order';
import { getSortIconClass } from '../utils/GetSortIconClass';
import { sortPeople } from '../utils/SortPeopleUtils';
import { SortField } from '../types/SortField';
import { SearchParams } from '../types/SearchParams';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get(SearchParams.Sort) || SortField.Name;
  const sortOrder =
    (searchParams.get(SearchParams.Order) as SortOrder) || SortOrder.Ascending;

  const sortedPeople = React.useMemo(
    () => sortPeople(people, sortField, sortOrder),
    [people, sortField, sortOrder],
  );

  const updateSearchParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    setSearchParams(params);
  };

  const handleSortClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    field: SortField,
  ) => {
    event.preventDefault();

    const isCurrentField = sortField === field;
    const newSortOrder =
      isCurrentField && sortOrder === SortOrder.Ascending
        ? SortOrder.Descending
        : SortOrder.Ascending;

    updateSearchParams({
      sort: field,
      order: newSortOrder,
    });
  };

  const headers = [
    { label: 'Name', field: SortField.Name },
    { label: 'Sex', field: SortField.Sex },
    { label: 'Born', field: SortField.Born },
    { label: 'Died', field: SortField.Died },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headers.map(({ label, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <Link to="#" onClick={event => handleSortClick(event, field)}>
                  <span className="icon">
                    <i
                      className={getSortIconClass({
                        sortField,
                        field,
                        sortOrder,
                      })}
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

      <PersonInfo people={sortedPeople} />
    </table>
  );
};
