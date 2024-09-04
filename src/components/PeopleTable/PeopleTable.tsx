import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { getSearchWith } from '../../utils/searchHelper';
import { getSortIconClass } from '../../utils/getSortIcon';
import { SortField, SortOrder } from '../../types/SortTypes';
import classNames from 'classnames';
import { SearchParams } from '../../types/SearchParams';
import { determineNewOrder } from '../../utils/determineNewOrder';

const FieldsToSort: SortField[] = [
  SortField.Name,
  SortField.Sex,
  SortField.Born,
  SortField.Died,
];

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortFieldParams = searchParams.get(SearchParams.Sort) as SortField | null;
  const currentSortOrderParams = searchParams.get(SearchParams.Order) as SortOrder | null;

  const handleSort = (field: SortField) => {
    const newOrder = determineNewOrder(field, currentSortFieldParams, currentSortOrderParams);
    
    const newSearchParams = new URLSearchParams(searchParams);
  
    if (!newOrder) {
      newSearchParams.delete(SearchParams.Sort);
      newSearchParams.delete(SearchParams.Order);
    } else {
      newSearchParams.set(SearchParams.Sort, field);
      newSearchParams.set(SearchParams.Order, newOrder);
    }
  
    setSearchParams(newSearchParams, { replace: true });
  };

  const getLinkParams = (field: SortField) => {
    const newOrder = determineNewOrder(field, currentSortFieldParams, currentSortOrderParams);
  
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
          {FieldsToSort.map(field => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {fieldName}
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
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink key={person.slug} {...person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
