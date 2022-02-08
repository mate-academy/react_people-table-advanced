import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonName } from '../PersonName';

const renderParent = (parent: Person | null, useName: string) => {
  return parent
    ? <PersonName name={parent.name} slug={parent.slug} sex={parent.sex} />
    : (<span style={{ fontWeight: 'bold' }}>{useName}</span>);
};

export const PersonRow: React.FC<ProcessedPerson> = ({
  name,
  sex,
  born,
  died,
  slug,
  mother,
  father,
  motherName,
  fatherName,
}) => {
  const useMotherName = motherName || '-';
  const useFatherName = fatherName || '-';
  const { selectedSlug } = useParams<{ selectedSlug: string }>();

  return (
    <tr
      className={classNames(
        'Person',
        { 'is-selected': slug === selectedSlug },
      )}
    >
      <td><PersonName name={name} slug={slug} sex={sex} /></td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {renderParent(mother, useMotherName)}
      </td>
      <td>
        {renderParent(father, useFatherName)}
      </td>
    </tr>
  );
};
