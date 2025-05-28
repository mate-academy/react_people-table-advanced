import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  findPersonByName: (name: string) => Person | undefined;
};

export const PersonInfo: React.FC<Props> = ({ person, findPersonByName }) => {
  const { slug } = useParams<{ slug: string }>();

  const getSelectedPersonClass = () => {
    return classNames({
      'has-background-warning': person.slug === slug,
    });
  };

  const renderParentLink = (
    parentName: string | null,
    findParent: (name: string) => Person | undefined,
  ) => {
    if (!parentName) {
      return <span>-</span>;
    }

    const parent = findParent(parentName);

    return parent ? (
      <PersonLink person={parent} name={parentName} />
    ) : (
      <span>{parentName}</span>
    );
  };

  return (
    <tr data-cy="person" key={person.slug} className={getSelectedPersonClass()}>
      <td>
        <PersonLink person={person} name={person.name} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderParentLink(person.motherName, findPersonByName)}</td>
      <td>{renderParentLink(person.fatherName, findPersonByName)}</td>
    </tr>
  );
};
