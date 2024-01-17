import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
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

  const { slug: urlSlug } = useParams();

  const getClassByGender = (gender: string) => {
    return classNames({
      'has-text-danger': gender === 'f',
    });
  };

  const getParentsInfo = (
    parentName: string | null,
    personFromServer: Person | undefined,
  ) => {
    if (parentName && personFromServer) {
      return (
        <Link
          to={`${personFromServer.slug}`}
          className={getClassByGender(personFromServer.sex)}
        >
          {parentName}
        </Link>
      );
    }

    if (parentName) {
      return `${parentName}`;
    }

    return '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === urlSlug,
      })}
    >
      <td>
        <Link to={`${slug}`} className={getClassByGender(sex)}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {getParentsInfo(motherName, mother)}
      </td>
      <td>
        {getParentsInfo(fatherName, father)}
      </td>
    </tr>
  );
};
