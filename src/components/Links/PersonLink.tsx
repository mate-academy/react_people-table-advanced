import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const getMother = useMemo(() => {
    return person.mother
      ? (
        <Link
          to={`../${person.mother.slug}`}
          className="has-text-danger"
        >
          {person.mother.name}
        </Link>
      )
      : person.motherName;
  }, []);

  const getFather = useMemo(() => {
    return person.father
      ? (
        <Link
          to={`../${person.father.slug}`}
        >
          {person.father.name}
        </Link>
      )
      : person.fatherName;
  }, []);

  return (
    <>
      <td>
        <Link
          to={`../${person?.slug}`}
          className={classNames(null,
            { 'has-text-danger': person?.sex === 'f' })}
        >
          {person?.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? getMother : '-'}
      </td>
      <td>
        {person.fatherName ? getFather : '-'}
      </td>
    </>
  );
};
