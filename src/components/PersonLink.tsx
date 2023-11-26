import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PeopleContext } from '../stores/PeopleContext';

type Props = {
  person: Person,
};

export const PersonLink:React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { slugPerson } = useParams();
  const {
    slug,
    motherName,
    fatherName,
    name,
    sex,
    born,
    died,
  } = person;
  const { peoplE } = useContext(PeopleContext);
  const mother = peoplE.find((pErson) => pErson.name === motherName);
  const father = peoplE.find((pErson) => pErson.name === fatherName);

  const parrentLink = (parrent: Person | null) => {
    return (
      <Link
        to={`/people/${parrent?.slug}?${searchParams.toString()}`}
        className={cn({ 'has-text-danger': parrent?.sex === 'f' })}
      >
        {parrent?.name}
      </Link>
    );
  };

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slugPerson === slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}?${searchParams.toString()}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? (parrentLink(mother)) : (motherName || '-')}
      </td>

      <td>
        {father ? (parrentLink(father)) : (fatherName || '-')}
      </td>
    </tr>
  );
};
