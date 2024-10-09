import classNames from 'classnames';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MyContext } from './state';
import { Person as PersonType } from '../types';

interface PersonComponentProps {
  pers: PersonType;
}

export const Person: React.FC<PersonComponentProps> = ({ pers }) => {
  const { name, sex, born, fatherName, motherName, slug, died } = pers;
  const { setSelectedPerson, person } = useContext(MyContext);
  const location = useLocation();

  const motherPerson = person.find(
    (perso: PersonType) => perso.name === motherName,
  );
  const fatherPerson = person.find(
    (perso: PersonType) => perso.name === fatherName,
  );

  const isPersonInUrl = location.pathname.includes(slug);

  const getPeopleClass = () =>
    classNames({ 'has-background-warning': isPersonInUrl });

  return (
    <tr data-cy="person" key={name} className={getPeopleClass()}>
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
            'has-background-warning': isPersonInUrl,
          })}
          onClick={() => setSelectedPerson(slug)}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          motherPerson ? (
            <Link
              to={`/people/${motherPerson.slug}`}
              className={classNames({
                'has-text-danger': true,
                'has-background-warning': location.pathname.includes(
                  motherPerson.slug,
                ),
              })}
              onClick={() => setSelectedPerson(motherPerson.slug)}
            >
              {motherName}
            </Link>
          ) : (
            <span>{motherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {fatherName ? (
          fatherPerson ? (
            <Link
              to={`/people/${fatherPerson.slug}`}
              className={classNames({
                'has-background-warning': location.pathname.includes(
                  fatherPerson.slug,
                ),
              })}
              onClick={() => setSelectedPerson(fatherPerson.slug)}
            >
              {fatherName}
            </Link>
          ) : (
            <span>{fatherName}</span>
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
