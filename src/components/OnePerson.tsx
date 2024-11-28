import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { Gender } from '../types/gender';

type Props = {
  person: Person;
  people: Person[];
  searchParams: URLSearchParams;
};

export const OnePerson: React.FC<Props> = ({
  person: { name, sex, born, died, fatherName, motherName, slug },
  people,
  searchParams,
}) => {
  const { personSlug } = useParams();
  const selectedPerson = personSlug || '';

  const findParentLink = (parentName: string | null) => {
    if (parentName === null) {
      return '-';
    }

    const parent = people.find(p => p.name === parentName);

    if (parent && parent.sex === Gender.female) {
      return (
        <Link
          to={`../${parent.slug}?${searchParams.toString()}`}
          className="has-text-danger"
        >
          {parent.name}
        </Link>
      );
    }

    if (parent && parent.sex === Gender.male) {
      return (
        <Link to={`../${parent.slug}?${searchParams.toString()}`}>
          {parent.name}
        </Link>
      );
    }

    return parentName;
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === slug,
      })}
    >
      <td>
        <Link
          to={`../${slug}?${searchParams.toString()}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParentLink(motherName)}</td>
      <td>{findParentLink(fatherName)}</td>
    </tr>
  );
};
