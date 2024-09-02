import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  name: string;
  sex: string;
  motherName: string | null;
  fatherName: string | null;
  slug: string;
  born: number;
  died: number;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({
  name,
  people,
  born,
  died,
  sex,
  motherName,
  fatherName,
  slug,
}) => {
  const { personSlug } = useParams();
  const findParentByName = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    if (parent) {
      return (
        <NavLink
          to={`/people/${parent.slug}`}
          className={parent.sex === 'f' ? 'has-text-danger' : ''}
          replace
        >
          {parent.name}
        </NavLink>
      );
    }

    return parentName || '-';
  };

  return (
    <tr
      data-cy="person"
      className={slug === personSlug ? 'has-background-warning' : ''}
    >
      <td>
        <NavLink
          to={`/people/${slug}`}
          className={sex === 'f' ? 'has-text-danger' : ''}
          replace
        >
          {name}
        </NavLink>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParentByName(motherName)}</td>
      <td>{findParentByName(fatherName)}</td>
    </tr>
  );
};
