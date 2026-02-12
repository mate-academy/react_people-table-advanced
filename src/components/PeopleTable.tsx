import React from 'react';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = people.filter(person => {
    const matchesQuery = person.name.toLowerCase().includes(query);
    const matchesSex = sex ? person.sex === sex : true;

    const personCentury = Math.floor(person.born / 100) + 1;
    const matchesCentury =
      centuries.length > 0 ? centuries.includes(String(personCentury)) : true;

    return matchesQuery && matchesSex && matchesCentury;
  });

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => {
          const isSelected = person.slug === selectedSlug;

          const motherName = person.motherName?.trim() || null;
          const fatherName = person.fatherName?.trim() || null;

          const motherKey = motherName?.toLowerCase() || null;
          const fatherKey = fatherName?.toLowerCase() || null;

          const mother = motherKey
            ? people.find(p => p.name.toLowerCase().trim() === motherKey)
            : null;

          const father = fatherKey
            ? people.find(p => p.name.toLowerCase().trim() === fatherKey)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': isSelected })}
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
                ) : motherName ? (
                  <span className="has-text-danger">{motherName}</span>
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : fatherName ? (
                  fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
