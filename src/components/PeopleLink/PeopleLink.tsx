import { useContext } from 'react';
import { PeopleContext } from '../../store/PeopleStore';
import { Person } from '../../types';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleLink: React.FC<Person> = ({
  name,
  sex,
  born,
  died,
  fatherName,
  motherName,
  slug,
}) => {
  const location = useLocation();
  const peopleId = location.pathname.split('/').pop();

  const context = useContext(PeopleContext);

  const currentFather = context.people.find(
    person => person.name === fatherName,
  );
  const currentMother = context.people.find(
    person => person.name === motherName,
  );

  const getStyleLink = (currentSex: string) => {
    return currentSex === 'f' ? 'has-text-danger' : '';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': peopleId === slug,
      })}
    >
      <td>
        <NavLink to={`../${slug}`} className={getStyleLink(sex)}>
          {name}
        </NavLink>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {currentFather ? (
          <NavLink
            to={`../${currentFather.slug}`}
            className={getStyleLink(currentFather.sex)}
          >
            {fatherName || '-'}
          </NavLink>
        ) : (
          fatherName || '-'
        )}
      </td>
      <td>
        {currentMother ? (
          <NavLink
            to={`../${currentMother.slug}`}
            className={getStyleLink(currentMother.sex)}
          >
            {motherName || '-'}
          </NavLink>
        ) : (
          motherName || '-'
        )}
      </td>
    </tr>
  );
};
