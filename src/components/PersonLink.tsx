import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { GlobalContext } from './GeneralContext';
import { Sex } from '../types/Sex';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { sortedPeople, searchParams } = useContext(GlobalContext);
  const { user } = useParams();
  const selectedUser = user;

  const {
    motherName,
    fatherName,
    slug,
    sex,
    name,
    born,
    died,
  } = person;

  const mother = sortedPeople.find(human => human.name === motherName);
  const father = sortedPeople.find(human => human.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedUser,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({
            'has-text-danger': sex === Sex.FEMALE,
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName
          && mother
          ? (
            <Link
              to={{
                pathname: `/people/${mother.slug}`,
                search: searchParams.toString(),
              }}
              className={classNames({
                'has-text-danger': mother.sex === Sex.FEMALE,
              })}
            >
              {mother.name}
            </Link>
          )
          : motherName}

        {!motherName && '-'}
      </td>

      <td>
        {fatherName
          && father
          ? (
            <Link
              to={{
                pathname: `/people/${father.slug}`,
                search: searchParams.toString(),
              }}
            >
              {father.name}
            </Link>
          )
          : fatherName}

        {!fatherName && '-'}
      </td>
    </tr>
  );
};
