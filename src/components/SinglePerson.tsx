import classNames from 'classnames';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const SinglePerson:FC<Props> = ({ person }) => {
  const location = useLocation();
  const {
    slug,
    sex,
    name,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={
        classNames({ 'has-background-warning': `/people/${slug}` === location.pathname })
      }
    >
      <td>
        <PersonLink name={name} slug={slug} sex={sex} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          mother
            ? (
              <PersonLink
                name={mother.name}
                slug={mother.slug}
                sex={mother.sex}
              />
            )
            : motherName || '-'
        }
      </td>
      <td>
        {
          father
            ? (
              <PersonLink
                name={father.name}
                slug={father.slug}
                sex={father.sex}
              />
            )
            : fatherName || '-'
        }
      </td>
    </tr>
  );
};
