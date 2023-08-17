import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Person } from '../types';

type Props = {
  person: Person,
  motherDetails: Person | undefined,
  fatherDetails: Person | undefined,
  handleClick: (names: string | null) => void,
};

export const PersonLink: FC<Props> = ({
  person,
  motherDetails,
  fatherDetails,
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
        {motherDetails
          ? (
            <Link
              to={`#/people/${motherDetails.slug}`}
              className={ClassNames({
                'has-text-danger': motherDetails,
              })}
              onClick={() => handleClick(motherName)}
            >
              {motherName}
            </Link>
          )
          : motherName || '-' }
      </td>
      <td>
        {fatherDetails
          ? (
            <Link
              to={`#/people/${fatherDetails.slug}`}
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
