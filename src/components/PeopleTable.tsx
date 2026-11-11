/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from "../types";
import { PersonComponent } from "./Person";

type Props = {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  return (
      <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => (
          <PersonComponent key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
