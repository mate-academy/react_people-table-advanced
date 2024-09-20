/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../../types';
import { PeopleRow } from '../PeopleRow';
import { useParams } from 'react-router-dom';
import { SortableTableHeaders } from '../../constants/SortableTableHeaders';
import { PeopleHeaderRow } from '../PeopleHeaderRow';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        {Object.values(SortableTableHeaders).map((headerTitle, index) => (
          <PeopleHeaderRow
            key={`${headerTitle}-${index}`}
            headerTitle={headerTitle}
          />
        ))}
        <th>Mother</th>
        <th>Father</th>
      </thead>

      <tbody>
        {people.map((person, index) => (
          <PeopleRow
            key={index}
            person={person}
            people={people}
            currentSlug={slug}
          />
        ))}
      </tbody>
    </table>
  );
};
