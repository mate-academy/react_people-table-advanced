import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SortField } from '../types/SortField';
import { SortByLink } from './SortByLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: activeSlug } = useParams();

  const findParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    return parent
      ? <PersonLink person={parent} />
      : parentName || '-';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortByLink field={SortField.Name} />
          <SortByLink field={SortField.Sex} />
          <SortByLink field={SortField.Born} />
          <SortByLink field={SortField.Died} />
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex, born, died, motherName, fatherName, slug,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classNames(
                { 'has-background-warning': slug === activeSlug },
              )}
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{findParent(motherName)}</td>
              <td>{findParent(fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
