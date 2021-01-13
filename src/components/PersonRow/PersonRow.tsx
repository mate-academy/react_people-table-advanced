import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { THEAD_TITLE } from '../../api/helper';
import { Person } from '../../api/interface';
import { PersonInfo } from '../PersonInfo';
import { PersonName } from '../PersonName';

import './PersonRow.scss';

type PersonRow = {
  people: Person[];
  initialList: Person[];
};

export const PersonRow: React.FC<PersonRow> = ({ people, initialList }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(searchParams.get('slug'));

  useEffect(() => {
    setSelectedPerson(searchParams.get('slug'));
  }, [searchParams]);

  return (
    <>
      {people.map((person) => (
        <tr
          id={person.slug}
          key={person.slug}
          className={
            person.slug === selectedPerson
              ? 'selected' : ''
          }
        >
          <td
            className={
              searchParams.get('sortBy') === THEAD_TITLE.name
                ? 'selected-collumn' : ''
            }
          >
            <PersonName
              person={person}
            />
          </td>
          <td
            className={
              searchParams.get('sortBy') === THEAD_TITLE.sex
                ? 'selected-collumn' : ''
            }
          >
            {person.sex}
          </td>
          <td
            className={
              searchParams.get('sortBy') === THEAD_TITLE.born
                ? 'selected-collumn' : ''
            }
          >
            {person.born}
          </td>
          <td
            className={
              searchParams.get('sortBy') === THEAD_TITLE.died
                ? 'selected-collumn' : ''
            }
          >
            {person.died}
          </td>
          <td>
            {person.father && (
              initialList.find(man => man.name === person.father?.name)
                ? (
                  <PersonInfo
                    person={person.father}
                  />
                )
                : (
                  <p className="person">{person.name}</p>
                ))}
          </td>
          <td>
            {person.mother && (
              initialList.find(woman => woman.name === person.mother?.name)
                ? (
                  <PersonInfo
                    person={person.mother}
                  />
                )
                : (
                  <p className="person">{person.name}</p>
                ))}
          </td>
        </tr>
      ))}
    </>
  );
};
