import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
  onSelectPerson: (slug: string) => void
  isSelected: boolean
  motherSlug?: string
  fatherSlug?: string
};

export const Row: React.FC<Props> = ({
  person,
  onSelectPerson,
  isSelected,
  motherSlug,
  fatherSlug,
}) => {
  const {
    slug,
    motherName,
    sex,
    born,
    died,
    name,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isSelected })}
    >
      <td>
        <Link
          onClick={() => onSelectPerson(slug)}
          to={`#/people/:${slug}`}
          className={classNames({ 'has-text-danger': motherSlug })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlug
          ? (
            <Link
              to={`#/:${person.slug}`}
              className={classNames({ 'has-text-danger': motherSlug })}
              onClick={() => motherSlug && onSelectPerson(motherSlug)}
            >
              {motherName}
            </Link>
          )
          : motherName || '-'}
      </td>
      <td>
        {fatherSlug
          ? (
            <Link
              to={`#/:${person.slug}`}
              onClick={() => fatherSlug && onSelectPerson(fatherSlug)}
            >
              {fatherName}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </tr>
  );
};
