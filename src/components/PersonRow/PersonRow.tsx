import { useLocation } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

type Props = {
  person: Person | null;
  people: Person[];
};

export const PersonRow = ({ person, people }: Props) => {
  const { pathname } = useLocation();
  const activeRowClassName = classNames({
    'has-background-warning': pathname === `/people/${person?.slug}`,
  });
  const personMother = people.find(
    searchedPerson => searchedPerson.name === person?.motherName,
  );

  const personFather = people.find(
    searchedPerson => searchedPerson.name === person?.fatherName,
  );

  return (
    <>
      <tr data-cy="person" className={activeRowClassName}>
        <td>
          {person?.slug !== undefined ? (
            <PersonLink person={person} />
          ) : (
            person?.name
          )}
        </td>

        <td>{person?.sex}</td>
        <td>{person?.born}</td>
        <td>{person?.died}</td>
        <td>
          {personMother !== undefined ? (
            <PersonLink person={personMother} />
          ) : (
            <p>{person?.motherName !== null ? person?.motherName : '-'}</p>
          )}
        </td>
        <td>
          {personFather !== undefined ? (
            <PersonLink person={personFather} />
          ) : (
            <p>{person?.fatherName !== null ? person?.fatherName : '-'}</p>
          )}
        </td>
      </tr>
    </>
  );
};
