import { Person } from '../types';
import { SortType } from '../types/SortType';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[],
  loading: boolean,
};
export const PeopleTable: React.FC<Props> = ({
  people,
  loading,
}) => {
  return (
    <>
      {(!loading && !people.length) && (
        <p>
          There are no people matching the current search criteria
        </p>
      )}

      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {Object.values(SortType).map(value => (
              <th key={value}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {`${value.slice(0, 1).toUpperCase()}${value.slice(1)}`}

                  <SortLink sortField={value} />
                </span>
              </th>
            ))}

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => (
            <PersonLink
              key={person.slug}
              person={person}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
