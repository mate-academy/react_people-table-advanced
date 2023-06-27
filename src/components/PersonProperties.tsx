import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  person: Person,
  selectPeopleSlug: string | null,
};

export const PersonProperties: React.FC<Props> = ({
  person,
  people,
  selectPeopleSlug,
}) => {
  const {
    slug,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const findParrent = (parentName: string | null) => {
    const parent = people.find(personage => personage.name === parentName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return parentName || '-';
  };

  const isSelected = (human: Person) => human.slug === selectPeopleSlug;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': isSelected(person),
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{findParrent(motherName)}</td>
      <td>{findParrent(fatherName)}</td>
    </tr>
  );
};
