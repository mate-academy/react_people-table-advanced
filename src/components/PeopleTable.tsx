import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const toggleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sortField !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!sortOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const getArrow = (field: string) => {
    if (sortField !== field) {
      return null;
    }

    return (
      <span className="icon is-small ml-1">
        {sortOrder === 'desc' ? '↓' : '↑'}
      </span>
    );
  };

  return (
    <div className="box table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th onClick={() => toggleSort('name')}>
              <span>Name</span>
              {getArrow('name')}
            </th>
            <th onClick={() => toggleSort('sex')}>
              <span>Sex</span>
              {getArrow('sex')}
            </th>
            <th onClick={() => toggleSort('born')}>
              <span>Born</span>
              {getArrow('born')}
            </th>
            <th onClick={() => toggleSort('died')}>
              <span>Died</span>
              {getArrow('died')}
            </th>
            <th onClick={() => toggleSort('motherName')}>
              <span>Mother</span>
              {getArrow('motherName')}
            </th>
            <th onClick={() => toggleSort('fatherName')}>
              <span>Father</span>
              {getArrow('fatherName')}
            </th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} name={person.name} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  <PersonLink
                    person={people.find(p => p.name === person.motherName)}
                    name={person.motherName}
                  />
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  <PersonLink
                    person={people.find(p => p.name === person.fatherName)}
                    name={person.fatherName}
                  />
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
