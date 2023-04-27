import React from 'react';
import {
  useLocation,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const {
    slug,
    name,
    died,
    born,
    sex,
    motherName,
    fatherName,
    mother,
    father,
  } = person;
  const { personId } = useParams();
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  const isSelected = person.slug === personId;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink
          pathname={parentPath + slug}
          search={location.search}
          name={name}
          sex={sex}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink
            pathname={parentPath + mother.slug}
            search={location.search}
            name={mother.name}
            sex="f"
          />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink
            pathname={parentPath + father.slug}
            search={location.search}
            name={father.name}
            sex="m"
          />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
