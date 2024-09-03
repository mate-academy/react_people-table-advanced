import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getSearchWith } from '../../utils/searchHelper';
import { getSortIconClass } from '../../utils/getSortIcon';
import { SortField, SortOrder } from '../../types/SortTypes';
import classNames from 'classnames';

const FieldsToSort: SortField[] = [
  SortField.Name,
  SortField.Sex,
  SortField.Born,
  SortField.Died,
];

type Props = {
  filteredPeople: Person[];
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ filteredPeople, people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortFieldParams = searchParams.get('sort') as SortField | null;
  const currentSortOrderParams = searchParams.get('order') as SortOrder | null;

  const handleSort = (field: SortField) => {
    let newOrder: SortOrder | null = SortOrder.Asc;

    if (currentSortFieldParams === field) {
      newOrder =
        currentSortOrderParams === SortOrder.Asc
          ? SortOrder.Desc
          : currentSortOrderParams === SortOrder.Desc
            ? null
            : SortOrder.Asc;
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
    let newOrder: SortOrder | null = SortOrder.Asc;

    if (currentSortFieldParams === field) {
      newOrder =
        currentSortOrderParams === SortOrder.Asc
          ? SortOrder.Desc
          : currentSortOrderParams === SortOrder.Desc
            ? null
            : SortOrder.Asc;
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
                      className={classNames('fas', {
                        'fa-sort': currentSortFieldParams === null,
                        [getSortIconClass(
                          currentSortFieldParams as SortField,
                          field,
                          currentSortOrderParams!,
                        )]: currentSortFieldParams !== null,
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

      <tbody>
        {filteredPeople.map(person => (
          <PersonLink key={person.slug} {...person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
