import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { scrollToSelectedPerson } from '../../helpers/scrollToSelectedPerson';

interface Props {
  person: Person;
}

export const PeopleTableRow: React.FC<Props> = React.memo(({
  person,
}) => {
  const { slug } = useParams();

  const selectAndShowPerson = useCallback(scrollToSelectedPerson, []);

  return (
    <tr
      id={person.slug}
      data-cy="person"
      className={cn(
        { 'has-background-warning': person.slug === slug },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {person.mother ? (
          <PersonLink
            person={person.mother}
            selectAndShowPerson={selectAndShowPerson}
          />
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {person.father ? (
          <PersonLink
            person={person.father}
            selectAndShowPerson={selectAndShowPerson}
          />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
});
