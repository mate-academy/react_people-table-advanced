import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person, SortField, SortFieldData } from '../../types';
import { PersonRow } from '../PersonRow';
import { SearchLink } from '../SearchLink';
import { getVisiblePeople } from '../../utils/visiblePeopleHelper';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || null;
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getSortParams = (sortField: string) => {
    if (sort !== sortField) {
      return {
        sort: sortField,
        order: null,
      };
    }

    if (sort === sortField && !order) {
      return {
        sort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const preparedPeople: Person[] = people.map(person => ({
    ...person,
    mother: people.find(({ name }) => name === person.motherName),
    father: people.find(({ name }) => name === person.fatherName),
  }));

  const sortFieldData: SortFieldData = [
    { sortField: SortField.Name, fieldText: 'Name' },
    { sortField: SortField.Sex, fieldText: 'Sex' },
    { sortField: SortField.Born, fieldText: 'Born' },
    { sortField: SortField.Died, fieldText: 'Died' },
  ];

  const visiblePeople = getVisiblePeople(preparedPeople, {
    query,
    sex,
    centuries,
    sort,
    order,
  });

  if (preparedPeople.length && !visiblePeople.length) {
    return (
      <p>There are no people matching the current search criteria</p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFieldData.map(({ sortField, fieldText }) => (
            <th key={sortField}>
              <span className="is-flex is-flex-wrap-nowrap">
                {fieldText}
                <SearchLink
                  params={getSortParams(sortField)}
                >
                  <span className="icon">
                    <i className={classNames('fas fa-sort', {
                      'fa-sort-up': sort === sortField && !order,
                      'fa-sort-down': sort === sortField && order,
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
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
