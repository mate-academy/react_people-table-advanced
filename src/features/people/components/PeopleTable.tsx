import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { PeopleTableHead } from './PeopleTableHead';
import { PeopleTableRow } from './PeopleTableRow';

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
            <PeopleTableRow
              key={person.slug}
              person={person}
              people={people}
              isSelected={person.slug === slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
