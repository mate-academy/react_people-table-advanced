import { Person } from '../../types/Person';
import { SortLink } from '../Links/SortLink';
import { PersonRow } from '../PersonRow/PersonRow';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <div className="column is-two-thirds">
      <div className="container">
        <table
          className="table is-striped is-fullwidth"
        >
          <thead>
            <tr>
              <th title="Name">
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <SortLink field="name" />
                </span>
              </th>
              <th title="sex">
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SortLink field="sex" />
                </span>
              </th>
              <th title="born">
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SortLink field="born" />
                </span>

              </th>
              <th title="died">
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SortLink field="died" />
                </span>

              </th>
              <th title="father">
                <span className="is-flex is-flex-wrap-nowrap">
                  Father
                  <SortLink field="fatherName" />
                </span>

              </th>
              <th title="mother">
                <span className="is-flex is-flex-wrap-nowrap">
                  Mother
                  <SortLink field="motherName" />
                </span>

              </th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => {
              return (
                <PersonRow
                  person={person}
                  key={person.slug}
                />
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
};
