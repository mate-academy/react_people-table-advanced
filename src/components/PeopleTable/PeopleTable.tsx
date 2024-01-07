import { FC } from 'react';
import { Person } from '../../types/Person';
import { Sort } from '../../types/Sort';
import { SortBtn } from '../SortBtn';
import { PeopleRow } from '../PeopleRow/PeopleRow';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  if (people.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap is-capitalized">
              Name
              <SortBtn field={Sort.Name} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap is-capitalized">
              Sex
              <SortBtn field={Sort.Sex} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap is-capitalized">
              Born
              <SortBtn field={Sort.Born} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap is-capitalized">
              Died
              <SortBtn field={Sort.Died} />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => <PeopleRow person={person} key={person.slug} />)}
      </tbody>
    </table>
  );
};
