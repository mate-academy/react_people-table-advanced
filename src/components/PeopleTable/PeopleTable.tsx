import React from 'react';
import cn from 'classnames';
import { PeopleTableRow } from '../PeopleTableRow';
import { SearchLink } from '../SearchLink';
import { Person } from '../../types/Person';
import { TableRowLabel } from '../../types/TableRowLabel';
import { capitalize } from '../../utils/capitalize';

type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const changeSortParams = (sortName: string) => {
    if (sort !== sortName) {
      return { sort: sortName, order: null };
    }

    if (sort === sortName && !order) {
      return { sort: sortName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(TableRowLabel)
            .map(label => {
              const isLabelValidToSort = label !== TableRowLabel.Mother
                && label !== TableRowLabel.Father;

              return (
                <th key={label}>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {capitalize(label)}
                    {isLabelValidToSort && (
                      <SearchLink params={changeSortParams(label)}>
                        <span className="icon">
                          <i
                            className={cn('fas', {
                              'fa-sort': label !== sort,
                              'fa-sort-up': label === sort && !order,
                              'fa-sort-down': label === sort && order,
                            })}
                          />
                        </span>
                      </SearchLink>
                    )}
                  </span>
                </th>
              );
            })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleTableRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
