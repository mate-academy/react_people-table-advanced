import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedSlug = '' } = useParams();

  const peopleArray = people.map((person) => {
    const personCopy = { ...person };
    const mother = people.find((mom) => (
      mom.name === person.motherName
    ));

    const father = people.find((dad) => (
      dad.name === person.fatherName
    ));

    if (mother) {
      personCopy.mother = mother;
    }

    if (father) {
      personCopy.father = father;
    }

    return personCopy;
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
        {peopleArray.map((person) => {
          return (
            <tr
              key={person.slug}
              className={`${person.slug === selectedSlug ? 'has-background-warning' : ''}`}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>
                {person.sex}
              </td>
              <td>
                {person.born}
              </td>
              <td>
                {person.died}
              </td>
              <td>

                {
                  person.mother
                    ? <PersonLink person={person.mother} />
                    : person.motherName || '-'
                }
              </td>
              <td>
                {
                  person.father
                    ? <PersonLink person={person.father} />
                    : person.fatherName || '-'
                }
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
