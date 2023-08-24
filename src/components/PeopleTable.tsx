import { useMemo, useState } from 'react';
import { Person } from '../types';
import { Row } from './Row';

type Props = {
  persons: Person[]
};

export const PeopleTable: React.FC<Props> = ({
  persons,
}) => {
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string>();

  const personNamesFromSlug = useMemo(() => persons
    .map(currPerson => currPerson.slug
      .toLowerCase().split('-').join('').slice(0, -4)), [persons]);

  const getPersonsMotherSlug = (fullName: string | null) => {
    if (!fullName) {
      return undefined;
    }

    const formatedFullName = fullName.toLocaleLowerCase().replace(/\s/g, '');
    const isMotherInList = personNamesFromSlug.includes(formatedFullName);

    if (!isMotherInList) {
      return undefined;
    }

    return persons.find(({ name }) => name === fullName)?.slug;
  };

  const getPersonsFatherSlug = (fullName: string | null) => {
    if (!fullName) {
      return undefined;
    }

    const formatedFullName = fullName.toLocaleLowerCase().replace(/\s/g, '');
    const isFatherInList = personNamesFromSlug.includes(formatedFullName);

    if (!isFatherInList) {
      return undefined;
    }

    return persons.find(({ name }) => name === fullName)?.slug;
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
        {persons.map(person => (
          <Row
            key={person.slug}
            person={person}
            isSelected={person.slug === selectedPersonSlug}
            motherSlug={getPersonsMotherSlug(person.motherName)}
            fatherSlug={getPersonsFatherSlug(person.fatherName)}
            onSelectPerson={setSelectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
