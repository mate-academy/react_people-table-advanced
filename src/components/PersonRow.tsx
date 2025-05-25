import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
  isSelected: boolean;
};

export const PersonRow: React.FC<Props> = ({ person, people, isSelected }) => {
  const { name, slug, sex, born, died, motherName, fatherName } = person;

  const renderParentLink = (parentName?: string | null, isMother = false) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(p => p.name === parentName);

    if (!parent) {
      return parentName;
    }

    return (
      <Link
        to={`/people/${parent.slug}`}
        className={classNames({ 'has-text-danger': isMother })}
      >
        {parentName}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{renderParentLink(motherName, true)}</td>
      <td>{renderParentLink(fatherName, false)}</td>
    </tr>
  );
};
