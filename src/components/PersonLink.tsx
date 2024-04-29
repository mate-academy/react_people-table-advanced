import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import { PersonsParentLink } from './PersonsParentLink';

type Props = {
  person: Person;
  peopleList: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, peopleList }) => {
  const { name, slug, sex, born, died, fatherName, motherName } = person;
  const { personSlug } = useParams();
  const selectedPerson = personSlug;

  const isPersonInList = (personName: string) => {
    return peopleList.find(human => human.name === personName);
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPerson,
      })}
      key={slug}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {motherName ? (
          isPersonInList(motherName) ? (
            <PersonsParentLink
              peopleList={peopleList}
              personName={motherName}
            />
          ) : (
            motherName
          )
        ) : (
          '-'
        )}
      </td>

      <td>
        {fatherName ? (
          isPersonInList(fatherName) ? (
            <PersonsParentLink
              peopleList={peopleList}
              personName={fatherName}
            />
          ) : (
            fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
