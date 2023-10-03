import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonRow } from './PersonRow';
import { SortLink } from '../SortLink/SortLink';
import { SortParam } from '../../types/SortParam';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId = '' } = useParams();

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
              <SortLink sortType={SortParam.Name} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink sortType={SortParam.Sex} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink sortType={SortParam.Born} />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink sortType={SortParam.Died} />
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>

        <tbody>
          {people.map((person) => (
            <PersonRow
              person={person}
              selectedPersonId={personId}
              key={person.slug}
            />
          ))}
        </tbody>
      </thead>
    </table>
  );
};
