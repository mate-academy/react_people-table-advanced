import { Person } from '../types';
import { SortType } from '../types/SortType';
import { PersonRow } from './PersonRow';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
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
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SortLink field={SortType.Name} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink field={SortType.Sex} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink field={SortType.Born} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink field={SortType.Died} />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            motherIs={people.find(
              human => human.name === person.motherName,
            )}
            fatherIs={people.find(
              human => human.name === person.fatherName,
            )}
          />
        ))}
      </tbody>
    </table>
  );
};
