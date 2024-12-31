import cn from 'classnames';
import { PersonLinkItem } from './PersonLinkItem';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
  isSelected: boolean;
};

export const PersonLink: React.FC<Props> = ({ person, people, isSelected }) => {
  const { slug, sex, born, died, motherName, fatherName } = person;

  const isMother = people.find(mother => mother.name === motherName);
  const isFather = people.find(father => father.name === fatherName);

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLinkItem person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {isMother ? (
          <PersonLinkItem person={isMother} />
        ) : (
          <p>{motherName || '-'}</p>
        )}
      </td>
      <td>
        {isFather ? (
          <PersonLinkItem person={isFather} />
        ) : (
          <p>{fatherName || '-'}</p>
        )}
      </td>
    </tr>
  );
};
