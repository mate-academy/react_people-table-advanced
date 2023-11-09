import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink/SearchLink';
import { Person } from '../../types';

type Props = {
  people: Person[];
  filteredPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people, filteredPeople }) => {
  const [searchParams] = useSearchParams();
  const faSort = searchParams.get('sort') || '';
  const faOrder = searchParams.get('order') || '';
  const [sortedPeople, setSortedPeople] = useState([...filteredPeople]);

  const getPersonByName = (currentName: string | null): Person | null => {
    return people.find(person => person.name === currentName) || null;
  };

  useEffect(() => {
    setSortedPeople([...filteredPeople]);
  }, [filteredPeople]);

  const handleSortClick = (sortBy: keyof Person) => {
    const newSortedPeople = [...filteredPeople];

    newSortedPeople.sort((a, b) => {
      const aValue = a[sortBy] as string | number | undefined | null;
      const bValue = b[sortBy] as string | number | undefined | null;

      if (aValue == null || bValue == null) {
        return 0;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (!faSort && !faOrder) {
          return aValue - bValue;
        }

        if (faSort && !faOrder) {
          return bValue - aValue;
        }
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        if (!faSort && !faOrder) {
          return aValue.localeCompare(bValue);
        }

        if (faSort && !faOrder) {
          return bValue.localeCompare(aValue);
        }
      }

      return 0;
    });

    setSortedPeople(newSortedPeople);
  };

  const getSortParams = (linkParameter: keyof Person) => {
    if (faSort !== linkParameter) {
      return { sort: linkParameter, order: null };
    }

    return {
      sort: faOrder ? null : linkParameter,
      order: faOrder ? null : linkParameter,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >

      <thead>
        <tr>
          {(['name', 'sex', 'born', 'died'] as Array<keyof Person>
          ).map(linkParameter => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {linkParameter.charAt(0).toUpperCase() + linkParameter.slice(1)}

                <SearchLink
                  params={getSortParams(linkParameter)}
                  onClick={() => handleSortClick(linkParameter)}
                >
                  <span className="icon">
                    <i className={cn('fas fa-sort', {
                      'fa-sort-up': (faSort === linkParameter) && !faOrder,
                      'fa-sort-down': (faSort === linkParameter) && faOrder,
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
        {sortedPeople.map(person => (
          <PersonLink
            key={person.name}
            person={person}
            getPersonByName={getPersonByName}
          />
        ))}
      </tbody>
    </table>
  );
};
