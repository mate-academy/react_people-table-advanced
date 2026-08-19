import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

interface Props {
  people: Person[];
  selectedSlug?: string;
}

type SortableFields = 'name' | 'sex' | 'born' | 'died';

const COLUMNS: { field: SortableFields; title: string }[] = [
  { field: 'name', title: 'Name' },
  { field: 'sex', title: 'Sex' },
  { field: 'born', title: 'Born' },
  { field: 'died', title: 'Died' },
];

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const sortField = searchParams.get('sort') as SortableFields | null;
  const isDesc = searchParams.get('order') === 'desc';

  const findPersonByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    return people.find(p => p.name === name) || null;
  };

  const getSortParams = (field: SortableFields): SearchParams => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (!isDesc) {
      return { sort: field, order: 'desc' };
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
          {COLUMNS.map(({ field, title }) => (
            <th key={field}>
              <span className="is-flex is-align-items-center">
                <span>{title}</span>
                <SearchLink params={getSortParams(field)} className="icon">
                  <i
                    className={`fas ${
                      sortField === field
                        ? isDesc
                          ? 'fa-sort-down'
                          : 'fa-sort-up'
                        : 'fa-sort'
                    }`}
                  />
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : undefined}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
