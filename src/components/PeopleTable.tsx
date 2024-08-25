/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */

import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { useMemo, useState } from 'react';
import { SearchLink } from './SearchLink';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);

  const getChosenColoumn = (coloumn: string) => {
    const sortParam = searchParams.get('sort');
    const orderParam = searchParams.get('order');

    if (sortParam === coloumn) {
      if (orderParam === null) {
        return { sort: coloumn, order: 'desc' };
      } else {
        return { sort: null, order: null };
      }
    } else {
      return { sort: coloumn, order: null };
    }
  };

  useMemo(() => {
    const sortValue = searchParams.get('sort') as keyof Person | null;
    const orderVal = searchParams.get('order');
    const theSex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase();
    const theCenturies = searchParams.getAll('centuries');
    const clonedPeople = [...people];

    const genderFilter = theSex
      ? clonedPeople.filter(p => p.sex === theSex)
      : clonedPeople;

    const queryFilter = query
      ? genderFilter.filter(p => p.name.toLowerCase().includes(query))
      : genderFilter;

    const centuriesFilter = theCenturies.length
      ? queryFilter.filter(p => {
        const centuryBorn = (Math.floor(p.born / 100) + 1).toString();

          theCenturies.includes(centuryBorn);
        })
      : queryFilter;

    if (sortValue) {
      centuriesFilter.sort((a, b) => {
        let valA = a[sortValue];
        let valB = b[sortValue];

        if (typeof valA === 'string' && typeof valB === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();

          return orderVal === 'desc'
            ? valB.localeCompare(valA)
            : valA.localeCompare(valB);
        }

        if (
          valA !== null &&
          valA !== undefined &&
          valB !== null &&
          valB !== undefined
        ) {
          if (valA < valB) {
            return orderVal === 'desc' ? 1 : -1;
          }

          if (valA > valB) {
            return orderVal === 'desc' ? -1 : 1;
          }
        }

        return 0;
      });
    }

    setSortedPeople(centuriesFilter);
  }, [people, searchParams]);

  const linkParents = sortedPeople.map(person => ({
    ...person,
    mother: people.find(curPerson => curPerson.name === person.motherName),
    father: people.find(curPerson => curPerson.name === person.fatherName),
  }));

  const getArrowDirection = (cell: string) => {
    const sortParam = searchParams.get('sort');
    const orderParam = searchParams.get('order');

    if (sortParam === cell) {
      return orderParam === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
    }

    return 'fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getChosenColoumn('name')}>
                <span className="icon">
                  <i className={cn('fas', getArrowDirection('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getChosenColoumn('sex')}>
                <span className="icon">
                  <i className={cn('fas', getArrowDirection('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getChosenColoumn('born')}>
                <span className="icon">
                  <i className={cn('fas', getArrowDirection('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getChosenColoumn('died')}>
                <span className="icon">
                  <i className={cn('fas', getArrowDirection('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {linkParents.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
