import React, { useContext, useMemo } from 'react';
import './PeopleTable.scss';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleContext } from '../PeopleContext';
import { PersonRow } from '../PersonRow';

export const PeopleTable:React.FC = () => {
  const { people, visiblePeople } = useContext(PeopleContext);
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const titleCellForSort = people.length > 0
    ? Object.keys(people[0]).splice(0, 4)
    : [];

  const visiblePeopleAfterSort: Person[] = useMemo(() => {
    if (sortBy) {
      switch (sortBy) {
        case 'name':
        case 'sex':
          return (sortOrder === 'asc'
            ? visiblePeople.sort(
              (p1, p2) => p1[sortBy].localeCompare(p2[sortBy]),
            )
            : visiblePeople.sort(
              (p1, p2) => p2[sortBy].localeCompare(p1[sortBy]),
            )
          );
        case 'born':
        case 'died':
          return (sortOrder === 'asc'
            ? visiblePeople.sort((p1, p2) => p1[sortBy] - p2[sortBy])
            : visiblePeople.sort((p1, p2) => p2[sortBy] - p1[sortBy])
          );
        default:
          break;
      }
    }

    return visiblePeople;
  }, [visiblePeople, sortBy, sortOrder]);

  const handleTitleClick = (title: string) => {
    searchParams.set('sortBy', title);
    searchParams.set(
      'sortOrder', (sortOrder === 'asc' && sortBy === title) ? 'desc' : 'asc',
    );

    setSearchParams(searchParams);
  };

  return (
    <table className="peopleTable">
      <thead>
        <tr className="peopleTable__header">
          {
            titleCellForSort.map(title => (
              <th
                key={title}
                onClick={() => handleTitleClick(title)}
                className={classNames(
                  'peopleTable__cell-filter',
                  {
                    'peopleTable__cell-filter--asc':
                      sortOrder === 'asc' && sortBy === title,
                    'peopleTable__cell-filter--desc':
                      sortOrder === 'desc' && sortBy === title,
                  },
                )}
              >
                {title[0].toUpperCase() + title.slice(1)}
              </th>
            ))
          }
          <th className="peopleTable__cell">Mother</th>
          <th className="peopleTable__cell">Father</th>
        </tr>
      </thead>
      <tbody>
        {visiblePeopleAfterSort.map(person => (
          <tr
            key={person.slug}
            className={classNames({ peopleTable__row: person.slug === slug })}
          >
            <PersonRow
              person={person}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
