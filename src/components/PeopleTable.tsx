/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { SortParam } from './SortParam';
import { SortTypes } from '../types/SortTypes';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const sortKeys = [
    SortTypes.Name,
    SortTypes.Sex,
    SortTypes.Born,
    SortTypes.Died,
  ];

  const { personId } = useParams();
  const [activePersonName, setActivePersonName] = useState<string | null>(null);

  const isPersonInTable = (personName: string) => {
    return people?.find(({ name }) => name === personName);
  };

  const handleLinkForParent = (personName: string) => {
    if (!people) {
      return;
    }

    if (isPersonInTable(personName)) {
      const indexOfPerson = people?.findIndex(
        person => person.name === personName,
      );
      const person = people[indexOfPerson];
      const { name, sex, slug } = person;

      return <PersonLink name={name} sex={sex} slug={slug} />;
    }

    return personName;
  };

  useEffect(() => {
    if (personId && people) {
      const person = people.find(({ slug }) => slug === personId);

      if (person) {
        setActivePersonName(person.name);
      } else {
        setActivePersonName(null);
      }
    }
  }, [personId, people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortKeys.map(key => (
            <SortParam param={key} key={key} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(
          ({ name, sex, born, died, motherName, fatherName, slug }) => {
            return (
              <tr
                key={slug}
                className={classNames({
                  'has-background-warning': activePersonName === name,
                })}
                data-cy="person"
              >
                <td>
                  <PersonLink name={name} sex={sex} slug={slug} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>{motherName ? handleLinkForParent(motherName) : '-'}</td>
                <td>{fatherName ? handleLinkForParent(fatherName) : '-'}</td>
              </tr>
            );
          },
        )}
      </tbody>
    </table>
  );
};
