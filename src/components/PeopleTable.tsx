import { Person } from '../types';
import { SortType } from '../types/SortType';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
  personSlug: string,
};

export const PeopleTable: React.FC<Props> = ({ people, personSlug }) => {
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
              <SortLink sortBy={SortType.name} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sortBy={SortType.sex} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sortBy={SortType.born} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sortBy={SortType.died} />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person: Person) => {
          const motherLink = people.find(
            mother => mother.name === person.motherName,
          ) || null;
          const fatherLink = people.find(
            father => father.name === person.fatherName,
          ) || null;

          return (
            <PersonLink
              key={person.slug}
              person={person}
              motherLink={motherLink}
              fatherLink={fatherLink}
              personSlug={personSlug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
