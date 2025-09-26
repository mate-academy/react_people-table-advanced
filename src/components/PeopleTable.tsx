/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';
import { SortField } from '../types/Sort';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const sortedPeople = React.useMemo(() => {
    if (!sortField) {
      return people;
    }

    const sorted = [...people].sort((a: Person, b: Person) => {
      const A = a[sortField];
      const B = b[sortField];

      let result = 0;

      if (typeof A === 'string' && typeof B === 'string') {
        result = A.toLowerCase().localeCompare(B.toLowerCase());
      } else {
        const aNum = A === null || A === undefined ? Infinity : Number(A);
        const bNum = B === null || B === undefined ? Infinity : Number(B);

        result = aNum - bNum;
      }

      if (result === 0) {
        result = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }

      return result;
    });

    return order === 'desc' ? sorted.reverse() : sorted;
  }, [people, sortField, order]);

  const peopleMap = React.useMemo(() => {
    const map = new Map<string, Person>();

    for (const p of people) {
      map.set(p.name, p);
    }

    return map;
  }, [people]);

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
              <SortLink field="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink field="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink field="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink field="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const personMother = person.motherName
            ? peopleMap.get(person.motherName)
            : null;
          const personFather = person.fatherName
            ? peopleMap.get(person.fatherName)
            : null;
          const isLinkActive = slug === person.slug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={isLinkActive ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {personMother ? (
                <td>
                  <PersonLink person={personMother} />
                </td>
              ) : (
                <td>{person.motherName || '-'}</td>
              )}

              {personFather ? (
                <td>
                  <PersonLink person={personFather} />
                </td>
              ) : (
                <td>{person.fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
