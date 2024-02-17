import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
};

export const PersonTableRow: React.FC<Props> = ({ person }) => {
  const { slug: currentSlug } = useParams();

  const {
    slug,
    sex,
    died,
    born,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  const renderParent = (parentName: string | null, parent?: Person) => {
    if (parent) {
      return <PersonLink person={parent} />;
    }

    if (parentName) {
      return parentName;
    }

    return '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === currentSlug,
      })}
    >
      <td aria-label="PersonLink_Cell">
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>{renderParent(motherName, mother)}</td>

      <td>{renderParent(fatherName, father)}</td>
    </tr>
  );
};
