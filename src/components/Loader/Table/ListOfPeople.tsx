import React from 'react';
import { Person } from '../../../types/Person';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

export interface ListProps {
  people: Person[];
  searchParams: URLSearchParams;
}

export const ListOfPeople: React.FC<ListProps> = ({ people, searchParams }) => {
  const { slug } = useParams();

  //
  return (
    <tbody>
      {people.map(person => {
        const findFather = people.find(p => p.name === person.fatherName);
        const findMother = people.find(p => p.name === person.motherName);

        return (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} searchParams={searchParams} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {person.motherName?.trim() ? (
              <td>
                {findMother !== undefined ? (
                  <PersonLink person={findMother} searchParams={searchParams} />
                ) : (
                  person.motherName.trim()
                )}
              </td>
            ) : (
              <td>-</td>
            )}
            {person.fatherName?.trim() ? (
              <td>
                {findFather !== undefined ? (
                  <PersonLink person={findFather} searchParams={searchParams} />
                ) : (
                  person.fatherName.trim()
                )}
              </td>
            ) : (
              <td>-</td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};
