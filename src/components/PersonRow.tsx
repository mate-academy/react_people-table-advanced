import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  const getParentText = (
    parent: Person | undefined,
    parentName: string | null,
  ) => {
    if (parent) {
      return <PersonLink person={parent} />;
    }

    if (parentName) {
      return parentName;
    }

    return '-';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {getParentText(person.mother, person.motherName)}
      </td>
      <td>
        {getParentText(person.father, person.fatherName)}
      </td>
    </tr>
  );
};
