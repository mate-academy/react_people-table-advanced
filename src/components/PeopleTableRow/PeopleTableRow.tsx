import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person, Nullable } from '../../types';

const renderParent = (parentName: Nullable<string>, parent?: Person) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  if (parentName) {
    return parentName;
  }

  return '-';
};

interface Props {
  person: Person;
}

export const PeopleTableRow = ({ person }: Props) => {
  const { slug } = useParams<{ slug?: string }>();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{renderParent(person.motherName, person.mother)}</td>
      <td>{renderParent(person.fatherName, person.father)}</td>
    </tr>
  );
};
