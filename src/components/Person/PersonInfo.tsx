import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
  setIsActiveRow: (arg: string) => void,
  isActiveRow: string,
};

export const PersonInfo: React.FC<Props> = ({
  person,
  setIsActiveRow,
  isActiveRow,
}) => {
  const [searchParams] = useSearchParams();
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const parentInfo = (
    parent: Person | undefined,
    parentName: string | null,
  ) => {
    return (
      parent ? (
        <td>
          <Link
            className={classNames({ 'has-text-danger': parent.sex === 'f' })}
            to={`/people/${parent.slug}?${searchParams}`}
            onClick={() => setIsActiveRow(parent.slug)}
          >
            {parent.name}
          </Link>
        </td>
      ) : (
        <td>{parentName || '-'}</td>
      ));
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isActiveRow === slug })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}?${searchParams}`}
          onClick={() => setIsActiveRow(slug)}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {parentInfo(mother, motherName)}
      {parentInfo(father, fatherName)}
    </tr>
  );
};
