import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person as PersonType } from '../types';

type Props = {
  person: PersonType;
  people: PersonType[];
};

export const Person: React.FC<Props> = ({ person, people }) => {
  const { slugParam } = useParams();
  const {
    name,
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName
  } = person;

  const findParent = (parentName: string | null) => {
    if (!parentName) {
      return '-';
    }

    const parent = people.find(man => man.name === parentName);

    return parent ? (
      <Link
        to={`/people/${parent.slug}`}
        className={cn({
          'has-text-danger': parent.sex === 'f',
        })}
      >
        {parent.name}
      </Link>
    ) : (
      parentName
    );
  };

  const mother = findParent(motherName);
  const father = findParent(fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': person.slug === slugParam,
      })}
    >
      <td>
        <Link
          className={cn({
            'has-text-danger': sex === 'f',
          })}
          to={`../${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother}</td>
      <td>{father}</td>
    </tr>
  );
};
