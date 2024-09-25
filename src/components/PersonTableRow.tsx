/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  personMother: Person | undefined;
  personFather: Person | undefined;
  slug: string | undefined;
};

export const PersonTableRow: React.FC<Props> = ({
  person,
  personMother,
  personFather,
  slug,
}) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
      key={`${person.name}-${person.born}`}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {personMother ? (
          <PersonLink person={personMother} />
        ) : (
          person.motherName || `-`
        )}
      </td>

      <td>
        {personFather ? (
          <PersonLink person={personFather} />
        ) : (
          person.fatherName || `-`
        )}
      </td>
    </tr>
  );
};
