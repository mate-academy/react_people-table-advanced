import { useParams } from 'react-router-dom';
import { PersonLink } from '../PersonLink/PersonLink';
// import { useSearchParams } from 'react-router-dom';

import cn from 'classnames';
import { Person } from '../../types';
// import { sortableColumns } from './sortConfig';
import { PeopleTableHead } from './PeopleTableHead';

interface Props {
  people: Person[] | null;
}

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHead />

      <tbody>
        {people?.map(person => {
          return (
            <tr
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
              data-cy="person"
            >
              <td>
                <PersonLink name={person.name} people={people} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} people={people} />
              </td>
              <td>
                <PersonLink name={person.fatherName} people={people} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
