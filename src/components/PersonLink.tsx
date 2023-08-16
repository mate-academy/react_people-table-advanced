import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../types';

type Props = {
  person: Person,
  findWomen: Person | undefined,
  findFather: Person | undefined,
  handleClick: (names: string | null) => void,
};

export const PersonLink: FC<Props> = ({
  person,
  findWomen,
  findFather,
  handleClick,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  return (
    <>
      <td>
        <Link
          to={`#/people/${slug}`}
          className={ClassNames(
            {
              'has-text-danger': sex === 'f',
            },
          )}
          onClick={() => handleClick(name)}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {findWomen
          ? (
            <Link
              to={`#/people/${findWomen.slug}`}
              className={ClassNames({
                'has-text-danger': findWomen,
              })}
              onClick={() => handleClick(motherName)}
            >
              {motherName}
            </Link>
          )
          : motherName || '-' }
      </td>
      <td>
        {findFather
          ? (
            <Link
              to={`#/people/${findFather.slug}`}
              onClick={() => handleClick(fatherName)}
            >
              {fatherName}
            </Link>
          )
          : fatherName || '-'}
      </td>
    </>
  );
};
