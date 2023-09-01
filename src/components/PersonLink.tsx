import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';
import { Gender } from '../enums/Gender';

type Props = {
  person: Person,
  selectedPerson: string,
};

export const PersonLink: React.FC<Props> = ({ person, selectedPerson }) => {
  const { search } = useLocation();

  const {
    name,
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === selectedPerson },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}${search}`}
          className={classNames({ 'has-text-danger': sex === Gender.Female })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {!motherName && '-'}

        {motherName && !mother && motherName}

        {motherName && mother && (
          <Link
            className="has-text-danger"
            to={`/people/${mother.slug}${search}`}
          >
            {motherName}
          </Link>
        )}
      </td>
      <td>
        {!fatherName && '-'}

        {fatherName && !father && fatherName}

        {fatherName && father && (
          <Link to={`/people/${father.slug}${search}`}>
            {fatherName}
          </Link>
        )}
      </td>
    </tr>
  );
};
