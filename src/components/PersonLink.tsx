import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';

interface Props {
  people: Person[];
  person: Person;
}

const emptyField = '-';

const findPersonByName = (name: string | null, peopleList: Person[]) => {
  return peopleList.find(person => person.name === name);
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug: slugValue } = useParams();
  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const fatherSlug = findPersonByName(fatherName, people);
  const matherSlug = findPersonByName(motherName, people);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === slugValue,
      })}
    >
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={`../${slug}`}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {matherSlug ? (
          <Link
            className={classNames({
              'has-text-danger': matherSlug.sex === 'f',
            })}
            to={`../${matherSlug?.slug}`}
          >
            {motherName}
          </Link>
        ) : (
          motherName || emptyField
        )}
      </td>
      <td>
        {fatherSlug ? (
          <Link to={`../${fatherSlug?.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || emptyField
        )}
      </td>
    </tr>
  );
};
