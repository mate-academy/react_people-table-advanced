import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ServerIPerson } from '../../api/interface';
import { PersonInfo } from '../PersonInfo';
import { PersonName } from '../PersonName';

import './PersonRow.scss';

type PersonRow = {
  people: ServerIPerson[];
  initialList: ServerIPerson[];
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
          className={classNames({ selected: person.slug === selectedPerson })}
        >
          {Object.keys(person).map((key) => (
            key !== 'slug' && (
              <td
                key={key}
                className={classNames({ 'selected-collumn': searchParams.get('sortBy')?.toLowerCase() === key })}
              >
                {key === 'name' && (
                  <PersonName
                    person={person}
                  />
                )}
                {(key === 'born' || key === 'sex' || key === 'died') && (
                  person[key]
                )}
                {key === 'fatherName' && (
                  person.fatherName && (
                    initialList.find(man => man.name === person.fatherName)
                      ? (
                        <PersonInfo
                          person={initialList.find((man) => man.name === person.fatherName)}
                        />
                      )
                      : (
                        <p className="person">{person.fatherName}</p>
                      ))
                )}
                {key === 'motherName' && (
                  person.motherName && (
                    initialList.find(woman => woman.name === person.motherName)
                      ? (
                        <PersonInfo
                          person={initialList.find(woman => woman.name === person.motherName)}
                        />
                      )
                      : (
                        <p className="person">{person.motherName}</p>
                      ))
                )}
              </td>
            )
          ))}
        </tr>
      ))}
    </>
  );
};
