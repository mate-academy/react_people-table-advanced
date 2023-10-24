import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    fatherName,
    motherName,
    father,
    mother,
  } = person;

  const { slug: urlSlug } = useParams();

  const getClassByGender = (gender: string) => {
    return cn({
      'has-text-danger': gender === 'f',
    });
  };

  const getParentInfo = (
    parentName: string | null,
    personFromData: Person | undefined,
  ) => {
    if (parentName && personFromData) {
      return (
        <Link
          to={`${personFromData.slug}`}
          className={getClassByGender(personFromData.sex)}
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
      className={cn({
        'has-background-warning': slug === urlSlug,
      })}
    >
      <td>
        <Link
          to={`${slug}`}
          className={getClassByGender(sex)}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {getParentInfo(motherName, mother)}
      </td>

      <td>
        {getParentInfo(fatherName, father)}
      </td>
    </tr>
  );
};
