import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
};

export const PeopleTable:React.FC<Props> = ({
  people,
}) => {
  const { slug = '' } = useParams();

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
              <SortLink field="name" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SortLink field="sex" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SortLink field="born" />
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SortLink field="died" />
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {!people.length && (
          <p>There are no people matching the current search criteria</p>)}
        {people.map(person => {
          return (
            <PersonInfo
              person={person}
              selected={slug}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
