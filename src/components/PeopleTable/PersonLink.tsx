import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person?: Person | null;
};

export const PersonLink = ({ person }: Props) => {
  if (!person) {
    return <span>-</span>;
  }

  return (
    <NavLink
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </NavLink>
  );
};

// import classNames from 'classnames';
// import { NavLink, useLocation } from 'react-router-dom';
// import { Person } from '../../types';

// type Props = {
//   person: Person;
//   people: Person[];
// };

// export const PersonLink = ({ person, people }: Props) => {

//   const getParentElement = (parentName: string) => {
//     const parent = people.find(p => p.name === parentName);

//     if (parent) {
//       return (
//         <NavLink
//           to={`/people/${parent.slug}`}
//           className={classNames({ 'has-text-danger': parent?.sex === 'f' })}
//         >
//           {parent.name}
//         </NavLink>
//       );
//     }

//     return <span>{parentName}</span>;
//   };

//   return (
//     <tr
//       data-cy="person"
//       className={classNames({
//         'has-background-warning':
//           location.pathname === `/people/${person.slug}`,
//       })}
//     >
//       <td>
//         <NavLink
//           to={`/people/${person.slug}`}
//           className={classNames({ 'has-text-danger': person.sex === 'f' })}
//         >
//           {person.name}
//         </NavLink>
//       </td>

//       <td>{person.sex}</td>
//       <td>{person.born}</td>
//       <td>{person.died}</td>

//       {!person.motherName ? (
//         <td>-</td>
//       ) : (
//         <td>{getParentElement(person.motherName)}</td>
//       )}

//       {!person.fatherName ? (
//         <td>-</td>
//       ) : (
//         <td>{getParentElement(person.fatherName)}</td>
//       )}
//     </tr>
//   );
// };
