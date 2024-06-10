/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { useSearchParams } from 'react-router-dom';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  setSelectedPerson,
}) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  let visiblePeople = [...people];

  if (query) {
    visiblePeople = people.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sex) {
    visiblePeople = people.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = people.filter(person =>
      centuries.some(
        (century: string) =>
          parseInt(century, 10) === Math.floor(person.born / 100) + 1,
      ),
    );
  }

  if (sortField) {
    visiblePeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visiblePeople.reverse();
  }

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
              <SortLink field={'name'} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink field={'sex'} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink field={'born'} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink field={'died'} />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => (
          <PersonInfo
            key={person.slug}
            person={person}
            people={visiblePeople}
            selectedPerson={selectedPerson}
            setSelectedPerson={setSelectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
};
