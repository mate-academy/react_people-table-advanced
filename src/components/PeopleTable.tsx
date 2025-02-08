/* eslint-disable jsx-a11y/control-has-associated-label */
import { useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleTableRow } from './PeopleTableRow';
import { SearchLink } from './SearchLink';
import { useMemo } from 'react';
import classNames from 'classnames';
import { getNextSortOrder, getSortedPeople } from '../utils/getSortPeople';
import { Order } from '../types/Order';
import { capitalize } from '../utils/capitalize';

type Props = {
  filteredPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ filteredPeople }) => {
  const sortFields: string[] = ['name', 'sex', 'born', 'died'];

  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);

  const sort = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order') as Order | null;

  const sortedPeople = useMemo(() => {
    return getSortedPeople(filteredPeople, { sort, order });
  }, [filteredPeople, sort, order]);

  const getParamsToUpdate = (field: keyof Person) => {
    if (sort === field) {
      const nextOrder = getNextSortOrder(sort, order);

      return {
        sort: nextOrder || !sort ? field : null,
        order: nextOrder,
      };
    }

    return { sort: field, order: null };
  };

  const getSortIconClasses = (field: string) => {
    return classNames('fas', {
      'fa-sort': sort !== field,
      'fa-sort-up': sort === field && order !== 'desc',
      'fa-sort-down': sort === field && order === 'desc',
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {capitalize(field)}
                <SearchLink params={getParamsToUpdate(field as keyof Person)}>
                  <span className="icon">
                    <i className={getSortIconClasses(field)} />
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
        {sortedPeople.map(person => {
          return <PeopleTableRow person={person} key={person.slug} />;
        })}
      </tbody>
    </table>
  );
};
