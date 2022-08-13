import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SortLink } from './SortLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  if (people.length === 0) {
    return (
      <p>There are no people matching the current search criteria</p>
    );
  }

  return (
    <table
      className="
        PeopleTable
        people_table
        table
        is-bordered
      "
    >

      <thead className="thead">
        <th className="th--name">
          name
          <SortLink field="name" />
        </th>
        <th className="th--details">
          sex
          <SortLink field="sex" />
        </th>
        <th className="th--details">
          born
          <SortLink field="born" />
        </th>
        <th className="th--details">
          died
          <SortLink field="died" />
        </th>
        <th className="th--name">mother</th>
        <th className="th--name">father</th>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-violet-light': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : person.motherName}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : person.fatherName}
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};
