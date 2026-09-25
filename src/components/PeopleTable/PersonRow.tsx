import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../../types';
import { useEffect, useRef } from 'react';

type Props = { person: Person; selectedPersonSlug?: string };

export const PersonRow = ({ person, selectedPersonSlug }: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const isSelected = selectedPersonSlug === person.slug;

  const { mother, father } = person;

  useEffect(() => {
    if (isSelected) {
      linkRef.current?.focus();
    }
  }, [isSelected]);

  return (
    <tr data-cy="person" className={cn(isSelected && 'has-background-warning')}>
      <td>
        <PersonLink ref={linkRef} person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother?.slug ? (
          <PersonLink person={mother} />
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father?.slug ? (
          <PersonLink person={father} />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
