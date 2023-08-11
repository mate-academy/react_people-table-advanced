/* eslint-disable max-len */
import { useMemo } from 'react';
import classNames from 'classnames';
import { Person, SortType, OrderType } from '../types';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  sort: SortType,
  order: OrderType
};

export const PeopleTable:React.FC<Props> = ({ people, sort, order }) => {
  const typesOptions = [
    { name: 'Name', type: SortType.Name },
    { name: 'Sex', type: SortType.Sex },
    { name: 'Born', type: SortType.Born },
    { name: 'Died', type: SortType.Died },
  ];

  const findParent = useMemo(() => (parentName: string | null) => {
    return people?.find(person => person.name === parentName) || null;
  }, [people]);

  const sortBy = (newSortType: SortType) => {
    if (newSortType !== sort) {
      return {
        sort: newSortType,
        order: OrderType.Asc,
      };
    }

    if (newSortType === sort && order === OrderType.Asc) {
      return {
        sort: newSortType,
        order: OrderType.Desc,
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="
        table is-striped is-hoverable is-narrow is-fullwidth
      "
    >
      <thead>
        <tr>
          {typesOptions.map(type => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {type.name}
                <SearchLink
                  params={sortBy(type.type)}
                >
                  <span className="icon">
                    <i
                      data-cy="SortIcon"
                      className={classNames('fas', {
                        'fa-sort': sort !== type.type,
                        'fa-sort-down': sort === type.type && order === OrderType.Asc,
                        'fa-sort-up': sort === type.type && order === OrderType.Desc,
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
        {people?.map(person => (
          <PersonInfo
            person={person}
            key={person.slug}
            findParent={findParent}
          />
        ))}
      </tbody>
    </table>
  );
};
