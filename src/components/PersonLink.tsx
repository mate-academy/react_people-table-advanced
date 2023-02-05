import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[],
  selectedPerson: string,
};

export const PersonLink: React.FC<Props> = ({
  person,
  people,
  selectedPerson,
}) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName,
  } = person;

  const findPersonSlugOnList = (personName: string) => (
    people.filter(human => human.name === personName)[0]?.slug || null
  );

  const motherSlugOnList = motherName ? findPersonSlugOnList(motherName) : null;
  const fatherSlugOnList = fatherName ? findPersonSlugOnList(fatherName) : null;

  const isItMother = people.some(human => human.motherName === name);

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === selectedPerson },
      )}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames(
            { 'has-text-danger': isItMother },
          )}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherSlugOnList ? (
          <Link
            to={`/people/${motherSlugOnList}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : motherName || '-'}
      </td>
      <td>
        {fatherSlugOnList ? (
          <Link
            to={`/people/${fatherSlugOnList}`}
          >
            {fatherName}
          </Link>
        ) : fatherName || '-'}
      </td>
    </tr>
  );
};
